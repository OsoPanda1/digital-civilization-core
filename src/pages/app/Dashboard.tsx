import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, Video, Music, GraduationCap, Ticket, ShoppingBag, 
  Palette, MessageCircle, TrendingUp, Zap, Eye, Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';

const quickActions = [
  { name: 'Muro Global', href: '/app/feed', icon: Users, color: 'from-blue-500 to-cyan-500', count: '2.4K posts' },
  { name: 'Streams Live', href: '/app/streams', icon: Video, color: 'from-red-500 to-pink-500', count: '48 en vivo' },
  { name: 'Conciertos', href: '/app/concerts', icon: Music, color: 'from-purple-500 to-violet-500', count: '12 próximos' },
  { name: 'Universidad', href: '/app/university', icon: GraduationCap, color: 'from-green-500 to-emerald-500', count: '340 cursos' },
  { name: 'Lotería', href: '/app/lottery', icon: Ticket, color: 'from-yellow-500 to-orange-500', count: '$24K premio' },
  { name: 'Marketplace', href: '/app/marketplace', icon: ShoppingBag, color: 'from-pink-500 to-rose-500', count: '1.2K items' },
  { name: 'Galería', href: '/app/gallery', icon: Palette, color: 'from-indigo-500 to-blue-500', count: '5.6K obras' },
  { name: 'Canales', href: '/app/channels', icon: MessageCircle, color: 'from-teal-500 to-green-500', count: '890 activos' },
];

const stats = [
  { label: 'Usuarios Activos', value: '124K', icon: Users, change: '+12%' },
  { label: 'Streams Hoy', value: '1.2K', icon: Video, change: '+8%' },
  { label: 'Transacciones', value: '$89K', icon: TrendingUp, change: '+24%' },
  { label: 'Tokens Circulando', value: '4.2M', icon: Zap, change: '+5%' },
];

const trendingContent = [
  { type: 'stream', title: 'Concierto Synthwave Night', creator: '@dj_quantum', viewers: '12.4K', thumbnail: '/placeholder.svg' },
  { type: 'course', title: 'Blockchain para Artistas', creator: '@crypto_art', students: '2.1K', thumbnail: '/placeholder.svg' },
  { type: 'artwork', title: 'Nebula Dreams #42', creator: '@stellar_art', likes: '8.9K', thumbnail: '/placeholder.svg' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = useProfile();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl p-6 border border-primary/30"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
            ) : (
              profile?.display_name?.charAt(0) || 'T'
            )}
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold">
              ¡Bienvenido, {profile?.display_name || 'Explorador'}!
            </h1>
            <p className="text-muted-foreground">
              Nivel {profile?.level || 1} • {profile?.xp || 0} XP • {profile?.tokens || 0} $TAMV
            </p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Tu actividad hoy</p>
              <p className="text-lg font-bold text-primary">+150 XP</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-green-400 font-medium">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-xl font-display font-bold mb-4">Explorar Dreamspaces</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={action.href}
                className="block group bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/50 transition-all hover:scale-[1.02]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{action.name}</h3>
                <p className="text-sm text-muted-foreground">{action.count}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trending Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trending */}
        <div>
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Tendencias
          </h2>
          <div className="space-y-3">
            {trendingContent.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-border rounded-xl p-3 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.creator}</p>
                  <div className="flex items-center gap-1 text-xs text-primary mt-1">
                    <Eye className="w-3 h-3" />
                    {item.viewers || item.students || item.likes}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Live Streams Preview */}
        <div>
          <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            En Vivo Ahora
          </h2>
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
            <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
              <img src="/placeholder.svg" alt="" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                12.4K espectadores
              </div>
            </div>
            <h3 className="font-semibold mb-1">Synthwave Night Vol. 42</h3>
            <p className="text-sm text-muted-foreground mb-3">@dj_quantum • Música Electrónica</p>
            <Link
              to="/app/streams"
              className="block w-full text-center py-2 bg-gradient-to-r from-primary to-accent rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Ver Todos los Streams
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
