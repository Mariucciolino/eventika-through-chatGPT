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
      <section id="home" className="relative flex min-h-[max(720px,80svh,56vw)] sm:min-h-[max(560px,80svh,56vw)] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={content.media.home.heroImage}
            alt="Eventika Hero"
            className="w-full h-full object-cover object-bottom absolute inset-0"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative container z-10 flex flex-col gap-8 pt-12 pb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans italic text-white text-center drop-shadow-lg max-w-4xl mx-auto leading-tight">
            {t.hero.title}
          </h1>

          {/* Keep all actions together over the lower rocks, below the terrace.
              The image-height minimum prevents wide/landscape crops losing the rocks. */}
          <div data-home-actions className="mt-auto mx-auto grid w-full max-w-4xl grid-cols-2 sm:grid-cols-3 items-stretch gap-3">
            <Button
              asChild
              size="lg"
              className="col-span-2 sm:col-span-1 h-auto min-h-12 whitespace-normal bg-primary hover:bg-primary/90 text-white text-base px-4 py-3 rounded-xl shadow-xl"
            >
              <Link href="/booking">
                {t.hero.cta}
                <ArrowRight className="ml-2 h-5 w-5 shrink-0" />
              </Link>
            </Button>

            <a href="/location#virtual-tour" className="group min-w-0 rounded-xl border border-white/30 bg-black/55 backdrop-blur-sm shadow-xl p-3 md:p-4 text-white hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <div className="flex items-start gap-2">
                <Move3D className="hidden sm:block w-5 h-5 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-semibold leading-snug">
                    {isSv ? "Utforska stället i 3D" : "Take a Virtual Tour"}
                  </p>
                  <div className="mt-2 text-xs md:text-sm text-white/90 font-medium">
                    {isSv ? "Ta en virtuell rundtur" : "Explore Eventika in 3D"}
                    <ArrowRight className="inline ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </a>

            <Link href="/jetboard" className="group min-w-0 rounded-xl border border-white/30 bg-black/55 backdrop-blur-sm shadow-xl p-3 md:p-4 text-white hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <p className="text-sm md:text-base font-semibold leading-snug">
                {isSv
                  ? "Jag är här för jetboard-upplevelsen!"
                  : "I am here for the jetboard experience!"}
              </p>
              <div className="mt-2 text-xs md:text-sm text-white/90 font-medium">
                {isSv ? "Öppna jetboard-sidan" : "Open Jetboard page"}
                <ArrowRight className="inline ml-1 h-4 w-4" />
              </div>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-4 bg-primary/80" />
      </section>
    </div>
  );
}
