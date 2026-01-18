import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image, Video, Smile, Send, Heart, MessageCircle, Share2, 
  MoreHorizontal, Bookmark, TrendingUp, Users, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { usePosts, useCreatePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const tabs = [
  { id: 'trending', label: 'Tendencias', icon: TrendingUp },
  { id: 'following', label: 'Siguiendo', icon: Users },
  { id: 'recent', label: 'Recientes', icon: Clock },
];

export default function Feed() {
  const [activeTab, setActiveTab] = useState('trending');
  const [newPostContent, setNewPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: postsPages, isLoading, fetchNextPage, hasNextPage } = usePosts();
  const createPost = useCreatePost();

  const posts = postsPages?.pages.flat() || [];

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      await createPost.mutateAsync({ content: newPostContent });
      setNewPostContent('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Muro Global</h1>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post */}
      {user && (
        <motion.div
          layout
          className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden flex-shrink-0">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-medium">
                  {profile?.display_name?.charAt(0) || 'T'}
                </span>
              )}
            </div>
            <div className="flex-1">
              <Textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder="¿Qué está pasando en el Omniverse?"
                className="min-h-[60px] bg-background/50 border-0 resize-none focus-visible:ring-0"
              />
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between mt-3 pt-3 border-t border-border"
                  >
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-primary">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim() || createPost.isPending}
                      className="bg-gradient-to-r from-primary to-accent"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Publicar
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-card/60 border border-border rounded-xl p-4 animate-pulse">
              <div className="flex gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-muted rounded" />
                  <div className="w-20 h-3 bg-muted rounded" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-muted rounded" />
                <div className="w-3/4 h-4 bg-muted rounded" />
              </div>
            </div>
          ))
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-card/60 border border-border rounded-xl">
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No hay publicaciones aún</h3>
            <p className="text-muted-foreground text-sm">¡Sé el primero en publicar algo!</p>
          </div>
        ) : (
          posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                    {post.profiles?.avatar_url ? (
                      <img src={post.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-medium">
                        {post.profiles?.display_name?.charAt(0) || 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{post.profiles?.display_name || 'Usuario'}</span>
                      {post.profiles?.is_verified && (
                        <span className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-white">✓</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      @{post.profiles?.username} • {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

              {/* Post Media */}
              {post.media_urls && post.media_urls.length > 0 && (
                <div className="mb-4 rounded-xl overflow-hidden bg-muted">
                  <img 
                    src={post.media_urls[0]} 
                    alt="" 
                    className="w-full max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1">
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-500/10 rounded-lg transition-colors group">
                    <Heart className="w-5 h-5 text-muted-foreground group-hover:text-red-500" />
                    <span className="text-sm text-muted-foreground group-hover:text-red-500">
                      {post.likes_count}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-primary/10 rounded-lg transition-colors group">
                    <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-sm text-muted-foreground group-hover:text-primary">
                      {post.comments_count}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-green-500/10 rounded-lg transition-colors group">
                    <Share2 className="w-5 h-5 text-muted-foreground group-hover:text-green-500" />
                    <span className="text-sm text-muted-foreground group-hover:text-green-500">
                      {post.shares_count}
                    </span>
                  </button>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </motion.article>
          ))
        )}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="w-full py-3 text-center text-primary hover:bg-primary/10 rounded-xl transition-colors"
          >
            Cargar más publicaciones
          </button>
        )}
      </div>
    </div>
  );
}
