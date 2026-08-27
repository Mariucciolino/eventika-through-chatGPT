import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { ArrowRight, Move3D } from 'lucide-react';
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

          {/* Main hero content */}
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans italic text-white drop-shadow-lg max-w-4xl leading-tight mb-32">
              {t.hero.title}
            </h1>

            <Link href="/booking">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-xl px-8 py-6 rounded-md shadow-xl transition-transform hover:scale-105"
              >
                {t.hero.cta}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>

          {/* Virtual Tour CTA */}
          <div className="absolute left-4 bottom-10 md:left-8 md:bottom-12">
            <a href="/location#virtual-tour">
              <div className="group cursor-pointer rounded-2xl border border-white/30 bg-black/55 backdrop-blur-sm shadow-2xl px-5 py-4 md:px-6 md:py-5 transition-transform duration-300 hover:scale-[1.03] max-w-[300px]">
                <div className="flex items-start gap-3">
                  <Move3D className="w-7 h-7 text-white flex-shrink-0 mt-1" />

                  <div>
                    <p className="text-white text-lg md:text-xl font-semibold leading-snug">
                      {isSv
                        ? "Utforska stället i 3D"
                        : "Take a Virtual Tour"}
                    </p>

                    <div className="mt-2 inline-flex items-center text-white/90 group-hover:text-white font-medium">
                      {isSv
                        ? "Ta en virtuell rundtur"
                        : "Explore Eventika in 3D"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
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
                    <source
                      src="/images/experiences/gonuts/jetboard-promo.mp4"
                      type="video/mp4"
                    />
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
                    {isSv
                      ? "Öppna jetboard-sidan"
                      : "Open Jetboard page"}
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
