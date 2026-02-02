import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { MediaItem } from '@/lib/content';

interface CarouselProps {
  items: readonly MediaItem[] | MediaItem[];
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'responsive';
  objectFit?: 'cover' | 'contain';
}

export function Carousel({ items, className, aspectRatio = 'responsive', objectFit = 'cover' }: CarouselProps) {
  // Early return if no items - must be before hooks
  const safeItems = useMemo(() => items && items.length > 0 ? items : [], [items]);
  
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: safeItems.length > 1 }, 
    safeItems.length > 1 ? [autoplay.current] : []
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoading, setVideoLoading] = useState<boolean[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi || safeItems.length === 0) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    
    // Handle video playback
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          // Play current video
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("Auto-play was prevented:", error);
            });
          }
          // Stop carousel autoplay while video is playing
          if (safeItems.length > 1) {
            autoplay.current.stop();
          }
        } else {
          // Pause other videos
          video.pause();
        }
      }
    });
    
    // If current item is NOT a video, ensure carousel autoplay is running
    if (safeItems.length > 1 && safeItems[index] && safeItems[index].type !== 'video') {
      autoplay.current.play();
    }
  }, [emblaApi, safeItems]);

  // Handle video ending to resume carousel
  const handleVideoEnded = () => {
    if (safeItems.length > 1) {
      autoplay.current.play();
    }
    scrollNext();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Ensure video plays on mount for single-item carousels
  useEffect(() => {
    if (safeItems.length === 1 && safeItems[0].type === 'video') {
      const video = videoRefs.current[0];
      if (video) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Auto-play was prevented:", error);
          });
        }
      }
    }
  }, [safeItems]);

  // Responsive aspect ratio: 4:3 on mobile, 16:9 on desktop
  const aspectRatioClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    responsive: 'aspect-[4/3] md:aspect-video' // 4:3 on mobile, 16:9 on desktop
  }[aspectRatio];

  // Return null if no items
  if (safeItems.length === 0) return null;

  return (
    <div 
      className={cn("relative group h-full", className)}
      onMouseEnter={() => {
        // Only stop if not playing a video and has multiple items
        if (safeItems.length > 1 && safeItems[selectedIndex] && safeItems[selectedIndex].type !== 'video') {
          autoplay.current.stop();
        }
      }}
      onMouseLeave={() => {
        // Only resume if not playing a video and has multiple items
        if (safeItems.length > 1 && safeItems[selectedIndex] && safeItems[selectedIndex].type !== 'video') {
          autoplay.current.play();
        }
      }}
    >
      <div className="overflow-hidden rounded-xl shadow-lg h-full" ref={emblaRef}>
        <div className="flex h-full">
          {safeItems.map((item, index) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={index}>
              <div className={cn("w-full h-full relative overflow-hidden bg-black/5", aspectRatioClass)}>
                {item.type === 'video' ? (
                  <div className="relative w-full h-full group/video">
                    {videoLoading[index] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-20">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={item.src}
                      className="absolute inset-0 w-full h-full object-cover"
                      playsInline
                      autoPlay
                      muted={isMuted}
                      onEnded={handleVideoEnded}
                      onLoadStart={() => {
                        setVideoLoading(prev => {
                          const newState = [...prev];
                          newState[index] = true;
                          return newState;
                        });
                      }}
                      onCanPlay={() => {
                        setVideoLoading(prev => {
                          const newState = [...prev];
                          newState[index] = false;
                          return newState;
                        });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full z-10 opacity-0 group-hover/video:opacity-100 transition-opacity"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={cn(
                      "absolute inset-0 w-full h-full transition-transform duration-700",
                      objectFit === 'contain' ? 'object-contain' : 'object-cover hover:scale-105'
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {safeItems.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-md z-10"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary border-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full shadow-md z-10"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {safeItems.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm",
                  index === selectedIndex 
                    ? "bg-white w-6" 
                    : "bg-white/50 hover:bg-white/80"
                )}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
