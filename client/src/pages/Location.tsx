import { Section } from '@/components/Section';
import { Carousel } from '@/components/Carousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import { MapPin, Car, Train } from 'lucide-react';

export default function Location() {
  const { t, language } = useLanguage();

  return (
    <div className="animate-in fade-in duration-500">
      <Section id="location-hero" title={t.location.title} className="bg-white pt-12 pb-8">
        
        <div className="max-w-5xl mx-auto">
          {/* SPACES FOR EVENTS */}
          <h3 className="text-3xl font-sans font-bold text-center text-primary mb-12 uppercase tracking-wide">{t.location.spaces.title}</h3>
          
          <div className="space-y-16 mb-24">
            {/* Tent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg text-muted-foreground leading-relaxed">{t.location.spaces.items[0].label}</p>
              </div>
              <div className="order-1 md:order-2 h-[300px] rounded-xl overflow-hidden shadow-lg">
                <Carousel items={content.media.location.tent} />
              </div>
            </div>

            {/* Salon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[300px] rounded-xl overflow-hidden shadow-lg">
                <Carousel items={content.media.location.salon} />
              </div>
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">{t.location.spaces.items[1].label}</p>
              </div>
            </div>

            {/* Terrace (Altan) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <p className="text-lg text-muted-foreground leading-relaxed">{t.location.spaces.items[2].label}</p>
              </div>
              <div className="order-1 md:order-2 h-[300px] rounded-xl overflow-hidden shadow-lg">
                <Carousel items={content.media.location.altan} />
              </div>
            </div>

            {/* Gardens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Carousel items={content.media.location.gardens} objectFit="contain" />
              </div>
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">{t.location.spaces.items[3].label}</p>
              </div>
            </div>

            {/* Parking */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 text-center">
              <p className="text-lg font-medium text-primary">{t.location.spaces.items[4].label}</p>
            </div>
          </div>

          {/* WHERE? */}
          <div className="mb-24">
            <h3 className="text-3xl font-sans font-bold text-center text-primary mb-12 uppercase tracking-wide">{t.location.where.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                <Carousel items={content.media.location.where} objectFit="contain" />
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <h4 className="font-bold text-lg text-primary uppercase">{language === 'sv' ? 'Adress' : 'Address'}</h4>
                  </div>
                  <p className="text-muted-foreground ml-9">{t.location.where.address}</p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <Car className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <h4 className="font-bold text-lg text-primary uppercase">{language === 'sv' ? 'Avstånd' : 'Distances'}</h4>
                  </div>
                  <p className="text-muted-foreground ml-9">{t.location.where.distances}</p>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <Train className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <h4 className="font-bold text-lg text-primary uppercase">{t.location.where.transport.title}</h4>
                  </div>
                  <ul className="space-y-2 ml-9">
                    {t.location.where.transport.options.map((option, idx) => (
                      <li key={idx} className="text-muted-foreground">{option}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* CLOSE TO NATURE & STAY OVERNIGHT & OWNER */}
          <div className="space-y-24">
            {/* Close to Nature */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-sans font-bold text-primary mb-4 uppercase tracking-wide">{t.location.sections[0].title}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t.location.sections[0].content}
                </p>
              </div>
              <div className="h-[300px] rounded-xl overflow-hidden shadow-lg">
                <Carousel items={content.media.location.closetonature} />
              </div>
            </div>

            {/* Stay Overnight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-[300px] rounded-xl overflow-hidden shadow-lg">
                <Carousel items={content.media.location.overnight} />
              </div>
              <div>
                <h3 className="text-2xl font-sans font-bold text-primary mb-4 uppercase tracking-wide">{t.location.sections[1].title}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t.location.sections[1].content}
                </p>
              </div>
            </div>

            {/* The Owner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-sans font-bold text-primary mb-4 uppercase tracking-wide">{t.location.sections[2].title}</h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t.location.sections[2].content}
                </p>
              </div>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/images/theowner.jpg" 
                  alt="Mario Hytten - Owner" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </Section>
    </div>
  );
}
