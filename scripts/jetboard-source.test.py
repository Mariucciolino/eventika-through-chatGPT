"""Browser-free source contracts; playback remains a separate browser check."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
SOURCE = (ROOT / "client/src/pages/Jetboard.tsx").read_text(encoding="utf-8")


class JetboardSourceTests(unittest.TestCase):
    def test_film_two_uses_local_media(self):
        self.assertIn('"film-2": "/images/experiences/gonuts/jetboard-film-2-1080p.mp4"', SOURCE)
        self.assertNotIn("915908276", SOURCE)
        self.assertIn('src={LOCAL_VIDEOS[activeVideo]}', SOURCE)
        self.assertIn('key={activeVideo}', SOURCE)
        self.assertGreaterEqual(SOURCE.count('activeVideo !== "tutorial"'), 2)

    def test_original_sources_and_initial_silence(self):
        self.assertIn('"/images/experiences/gonuts/jetboard-promo.mp4"', SOURCE)
        self.assertIn('https://player.vimeo.com/video/1007265885?h=17b5017beb', SOURCE)
        self.assertIn('useState<VideoId>("film-1")', SOURCE)
        self.assertIn('useState(0)', SOURCE)
        self.assertIn('&& playRequested', SOURCE)
        video = re.search(r'<video\b(.*?)>', SOURCE, re.S).group(1)
        self.assertNotIn('autoPlay', video)
        for attribute in ('controls', 'playsInline', 'preload="metadata"'):
            self.assertIn(attribute, video)


if __name__ == "__main__":
    unittest.main()
