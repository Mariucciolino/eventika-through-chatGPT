import { useLanguage } from '@/contexts/LanguageContext';
import { content } from '@/lib/content';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export function FAQ() {
  const { language } = useLanguage();
  const faqContent = (content[language] as any).faq;

  if (!faqContent) {
    return null;
  }

  return (
    <div className="bg-white py-16">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 uppercase">
            {faqContent.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Find answers to common questions about booking, policies, and services' 
              : 'Hitta svar på vanliga frågor om bokning, policyer och tjänster'}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqContent.items.map((item: any, index: number) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border rounded-lg px-6 bg-gradient-to-r from-purple-50/50 to-white hover:from-purple-50 transition-colors"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5">
                <span className="font-semibold text-lg pr-4">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-900">
            {language === 'en' 
              ? '❓ Still have questions? Contact us at ' 
              : '❓ Har du fortfarande frågor? Kontakta oss på '}
            <a href="mailto:mario@eventika.se" className="font-semibold underline hover:text-primary">
              mario@eventika.se
            </a>
            {language === 'en' ? ' or call ' : ' eller ring '}
            <a href="tel:+46760345328" className="font-semibold underline hover:text-primary">
              +46 760 345 328
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
