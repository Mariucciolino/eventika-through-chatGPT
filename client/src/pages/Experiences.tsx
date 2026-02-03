import { Section } from '@/components/Section';
import { Carousel } from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Waves, Zap, Sailboat, Trees, Ship, Gift, ExternalLink } from 'lucide-react';

export default function Experiences() {
  const { t, language } = useLanguage();

  // Map icons to experience items based on index
  // Order in content.ts: spa, relax, safari, island, gonuts, free
  // Order in instructions: SPA, RELAX, SAFARI, ISLAND, GO NUTS
  const icons = [Waves, Sailboat, Trees, Ship, Zap, Gift];
  
  // Map media collections to experience items
  // Note: content.media.experiences.free was removed/renamed to toys in events, 
  // but we can use content.media.events.toys for the free stuff section if needed
  const mediaCollections = [
    content.media.experiences.spa,
    content.media.experiences.relax,
    content.media.experiences.safari,
    content.media.experiences.island,
    content.media.experiences.gonuts,
    content.media.experiences.free // Using free collection for free stuff
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <Section id="experiences-hero" title={t.experiences.title} className="bg-secondary/30 pt-12 pb-8">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <p className="text-base md:text-lg text-muted-foreground">
            {language === 'en'
              ? 'To book individual experiences, simply email mario@eventika.se with desired experience, number of participants and date. Payment will take place on the day either with debit card, swish or cash.'
              : 'För att boka enstaka upplevelser, skicka en enkel mejl till mario@eventika.se med önskad upplevelse, antal deltagare och datum. Betalning sker på dagen med kort, swish eller kontant.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t.experiences.items.map((exp, index) => {
            const Icon = icons[index];
            const media = mediaCollections[index];
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-primary/10 overflow-hidden flex flex-col">
                {/* Carousel for each experience card */}
                <div className="h-48 w-full">
                  <Carousel items={media} />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-bold text-foreground whitespace-pre-line">{exp.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 min-h-[60px]">{exp.description}</p>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t border-border mt-auto">
                    {exp.prices.map((price, i) => (
                      <div key={i} className="flex justify-between items-start text-sm">
                        <span className="text-muted-foreground font-medium">{price.label}</span>
                        <span className="text-primary font-bold whitespace-pre-line text-right ml-2">{price.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Vimeo link for Go Nuts jetboard video (index 4) */}
                  {index === 4 && (
                    <div className="mt-4">
                      <a 
                        href="https://vimeo.com/915908276" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Jetboard ultimate experience
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link href="/booking">
            <Button size="lg" className="text-xl px-12 py-6 uppercase tracking-wide font-bold">
              {t.hero.cta}
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
