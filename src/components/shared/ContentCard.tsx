import { motion } from 'framer-motion';
import { Heart, Eye, Clock, Users, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  type?: 'stream' | 'concert' | 'course' | 'artwork' | 'video';
  stats?: {
    likes?: number;
    views?: number;
    duration?: string;
    viewers?: number;
  };
  badges?: Array<{ label: string; color?: string }>;
  price?: { amount: number; currency: string };
  isLive?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function ContentCard({
  title,
  subtitle,
  imageUrl,
  type = 'artwork',
  stats,
  badges = [],
  price,
  isLive,
  onClick,
  className = ''
}: ContentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay with play button for video content */}
        {(type === 'stream' || type === 'video') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-primary-foreground fill-current" />
            </div>
          </div>
        )}

        {/* Live Badge */}
        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            EN VIVO
          </div>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {badges.map((badge, i) => (
              <span
                key={i}
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded-md backdrop-blur-sm',
                  badge.color || 'bg-primary/80 text-primary-foreground'
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {/* Duration for courses/videos */}
        {stats?.duration && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
            {stats.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{subtitle}</p>
        )}

        {/* Stats */}
        {stats && (
          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            {stats.viewers !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {stats.viewers.toLocaleString()}
              </span>
            )}
            {stats.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {stats.views.toLocaleString()}
              </span>
            )}
            {stats.likes !== undefined && (
              <span className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {stats.likes.toLocaleString()}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        {price && (
          <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Precio</span>
            <span className="font-bold text-primary">
              {price.amount} {price.currency}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
