import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export default function Jetboard() {
  const { language } = useLanguage();

  const isSv = language === "sv";

  return (
    <div className="animate-in fade-in duration-500">
      <section className="relative min-h-[100svh] bg-white">
        <div className="container py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border bg-black">
                <video
                  className="w-full h-auto object-cover"
                  controls
                  playsInline
                  muted
                  poster="/images/experiences/gonuts/gonuts(3).jpg"
                >
                  <source src="/images/experiences/gonuts/jetboard-promo.mp4" type="video/mp4" />
                  {/* If you keep the original file instead of converting to mp4, use this line instead:
                  <source src="/images/experiences/gonuts/Eventika Jetboard for ICA screens.mov" type="video/quicktime" />
                  */}
                </video>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://vimeo.com/mariohytten/jetboardtutorial?ts=0&share=copy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    {isSv ? "Jetboard-tutorial" : "Jetboard tutorial"}
                  </Button>
                </a>
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
