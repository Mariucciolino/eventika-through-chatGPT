import { Section } from '@/components/Section';
import { Carousel } from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Check } from 'lucide-react';

export default function Events() {
  const { t } = useLanguage();

  return (
    <div className="animate-in fade-in duration-500">
      <Section id="events-hero" title={t.events.title} className="bg-white pt-12 pb-8">
        <div className="max-w-5xl mx-auto mb-16">
          <div className="h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl mb-12">
            <Carousel items={content.media.events.main} />
          </div>

          {/* Pricing Section */}
          <h3 className="text-3xl font-sans font-bold text-center text-primary mb-12 uppercase tracking-wide">{t.events.standardPrice.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-medium text-muted-foreground mb-2">{t.events.standardPrice.locationCharge.label}</h4>
              <p className="text-4xl font-bold text-primary">{t.events.standardPrice.locationCharge.price}</p>
            </div>
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-medium text-muted-foreground mb-2">{t.events.standardPrice.adultGuest.label}</h4>
              <p className="text-4xl font-bold text-primary">{t.events.standardPrice.adultGuest.price}</p>
            </div>
            <div className="bg-primary/5 p-8 rounded-xl border border-primary/10 text-center hover:shadow-lg transition-shadow">
              <h4 className="text-lg font-medium text-muted-foreground mb-2">{t.events.standardPrice.childGuest.label}</h4>
              <p className="text-4xl font-bold text-primary">{t.events.standardPrice.childGuest.price}</p>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-primary/10 mb-16">
            <h3 className="text-2xl font-sans font-bold text-primary mb-8 uppercase tracking-wide">{t.events.includes.title}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.events.includes.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="text-3xl font-sans font-bold text-center text-primary mb-12 uppercase tracking-wide">{t.events.optionals.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {t.events.optionals.items.map((item, i) => {
              // Determine if this item needs a carousel/image
              let mediaItems = null;
              const titleLower = item.title.toLowerCase();
              
              let useContain = false;
              
              if (titleLower.includes('catering')) {
                mediaItems = content.media.events.catering;
              } else if (titleLower.includes('grill')) {
                mediaItems = content.media.events.grill;
              } else if (titleLower.includes('table') || titleLower.includes('dukning')) {
                mediaItems = content.media.events.table;
              } else if (titleLower.includes('kitchen') || titleLower.includes('kök')) {
                mediaItems = content.media.events.kitchen;
              } else if (titleLower.includes('overnight') || titleLower.includes('övernatt')) {
                mediaItems = content.media.location.overnight;
                useContain = true; // Show all 3 cottages
              } else if (titleLower.includes('toy') || titleLower.includes('leksak')) {
                mediaItems = content.media.events.toys;
                useContain = true; // Show person in toy package images
              }

              return (
                <div key={i} className="flex flex-col p-6 rounded-xl border border-border hover:border-primary/50 transition-colors bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-foreground uppercase">{item.title}</h4>
                    <span className="text-lg font-bold text-primary whitespace-nowrap ml-4">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  
                  {mediaItems && (
                    <div className="mt-auto h-[250px] rounded-lg overflow-hidden shadow-md">
                      <Carousel items={mediaItems} objectFit={useContain ? 'contain' : 'cover'} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">{t.events.cta.title}</h3>
            <Link href="/booking">
              <Button size="lg" className="text-xl px-12 py-6 uppercase tracking-wide font-bold">
                {t.events.cta.button}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
