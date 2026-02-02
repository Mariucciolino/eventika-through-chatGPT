import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Users, Eye, TrendingUp, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Analytics() {
  const { language } = useLanguage();
  const [timeRange, setTimeRange] = useState('7d');
  
  const { data: stats, isLoading, error } = trpc.analytics.getStats.useQuery({
    startDate: undefined,
    endDate: undefined,
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">
              {language === 'en' ? 'Access Denied' : 'Åtkomst nekad'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'You do not have permission to view this page. Only the website owner can access analytics.' 
                : 'Du har inte behörighet att visa denna sida. Endast webbplatsägaren kan komma åt analyser.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="container">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">
              {language === 'en' ? 'Loading analytics...' : 'Laddar analyser...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: language === 'en' ? 'Total Page Views' : 'Totalt antal sidvisningar',
      value: stats?.totalPageViews || 0,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: language === 'en' ? 'Unique Visitors' : 'Unika besökare',
      value: stats?.uniqueVisitors || 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: language === 'en' ? 'Avg. Pages/Visit' : 'Genomsnitt sidor/besök',
      value: stats?.totalPageViews && stats?.uniqueVisitors 
        ? (stats.totalPageViews / stats.uniqueVisitors).toFixed(1)
        : '0',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: language === 'en' ? 'Popular Pages' : 'Populära sidor',
      value: stats?.popularPages?.length || 0,
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-20">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {language === 'en' ? 'Analytics Dashboard' : 'Analysinstrumentpanel'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? 'Track your website performance and visitor behavior' 
              : 'Spåra din webbplats prestanda och besökarbeteende'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Pages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {language === 'en' ? 'Most Visited Pages' : 'Mest besökta sidor'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.popularPages && stats.popularPages.length > 0 ? (
                <div className="space-y-4">
                  {stats.popularPages.slice(0, 10).map((page: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-sm font-medium text-muted-foreground">
                          {index + 1}.
                        </span>
                        <span className="text-sm truncate">{page.path || page.url || '/'}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold">{page.views || page.count || 0}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ 
                              width: `${((page.views || page.count || 0) / (stats.popularPages[0]?.views || stats.popularPages[0]?.count || 1)) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'en' ? 'No data available yet' : 'Ingen data tillgänglig ännu'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Referrers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                {language === 'en' ? 'Traffic Sources' : 'Trafikkällor'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats?.referrers && stats.referrers.length > 0 ? (
                <div className="space-y-4">
                  {stats.referrers.slice(0, 10).map((referrer: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-sm font-medium text-muted-foreground">
                          {index + 1}.
                        </span>
                        <span className="text-sm truncate">
                          {referrer.source || referrer.referrer || language === 'en' ? 'Direct' : 'Direkt'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold">{referrer.visits || referrer.count || 0}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ 
                              width: `${((referrer.visits || referrer.count || 0) / (stats.referrers[0]?.visits || stats.referrers[0]?.count || 1)) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'en' ? 'No data available yet' : 'Ingen data tillgänglig ännu'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-900">
              {language === 'en' 
                ? '📊 Analytics data is collected automatically from all visitors. Data updates in real-time as visitors browse your website.' 
                : '📊 Analysdata samlas in automatiskt från alla besökare. Data uppdateras i realtid när besökare surfar på din webbplats.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
