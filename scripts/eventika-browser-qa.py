"""Browser regression checks for Eventika's responsive and media fixes.

Requires the local app on port 3000 and Chrome DevTools on port 9333.
"""

from __future__ import annotations

import json
import os
import time
import base64
from pathlib import Path
import urllib.parse
import urllib.request
from dataclasses import dataclass, field

from websockets.sync.client import connect

APP = os.environ.get("EVENTIKA_QA_URL", "http://127.0.0.1:3000")
OUTPUT = Path(os.environ.get("EVENTIKA_QA_OUTPUT", "C:/Users/Mario/AppData/Local/Temp/eventika-final-qa"))
OUTPUT.mkdir(parents=True, exist_ok=True)
CDP = "http://127.0.0.1:9333"
VIEWPORTS = {
    "desktop": (1440, 900),
    "portrait-375": (375, 667),
    "portrait-390": (390, 844),
    "landscape-667": (667, 375),
    "landscape-844": (844, 390),
}


@dataclass
class Page:
    socket: object
    sequence: int = 0
    events: list[dict] = field(default_factory=list)
    errors: list[str] = field(default_factory=list)

    def command(self, method: str, params: dict | None = None):
        self.sequence += 1
        request_id = self.sequence
        self.socket.send(json.dumps({"id": request_id, "method": method, "params": params or {}}))
        while True:
            message = json.loads(self.socket.recv(timeout=20))
            if message.get("id") == request_id:
                if "error" in message:
                    raise RuntimeError(f"{method}: {message['error']}")
                return message.get("result", {})
            self.events.append(message)
            if message.get("method") == "Runtime.exceptionThrown":
                self.errors.append(message["params"]["exceptionDetails"].get("text", "browser exception"))
            if message.get("method") == "Runtime.consoleAPICalled" and message["params"].get("type") == "error":
                self.errors.append(" ".join(str(arg.get("value", arg.get("description", ""))) for arg in message["params"].get("args", [])))

    def js(self, expression: str):
        result = self.command(
            "Runtime.evaluate",
            {"expression": expression, "returnByValue": True, "awaitPromise": True},
        )
        value = result["result"]
        if value.get("subtype") == "error":
            raise AssertionError(value.get("description", "browser evaluation failed"))
        return value.get("value")

    def viewport(self, width: int, height: int):
        self.command(
            "Emulation.setDeviceMetricsOverride",
            {"width": width, "height": height, "deviceScaleFactor": 1, "mobile": width < 900},
        )

    def navigate(self, path: str):
        self.command("Page.navigate", {"url": APP + path})
        deadline = time.time() + 15
        while time.time() < deadline:
            try:
                ready = self.js("document.readyState === 'complete' && [...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'SV')")
                if ready:
                    time.sleep(0.25)
                    return
            except Exception:
                pass
            time.sleep(0.1)
        raise TimeoutError(f"page did not load: {path}")

    def click(self, selector: str):
        point = self.js(
            f"""(() => {{
              const element = document.querySelector({json.dumps(selector)});
              if (!element) return null;
              element.scrollIntoView({{block: 'center'}});
              const rect = element.getBoundingClientRect();
              return {{x: rect.left + rect.width / 2, y: rect.top + rect.height / 2}};
            }})()"""
        )
        assert point, f"click target missing: {selector}"
        self.command("Input.dispatchMouseEvent", {"type": "mousePressed", "x": point["x"], "y": point["y"], "button": "left", "clickCount": 1})
        self.command("Input.dispatchMouseEvent", {"type": "mouseReleased", "x": point["x"], "y": point["y"], "button": "left", "clickCount": 1})

    def screenshot(self, name: str):
        image = self.command('Page.captureScreenshot', {'format': 'png'})
        (OUTPUT / f'{name}.png').write_bytes(base64.b64decode(image['data']))

    def responses(self, source: str):
        return [
            (event["params"]["response"]["url"], event["params"]["response"]["status"])
            for event in self.events
            if event.get("method") == "Network.responseReceived"
            and source in event["params"]["response"]["url"]
        ]


