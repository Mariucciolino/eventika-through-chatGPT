import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const { t, language } = useLanguage();
  const isSv = language === "sv";

  return (
    <div className="animate-in fade-in duration-500">
      <section id="home" className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.media.home.heroImage}
            alt="Eventika Hero"
            className="w-full h-full object-cover absolute inset-0"
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative h-full container z-10">
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans italic text-white drop-shadow-lg max-w-4xl leading-tight mb-32">
              {t.hero.title}
            </h1>

            <Link href="/booking">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-xl px-8 py-6 rounded-md shadow-xl transition-transform hover:scale-105"
              >
                {t.hero.cta} <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>

          {/* Jetboard tile */}
          <div className="absolute right-4 bottom-10 md:right-8 md:bottom-12 w-[88vw] max-w-[360px] md:max-w-[420px]">
            <Link href="/jetboard">
              <div className="group cursor-pointer overflow-hidden rounded-2xl border border-white/30 bg-black/55 backdrop-blur-sm shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative aspect-video bg-black">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/experiences/gonuts/gonuts(3).jpg"
                  >
                    <source src="/images/experiences/gonuts/jetboard-promo.mp4" type="video/mp4" />
                    {/* If you keep the original file instead of converting to mp4, use this line instead:
                    <source src="/images/experiences/gonuts/Eventika Jetboard for ICA screens.mov" type="video/quicktime" />
                    */}
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                <div className="p-4 md:p-5">
                  <p className="text-white text-lg md:text-xl font-semibold leading-snug">
                    {isSv
                      ? "Jag är här för jetboard-upplevelsen!"
                      : "I am here for the jetboard experience!"}
                  </p>

                  <div className="mt-3 inline-flex items-center text-white/90 group-hover:text-white font-medium">
                    {isSv ? "Öppna jetboard-sidan" : "Open Jetboard page"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-4 bg-primary/80" />
      </section>
    </div>
  );
}
