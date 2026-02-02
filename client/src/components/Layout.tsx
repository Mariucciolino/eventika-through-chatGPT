import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Instagram, Facebook, Youtube, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { language } = useLanguage();
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Navigation />
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-primary text-white py-12">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-serif font-bold">Eventika</span>
            </div>
            <p className="text-white/80 mb-6">
              {language === 'en' 
                ? "Where unforgettable memories take shape." 
                : "Där oförglömliga minnen tar form."}
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/eventikasweden/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61557832736118" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@Eventika.Officiell" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@eventika_landvetter" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">Contact</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <span>📞</span> <a href="tel:+46760345328" className="hover:text-white transition-colors">+46 760 345 328</a>
              </li>
              <li className="flex items-center gap-3">
                <span>✉️</span> <a href="mailto:mario@eventika.se" className="hover:text-white transition-colors">mario@eventika.se</a>
              </li>
              <li className="flex items-center gap-3">
                <span>📍</span> <span>20 min from Göteborg</span>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className="flex items-center justify-between w-full text-xl font-bold mb-6 border-b border-white/20 pb-2"
              >
                <span>{language === 'sv' ? 'Snabblänkar' : 'Quick Links'}</span>
                {isQuickLinksOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              <ul className={cn("space-y-3 text-white/80 overflow-hidden transition-all duration-300", isQuickLinksOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/location" className="hover:text-white transition-colors">Location</a></li>
                <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="/experiences" className="hover:text-white transition-colors">Experiences</a></li>
                <li><a href="/booking" className="hover:text-white transition-colors">Book Now</a></li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2 inline-block">{language === 'sv' ? 'Snabblänkar' : 'Quick Links'}</h3>
              <ul className="space-y-3 text-white/80">
              <li><a href="/" className="hover:text-white transition-colors">{language === 'sv' ? 'hem' : 'Home'}</a></li>
              <li><a href="/location" className="hover:text-white transition-colors">{language === 'sv' ? 'stället' : 'Location'}</a></li>
              <li><a href="/events" className="hover:text-white transition-colors">{language === 'sv' ? 'evenemang' : 'Events'}</a></li>
              <li><a href="/experiences" className="hover:text-white transition-colors">{language === 'sv' ? 'upplevelser' : 'Experiences'}</a></li>
              <li><a href="/booking" className="hover:text-white transition-colors">{language === 'sv' ? 'bokningsförfrågan' : 'Book Now'}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="container mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Eventika. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