def open_page() -> Page:
    request = urllib.request.Request(
        f"{CDP}/json/new?{urllib.parse.quote(APP, safe=':/')}", method="PUT"
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        target = json.load(response)
    socket = connect(target["webSocketDebuggerUrl"], open_timeout=10, max_size=16 * 1024 * 1024)
    page = Page(socket)
    page.command("Page.enable")
    page.command("Runtime.enable")
    page.command("Log.enable")
    page.command("Network.enable")
    page.command("Network.setCacheDisabled", {"cacheDisabled": True})
    return page


def set_language(page: Page, language: str):
    ok = page.js(
        f"""(() => {{
          const wanted = {json.dumps(language.upper())};
          const button = [...document.querySelectorAll('button')].find(
            element => element.textContent.trim() === wanted
          );
          if (!button) return false;
          button.click();
          return true;
        }})()"""
    )
    assert ok, f"language button {language} missing"
    time.sleep(0.15)


def test_home(page: Page):
    labels = {
        "sv": ("Beskriv ditt evenemang", "Jag är här för jetboard-upplevelsen!"),
        "en": ("Book Your Event", "I am here for the jetboard experience!"),
    }
    desktop_geometry = {}
    for name, (width, height) in VIEWPORTS.items():
        for language, (cta_text, jet_text) in labels.items():
            page.viewport(width, height)
            page.navigate("/")
            set_language(page, language)
            page.screenshot(f'{page.js("location.pathname").strip("/") or "home"}-{name}-{language}')
            assert page.js("document.querySelectorAll('[data-social-links] a[aria-label]').length === 4"), f"{name}/{language}: accessible right-side social links missing"
            social = page.js("(() => { const e=document.querySelector('[data-social-links]'); const r=e.getBoundingClientRect(); return {right:r.right, bottom:r.bottom, top:r.top, hit:[...e.querySelectorAll('a')].every(a=>{const b=a.getBoundingClientRect();return a.contains(document.elementFromPoint(b.x+b.width/2,b.y+b.height/2))})}; })()")
            assert social['right'] <= width and social['top'] >= 0 and social['hit'], f"social visibility: {social}"
            assert page.js("!document.querySelector('main video')"), 'Home must not have a large video'
            cta_selector = 'main a[href="/booking"]'
            page.js(f"document.querySelector({json.dumps(cta_selector)})?.scrollIntoView({{block:'center'}})")
            result = page.js(
                f"""(() => {{
                  const byText = (selector, text) => [...document.querySelectorAll(selector)].find(
                    element => element.textContent.trim() === text
                  );
                  const cta = byText('button', {json.dumps(cta_text)});
                  const jetLabel = byText('p', {json.dumps(jet_text)});
                  if (!cta || !jetLabel) return {{missing: true}};
                  const jet = jetLabel.closest('a') || jetLabel.parentElement;
                  const a = cta.getBoundingClientRect();
                  const b = jet.getBoundingClientRect();
                  const overlap = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
                    * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
                  const hit = document.elementFromPoint(a.left + a.width / 2, a.top + a.height / 2);
                  return {{
                    missing: false,
                    overlap,
                    ctaHit: Boolean(hit && cta.contains(hit)),
                    overflow: document.documentElement.scrollWidth - innerWidth,
                    jetPosition: getComputedStyle(jet.parentElement).position,
                    cta: {{left: a.left, top: a.top, right: a.right, bottom: a.bottom}},
                    jet: {{left: b.left, top: b.top, right: b.right, bottom: b.bottom}},
                  }};
                }})()"""
            )
            assert not result["missing"], f"{name}/{language}: Home control missing"
            assert result["overlap"] == 0, f"{name}/{language}: Jetboard overlaps event CTA"
            assert result["ctaHit"], f"{name}/{language}: event CTA is not hit-testable"
            assert result["overflow"] <= 1, f"{name}/{language}: horizontal overflow {result['overflow']}px"
            if name.startswith("landscape"):
                assert result["jetPosition"] != "absolute", f"{name}/{language}: Jetboard remains an overlay"
                print(f"{name}/{language} geometry: {result}")
            if name == "desktop":
                desktop_geometry[language] = result["jet"]
    print("home responsive: PASS; desktop Jetboard geometry:", desktop_geometry)


def test_calendar(page: Page):
    expected = {"sv": "må", "en": "Mo"}
    for name, (width, height) in VIEWPORTS.items():
        for language in ("sv", "en"):
            page.viewport(width, height)
            page.navigate("/booking")
            set_language(page, language)
            page.screenshot(f'{page.js("location.pathname").strip("/") or "home"}-{name}-{language}')
            result = page.js("({first: document.querySelector('.rdp-weekday')?.textContent.trim(), overflow: document.documentElement.scrollWidth - innerWidth})")
            assert result["first"] == expected[language], f"{name}/{language}: calendar starts with {result['first']!r}, expected {expected[language]!r}"
            assert result["overflow"] <= 1, f"{name}/{language}: calendar overflow {result['overflow']}px"
    print("calendar Monday-first locales: PASS")


def test_jetboard(page: Page):
    for name, (width, height) in VIEWPORTS.items():
        for language in ("sv", "en"):
            page.viewport(width, height)
            page.navigate("/jetboard")
            set_language(page, language)
            page.screenshot(f'{page.js("location.pathname").strip("/") or "home"}-{name}-{language}')
            assert page.js("document.querySelector('[data-video-option=tutorial]')?.textContent === 'Film 3'"), 'Third button must be Film 3'
            initial = page.js(
                """(() => ({
                  buttons: document.querySelectorAll('[data-video-option]').length,
                  active: document.querySelectorAll('[data-video-option][aria-pressed="true"]').length,
                  video: Boolean(document.querySelector('video[controls]')),
                  paused: document.querySelector('video')?.paused,
                  autoplay: Boolean(document.querySelector('video[autoplay], iframe[src*="autoplay=1"]')),
                  overflow: document.documentElement.scrollWidth - innerWidth,
                }))()"""
            )
            assert initial["buttons"] == 3 and initial["active"] == 1, f"{name}/{language}: {initial}"
            assert initial["video"] and initial["paused"] and not initial["autoplay"], f"{name}/{language}: {initial}"
            assert initial["overflow"] <= 1, f"{name}/{language}: Jetboard overflow {initial['overflow']}px"

    selections = [
        ("film-1", "video", "jetboard-promo.mp4"),
        ("film-2", "video", "jetboard-film-2-1080p.mp4"),
        ("tutorial", "iframe", "player.vimeo.com/video/1007265885"),
        ("film-2", "video", "jetboard-film-2-1080p.mp4"),
        ("film-1", "video", "jetboard-promo.mp4"),
    ]
    for width, height, language in (
        (width, height, language)
        for width, height in VIEWPORTS.values()
        for language in ("sv", "en")
    ):
      page.viewport(width, height)
      page.navigate("/jetboard")
      set_language(page, language)
      for option, player, source in selections:
        page.events.clear()
        page.click(f'[data-video-option="{option}"]')
        time.sleep(0.5)
        result = page.js(
            f"""(() => {{
              const button = document.querySelector('[data-video-option={json.dumps(option)}]');
              if (!button) return {{missing: true}};
              const active = document.querySelectorAll('[data-video-option][aria-pressed="true"]');
              const media = document.querySelector({json.dumps(player)});
              return {{
                missing: false,
                oneActive: active.length === 1 && active[0] === button,
                controls: media?.hasAttribute('controls') || media?.src.includes('controls=1'),
                playing: media?.tagName === 'VIDEO' ? !media.paused && media.currentTime > 0 : null,
                source: media?.currentSrc || media?.src || '',
              }};
            }})()"""
        )
        assert not result["missing"], f"{language}/{option}: missing video option"
        assert result["oneActive"], f"{language}/{option}: active selection is unclear"
        assert result["controls"], f"{language}/{option}: player controls missing"
        if player == "video":
            assert result["playing"], f"{language}/{option}: local video did not advance"
        print(f"{width}x{height}/{language}/{option}: {result}")
        assert source in result["source"], f"{language}/{option}: wrong source {result['source']}"
        if player == "iframe":
            time.sleep(1)
            page.js("0")
            responses = page.responses(source)
            if any(status >= 400 for _, status in responses):
                print(f"{language}/{option}: external player blocked in isolated Chrome: {responses}")
    page.navigate("/jetboard")
    for option in ("film-1", "film-2"):
        page.click(f'[data-video-option="{option}"]')
        time.sleep(0.5)
        page.js("document.querySelector('video').pause()")
        page.click(f'[data-video-option="{option}"]')
        time.sleep(0.5)
        assert page.js("!document.querySelector('video').paused"), f"{option} must resume when selected again"
    print("Jetboard selection and playback requests: PASS (external playback is not asserted)")


def main():
    page = open_page()
    failures = []
    try:
        for name, test in (("home", test_home), ("calendar", test_calendar), ("jetboard", test_jetboard)):
            try:
                test(page)
            except Exception as error:
                failures.append(f"{name}: {error}")
                print(f"{name}: FAIL: {error}")
        page.js("0")
        if page.errors:
            failures.append(f"browser console/exceptions: {page.errors}")
    finally:
        page.socket.close()
    if failures:
        raise SystemExit("\n".join(failures))


if __name__ == "__main__":
    main()
