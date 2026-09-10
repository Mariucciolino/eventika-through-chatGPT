import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

type VideoId = "film-1" | "film-2" | "tutorial";

const VIMEO_VIDEOS: Record<Exclude<VideoId, "film-1">, string> = {
  "film-2": "https://player.vimeo.com/video/915908276",
  tutorial: "https://player.vimeo.com/video/1007265885?h=17b5017beb",
};

export default function Jetboard() {
  const { language } = useLanguage();
  const isSv = language === "sv";
  const [activeVideo, setActiveVideo] = useState<VideoId>("film-1");
  const [playRequested, setPlayRequested] = useState(0);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (activeVideo === "film-1" && playRequested) {
      void localVideoRef.current?.play().catch(() => {
        // Native controls remain available if the browser blocks playback.
      });
    }
  }, [activeVideo, playRequested]);

  const selectVideo = (video: VideoId) => {
    setActiveVideo(video);
    setPlayRequested(request => request + 1);
  };

  const videoLabels: Record<VideoId, string> = {
    "film-1": "Film 1",
    "film-2": "Film 2",
    tutorial: "Film 3",
  };

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative min-h-[100svh] bg-white">
        <div className="container py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-border bg-black">
                {activeVideo === "film-1" ? (
                  <video
                    ref={localVideoRef}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                    poster="/images/experiences/gonuts/gonuts(3).jpg"
                  >
                    <source src="/images/experiences/gonuts/jetboard-promo.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <iframe
                    key={`${activeVideo}-${playRequested}`}
                    className="h-full w-full"
                    src={`${VIMEO_VIDEOS[activeVideo]}${VIMEO_VIDEOS[activeVideo].includes("?") ? "&" : "?"}autoplay=1&controls=1`}
                    title={videoLabels[activeVideo]}
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3" aria-label={isSv ? "Välj film" : "Choose video"}>
                {(Object.keys(videoLabels) as VideoId[]).map(video => (
                  <Button
                    key={video}
                    type="button"
                    variant={activeVideo === video ? "default" : "outline"}
                    aria-pressed={activeVideo === video}
                    data-video-option={video}
                    onClick={() => selectVideo(video)}
                  >
                    {videoLabels[video]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="uppercase tracking-[0.2em] text-primary font-semibold text-sm mb-3">
                  {isSv ? "Upplevelse" : "Experience"}
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans italic text-primary leading-tight">
                  {isSv ? "Jetboard på sjön" : "Jetboard on the lake"}
                </h1>
              </div>

              <p className="text-lg leading-8 text-foreground/90">
                {isSv
                  ? "Swisha över sjön i upp till 50 km/h på en elektrisk jetboard. Detta är Eventikas signaturupplevelse för dig som vill prova något ovanligt, fartfyllt och oförglömligt."
                  : "Zap across the lake at up to 50 km/h on an electric jetboard. This is Eventika’s signature experience for anyone who wants to try something unusual, exciting and unforgettable."}
              </p>

              <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-primary">
                      {isSv ? "Pris" : "Price"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {isSv ? "per person" : "per person"}
                    </p>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    900 SEK / 20 min
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-primary">
                    {isSv ? "Detta ingår" : "What is included"}
                  </h3>
                  <ul className="space-y-2 text-foreground/90">
                    <li>• {isSv ? "Jetboard och utrustning" : "Jetboard and equipment"}</li>
                    <li>• {isSv ? "Kort introduktion före start" : "Short introduction before start"}</li>
                    <li>• {isSv ? "Hjälp på plats av Mario" : "On-site help from Mario"}</li>
                    <li>• {isSv ? "Upplevelse på sjön vid Eventika" : "Experience on the lake at Eventika"}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-primary">
                    {isSv ? "Bra att veta" : "Good to know"}
                  </h3>
                  <ul className="space-y-2 text-foreground/90">
                    <li>• {isSv ? "För nybörjare och nyfikna teståkare" : "Suitable for beginners and curious first-timers"}</li>
                    <li>• {isSv ? "Vädret och sjöförhållanden kan påverka genomförandet" : "Weather and lake conditions may affect availability"}</li>
                    <li>• {isSv ? "För frågor: ring Mario direkt" : "For questions: call Mario directly"}</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl bg-primary text-white p-6">
                <p className="text-lg md:text-xl font-semibold">
                  {isSv
                    ? "För bokning: ring Mario på +46 760 345 328"
                    : "To book: call Mario on +46 760 345 328"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
