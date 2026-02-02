import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/not-found";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import Experiences from '@/pages/Experiences';
import Location from '@/pages/Location';
import Booking from '@/pages/Booking';
import { Analytics } from '@/pages/Analytics';
import CalendarAdmin from '@/pages/CalendarAdmin';
import { Layout } from '@/components/Layout';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

function App() {
  const [location] = useLocation();

  // Track page views
  useEffect(() => {
    trackPageView({
      url: window.location.href,
      title: document.title,
    });
  }, [location]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/events" component={Events} />
                <Route path="/experiences" component={Experiences} />
                <Route path="/location" component={Location} />
                <Route path="/booking" component={Booking} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/calendar-admin" component={CalendarAdmin} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
            <Toaster />
          </ErrorBoundary>
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
