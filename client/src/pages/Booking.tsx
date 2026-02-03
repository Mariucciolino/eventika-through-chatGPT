import { useState } from 'react';
import { Section } from '@/components/Section';
import { BookingForm } from '@/components/BookingForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { FAQ } from '@/components/FAQ';
import { BookingCalendar } from '@/components/BookingCalendar';

export default function Booking() {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="animate-in fade-in duration-500">
      <Section id="booking-hero" title={t.nav.booking} className="bg-white pt-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 order-2 lg:order-1">
          <p className="text-center text-xl text-muted-foreground mb-12">
            {t.hero.cta}
          </p>
          
          <div className="text-center mb-12 p-6 bg-primary/5 rounded-xl border border-primary/10">
            <h3 className="text-lg font-bold text-primary mb-4 uppercase">{language === 'en' ? 'Contact us through either of:' : 'Kontakta oss antingen genom:'}</h3>
            <div className="flex flex-col md:flex-row justify-center gap-6 text-lg">
              <a href="mailto:mario@eventika.se" className="hover:text-primary font-medium transition-colors">
                email: mario@eventika.se
              </a>
              <a href="tel:+46760345328" className="hover:text-primary font-medium transition-colors">
                tel: +46 760 345 328
              </a>
            </div>
          </div>

              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-primary/10">
                <BookingForm selectedDate={selectedDate} onDateChange={setSelectedDate} />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <BookingCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>
          </div>
        </div>
      </Section>
      <FAQ />
    </div>
  );
}
