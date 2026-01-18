import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Users, Eye, Clock, Play, Radio, Filter,
  Search, ChevronDown, Zap, Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'music', name: 'Música' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'art', name: 'Arte' },
  { id: 'education', name: 'Educación' },
  { id: 'talk', name: 'Charlas' },
  { id: 'technology', name: 'Tecnología' },
];

const liveStreams = [
  {
    id: '1',
    title: 'Synthwave Night Vol. 42 - Electronic Journey',
    streamer: { name: 'DJ Quantum', username: 'dj_quantum', avatar: '/placeholder.svg', verified: true },
    viewers: 12400,
    thumbnail: '/placeholder.svg',
    category: 'Música',
    tags: ['synthwave', 'electronic', 'live'],
    duration: '2h 15m',
  },
  {
    id: '2',
    title: 'Creando NFTs en tiempo real - Tutorial completo',
    streamer: { name: 'Crypto Artist', username: 'crypto_art', avatar: '/placeholder.svg', verified: true },
    viewers: 5200,
    thumbnail: '/placeholder.svg',
    category: 'Arte',
    tags: ['nft', 'arte digital', 'tutorial'],
    duration: '1h 45m',
  },
  {
    id: '3',
    title: 'Desarrollo Web3 desde cero - Solidity & React',
    streamer: { name: 'Dev Master', username: 'dev_master', avatar: '/placeholder.svg', verified: false },
    viewers: 3100,
    thumbnail: '/placeholder.svg',
    category: 'Tecnología',
    tags: ['web3', 'blockchain', 'coding'],
    duration: '3h 20m',
  },
  {
    id: '4',
    title: 'Filosofía del Metaverso - Debate abierto',
    streamer: { name: 'Meta Thinker', username: 'meta_think', avatar: '/placeholder.svg', verified: true },
    viewers: 1800,
    thumbnail: '/placeholder.svg',
    category: 'Charlas',
    tags: ['filosofía', 'metaverso', 'debate'],
    duration: '0h 45m',
  },
];

const scheduledStreams = [
  {
    id: 's1',
    title: 'Masterclass: Producción Musical XR',
    streamer: { name: 'Sound Wave', username: 'sound_wave' },
    scheduledAt: '2024-01-20T20:00:00',
    category: 'Música',
  },
  {
    id: 's2',
    title: 'Torneo Gaming: TAMV Championship',
    streamer: { name: 'Gaming Hub', username: 'gaming_hub' },
    scheduledAt: '2024-01-21T18:00:00',
    category: 'Gaming',
  },
];

export default function Streams() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStreams = liveStreams.filter(stream => {
    const matchesCategory = activeCategory === 'all' || stream.category.toLowerCase() === activeCategory;
    const matchesSearch = stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stream.streamer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Radio className="w-6 h-6 text-red-500 animate-pulse" />
            Streaming
          </h1>
          <p className="text-muted-foreground">Contenido en vivo del Omniverse</p>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90">
          <Video className="w-4 h-4 mr-2" />
          Iniciar Stream
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar streams..."
            className="pl-10 bg-card/60"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Live Now Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <h2 className="text-lg font-semibold">En Vivo Ahora</h2>
          <span className="text-sm text-muted-foreground">({filteredStreams.length} streams)</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStreams.map((stream, i) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img src={stream.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Live Badge */}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </div>
                
                {/* Viewers */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {stream.viewers.toLocaleString()}
                </div>
                
                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md">
                  {stream.duration}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden flex-shrink-0">
                    <img src={stream.streamer.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {stream.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">{stream.streamer.name}</span>
                      {stream.streamer.verified && (
                        <span className="w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[6px] text-white">✓</span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{stream.category}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {stream.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scheduled Streams */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Próximamente</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {scheduledStreams.map((stream, i) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{stream.title}</h3>
                <p className="text-sm text-muted-foreground">@{stream.streamer.username}</p>
                <p className="text-xs text-primary mt-1">
                  {new Date(stream.scheduledAt).toLocaleDateString('es', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Zap className="w-4 h-4 mr-1" />
                Recordar
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
