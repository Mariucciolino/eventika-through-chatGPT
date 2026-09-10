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
      <section id="home" className="relative min-h-[80vh] lg:h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.media.home.heroImage}
            alt="Eventika Hero"
            className="w-full h-full object-cover absolute inset-0"
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative container z-10 flex flex-col gap-6 py-12 lg:block lg:h-full lg:py-0">

          {/* Main hero content */}
          <div className="flex flex-col items-center justify-center text-center lg:h-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans italic text-white drop-shadow-lg max-w-4xl leading-tight mb-8 lg:mb-32">
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
          <div className="relative self-center lg:absolute lg:left-8 lg:bottom-12">
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
          <div className="relative self-center w-full max-w-[360px] lg:absolute lg:right-8 lg:bottom-12 lg:w-[88vw] lg:max-w-[420px]">
            <Link href="/jetboard">
              <div className="group cursor-pointer overflow-hidden rounded-2xl border border-white/30 bg-black/55 backdrop-blur-sm shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
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
