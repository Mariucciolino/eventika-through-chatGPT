import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { getLoginUrl } from '@/const';

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { data: user } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => window.location.reload(),
  });

  const navLinks = [
    { key: 'home', label: t.nav.home.toLowerCase(), href: '/' },
    { key: 'location', label: t.nav.location.toLowerCase(), href: '/location' },
    { key: 'events', label: t.nav.events.toLowerCase(), href: '/events' },
    { key: 'experiences', label: t.nav.experiences.toLowerCase(), href: '/experiences' },
    { key: 'booking', label: t.nav.booking.toLowerCase(), href: '/booking' },
  ];

  return (
    <header className="bg-white py-6 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        {/* Empty div to balance the flex layout if logo is removed or hidden as per screenshot */}
        <div className="hidden md:block w-1/6"></div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-12 flex-grow">
          {navLinks.map((link) => (
            <Link 
              key={link.key} 
              href={link.href}
              className={cn(
                "text-lg font-medium transition-colors border-b-2 pb-1",
                location === link.href 
                  ? "text-[#5e2a84] border-[#5e2a84]" 
                  : "text-gray-600 hover:text-[#5e2a84] border-transparent"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* User & Language Toggle - Right Aligned */}
        <div className="hidden md:flex items-center gap-4 w-1/6 justify-end">
          {user ? (
            <button
              onClick={() => logoutMutation.mutate()}
              className="text-gray-600 hover:text-[#5e2a84] transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          ) : (
            <a
              href={getLoginUrl()}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#5e2a84] transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </a>
          )}
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              "rounded-lg px-3 py-1 font-bold text-sm transition-colors",
              language === 'en' 
                ? "bg-[#4a1d6e] text-white" 
                : "text-gray-800 hover:bg-gray-100"
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('sv')}
            className={cn(
              "rounded-lg px-3 py-1 font-bold text-sm transition-colors",
              language === 'sv' 
                ? "bg-[#4a1d6e] text-white" 
                : "text-gray-800 hover:bg-gray-100"
            )}
          >
            SV
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Link href="/" className="flex items-center gap-2 z-50 relative">
            <img 
              src="/images/logo_eventika.jpg" 
              alt="Eventika Logo" 
              className="h-10 w-auto object-contain" 
            />
          </Link>
          
          <button
            className="z-50 p-2 text-[#5e2a84]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.key} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-2xl font-medium transition-colors",
                location === link.href ? "text-[#5e2a84]" : "text-gray-600 hover:text-[#5e2a84]"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-6 mt-8">
            <button
              onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }}
              className={cn(
                "rounded-lg px-6 py-2 font-bold text-lg transition-colors",
                language === 'en' 
                  ? "bg-[#4a1d6e] text-white" 
                  : "text-gray-800 border border-gray-200"
              )}
            >
              EN
            </button>
            <button
              onClick={() => { setLanguage('sv'); setIsMobileMenuOpen(false); }}
              className={cn(
                "rounded-lg px-6 py-2 font-bold text-lg transition-colors",
                language === 'sv' 
                  ? "bg-[#4a1d6e] text-white" 
                  : "text-gray-800 border border-gray-200"
              )}
            >
              SV
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
