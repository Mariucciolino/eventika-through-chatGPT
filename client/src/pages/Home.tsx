import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
// Video removed - using static image only

export default function Home() {
  const { t } = useLanguage();
  // Video removed - using static image only

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section - Full width image/video with overlay text */}
      <section id="home" className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {/* Static Image - permanent until video is re-added */}
          <img 
            src={content.media.home.heroImage} 
            alt="Eventika Hero" 
            className="w-full h-full object-cover absolute inset-0"
          />
          
          <div className="absolute inset-0 bg-black/20" /> {/* Slight overlay for text readability */}
        </div>
        
        <div className="relative h-full container flex flex-col items-center justify-center text-center z-10">
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
        
        {/* Purple band at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-primary/80" />
      </section>
    </div>
  );
}
