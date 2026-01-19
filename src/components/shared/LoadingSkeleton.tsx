import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  variant?: 'card' | 'post' | 'stream' | 'course' | 'artwork';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({ 
  variant = 'card', 
  count = 1,
  className = ''
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = (key: number) => {
    switch (variant) {
      case 'post':
        return (
          <div key={key} className="bg-card/60 border border-border rounded-xl p-4 animate-pulse">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="space-y-2 flex-1">
                <div className="w-32 h-4 bg-muted rounded" />
                <div className="w-20 h-3 bg-muted rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-muted rounded" />
              <div className="w-3/4 h-4 bg-muted rounded" />
            </div>
          </div>
        );

      case 'stream':
        return (
          <div key={key} className="bg-card/60 border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="w-3/4 h-4 bg-muted rounded" />
                  <div className="w-1/2 h-3 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'course':
        return (
          <div key={key} className="bg-card/60 border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted" />
            <div className="p-4 space-y-3">
              <div className="w-3/4 h-5 bg-muted rounded" />
              <div className="w-full h-3 bg-muted rounded" />
              <div className="w-2/3 h-3 bg-muted rounded" />
              <div className="flex justify-between pt-2">
                <div className="w-20 h-4 bg-muted rounded" />
                <div className="w-16 h-4 bg-muted rounded" />
              </div>
            </div>
          </div>
        );

      case 'artwork':
        return (
          <div key={key} className="bg-card/60 border border-border rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-square bg-muted" />
            <div className="p-4 space-y-2">
              <div className="w-2/3 h-4 bg-muted rounded" />
              <div className="w-1/2 h-3 bg-muted rounded" />
            </div>
          </div>
        );

      default:
        return (
          <div key={key} className="bg-card/60 border border-border rounded-xl p-4 animate-pulse">
            <div className="w-full h-4 bg-muted rounded mb-3" />
            <div className="w-2/3 h-4 bg-muted rounded mb-3" />
            <div className="w-1/2 h-3 bg-muted rounded" />
          </div>
        );
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {skeletons.map(renderSkeleton)}
    </div>
  );
}
