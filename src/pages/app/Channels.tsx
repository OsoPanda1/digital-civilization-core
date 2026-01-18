import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Search, Users, Plus, Hash, Lock,
  Volume2, Settings, Star, ChevronRight, Bell
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const channelTypes = [
  { id: 'all', name: 'Todos' },
  { id: 'channel', name: 'Canales' },
  { id: 'group', name: 'Grupos' },
  { id: 'community', name: 'Comunidades' },
];

const channels = [
  {
    id: '1',
    name: 'TAMV Official',
    slug: 'tamv-official',
    description: 'Canal oficial del ecosistema TAMV',
    avatarUrl: '/placeholder.svg',
    type: 'channel',
    isPublic: true,
    membersCount: 45678,
    isVerified: true,
    category: 'Oficial',
  },
  {
    id: '2',
    name: 'Crypto Artists United',
    slug: 'crypto-artists',
    description: 'Comunidad de artistas digitales y creadores de NFT',
    avatarUrl: '/placeholder.svg',
    type: 'community',
    isPublic: true,
    membersCount: 12345,
    isVerified: true,
    category: 'Arte',
  },
  {
    id: '3',
    name: 'Dev Hub',
    slug: 'dev-hub',
    description: 'Desarrollo, código y tecnología del Omniverse',
    avatarUrl: '/placeholder.svg',
    type: 'channel',
    isPublic: true,
    membersCount: 8901,
    isVerified: false,
    category: 'Desarrollo',
  },
  {
    id: '4',
    name: 'Music Producers',
    slug: 'music-producers',
    description: 'Producción musical, beats y colaboraciones',
    avatarUrl: '/placeholder.svg',
    type: 'group',
    isPublic: true,
    membersCount: 5432,
    isVerified: false,
    category: 'Música',
  },
  {
    id: '5',
    name: 'Trading & Economy',
    slug: 'trading-economy',
    description: 'Discusiones sobre tokens, trading y economía TAMV',
    avatarUrl: '/placeholder.svg',
    type: 'channel',
    isPublic: true,
    membersCount: 23456,
    isVerified: true,
    category: 'Economía',
  },
  {
    id: '6',
    name: 'XR Creators',
    slug: 'xr-creators',
    description: 'Creación de experiencias XR y realidad virtual',
    avatarUrl: '/placeholder.svg',
    type: 'community',
    isPublic: true,
    membersCount: 3456,
    isVerified: false,
    category: 'XR/VR',
  },
];

const myChannels = [
  { id: '1', name: 'TAMV Official', unread: 5 },
  { id: '2', name: 'Crypto Artists United', unread: 12 },
  { id: '5', name: 'Trading & Economy', unread: 0 },
];

export default function Channels() {
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChannels = channels.filter(channel => {
    const matchesType = activeType === 'all' || channel.type === activeType;
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-6 h-[calc(100vh-120px)]">
      {/* Sidebar - My Channels */}
      <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hidden lg:flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Mis Canales</h2>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto">
          {myChannels.map((channel) => (
            <button
              key={channel.id}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="flex-1 truncate text-sm">{channel.name}</span>
              {channel.unread > 0 && (
                <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                  {channel.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-border mt-4">
          <Button variant="outline" className="w-full" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            Mensajes Directos
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              Canales & Grupos
            </h1>
            <p className="text-muted-foreground">Únete a conversaciones del Omniverse</p>
          </div>
          <Button className="bg-gradient-to-r from-teal-500 to-green-500 hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Crear Canal
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar canales..."
              className="pl-10 bg-card/60"
            />
          </div>
          <div className="flex items-center gap-2">
            {channelTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeType === type.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredChannels.map((channel, i) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src={channel.avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                      {channel.name}
                    </h3>
                    {channel.isVerified && (
                      <span className="w-4 h-4 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[8px] text-white">✓</span>
                      </span>
                    )}
                    {!channel.isPublic && (
                      <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {channel.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {channel.membersCount.toLocaleString()} miembros
                    </span>
                    <span className="px-2 py-0.5 bg-muted rounded-full">
                      {channel.category}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    Unirse
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Communities */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Comunidades Destacadas
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {channels.filter(c => c.isVerified).slice(0, 3).map((channel, i) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent overflow-hidden">
                    <img src={channel.avatarUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{channel.name}</h3>
                    <p className="text-xs text-muted-foreground">{channel.membersCount.toLocaleString()} miembros</p>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-gradient-to-r from-primary to-accent">
                  Unirse
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
