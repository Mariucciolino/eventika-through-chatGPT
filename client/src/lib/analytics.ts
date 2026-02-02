// Analytics utility for tracking page views
// Uses Manus built-in analytics endpoint

const ANALYTICS_ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const WEBSITE_ID = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

export interface PageViewData {
  url: string;
  title: string;
  referrer?: string;
  language?: string;
}

export const trackPageView = async (data: PageViewData) => {
  if (!ANALYTICS_ENDPOINT || !WEBSITE_ID) {
    console.warn('Analytics not configured');
    return;
  }

  try {
    await fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        website_id: WEBSITE_ID,
        url: data.url,
        title: data.title,
        referrer: data.referrer || document.referrer,
        language: data.language || navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Silently fail in development - analytics endpoint not accessible from dev server
    if (import.meta.env.DEV) {
      console.debug('Analytics tracking skipped in development');
    } else {
      console.warn('Analytics tracking failed:', error);
    }
  }
};

export const usePageTracking = () => {
  const trackCurrentPage = () => {
    trackPageView({
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
      language: navigator.language,
    });
  };

  return { trackCurrentPage };
};
