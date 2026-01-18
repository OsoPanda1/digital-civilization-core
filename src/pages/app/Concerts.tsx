import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, Calendar, MapPin, Users, Ticket, Play, Star,
  Volume2, Sparkles, Heart, Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const concerts = [
  {
    id: '1',
    title: 'Quantum Symphony Night',
    artist: 'DJ Quantum & Orchestra',
    description: 'Una fusión única de música electrónica y orquestal en un espacio XR inmersivo.',
    date: '2024-01-25T21:00:00',
    venue: 'Dreamspace Arena',
    venueType: 'xr',
    ticketPrice: 50,
    currency: 'TAMV',
    capacity: 10000,
    attendees: 7823,
    coverImage: '/placeholder.svg',
    genres: ['Electronic', 'Orchestral', 'Ambient'],
    featured: true,
  },
  {
    id: '2',
    title: 'Neon Dreams Festival',
    artist: 'Multiple Artists',
    description: 'Festival de 3 días con los mejores artistas del metaverso.',
    date: '2024-02-01T18:00:00',
    venue: 'Virtual Stadium',
    venueType: 'virtual',
    ticketPrice: 120,
    currency: 'TAMV',
    capacity: 50000,
    attendees: 34521,
    coverImage: '/placeholder.svg',
    genres: ['EDM', 'House', 'Techno'],
    featured: true,
  },
  {
    id: '3',
    title: 'Acoustic Sunset Sessions',
    artist: 'Luna Wave',
    description: 'Sesión íntima de música acústica en un ambiente relajado.',
    date: '2024-01-28T19:00:00',
    venue: 'Harmony Hall',
    venueType: 'hybrid',
    ticketPrice: 25,
    currency: 'TAMV',
    capacity: 500,
    attendees: 432,
    coverImage: '/placeholder.svg',
    genres: ['Acoustic', 'Folk', 'Indie'],
    featured: false,
  },
  {
    id: '4',
    title: 'Bass Drop Universe',
    artist: 'Heavy Waves Collective',
    description: 'El bass más pesado del metaverso. Experiencia sensorial completa.',
    date: '2024-02-05T22:00:00',
    venue: 'Quantum Club',
    venueType: 'xr',
    ticketPrice: 75,
    currency: 'TAMV',
    capacity: 5000,
    attendees: 3891,
    coverImage: '/placeholder.svg',
    genres: ['Dubstep', 'Bass', 'Trap'],
    featured: false,
  },
];

const venueTypeLabels: Record<string, { label: string; color: string }> = {
  xr: { label: 'XR Immersivo', color: 'from-purple-500 to-pink-500' },
  virtual: { label: 'Virtual', color: 'from-blue-500 to-cyan-500' },
  hybrid: { label: 'Híbrido', color: 'from-green-500 to-teal-500' },
};

export default function Concerts() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'featured'>('all');

  const filteredConcerts = concerts.filter(concert => {
    if (filter === 'featured') return concert.featured;
    if (filter === 'upcoming') return new Date(concert.date) > new Date();
    return true;
  });

  const featuredConcert = concerts.find(c => c.featured);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Music className="w-6 h-6 text-primary" />
            Conciertos Sensoriales
          </h1>
          <p className="text-muted-foreground">Experiencias musicales inmersivas en XR</p>
        </div>
        <div className="flex items-center gap-2">
          {['all', 'upcoming', 'featured'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'upcoming' ? 'Próximos' : 'Destacados'}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Concert */}
      {featuredConcert && filter !== 'upcoming' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 border border-primary/30"
        >
          <div className="absolute inset-0">
            <img src={featuredConcert.coverImage} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          </div>
          
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Evento Destacado
                </span>
                <span className={`px-3 py-1 bg-gradient-to-r ${venueTypeLabels[featuredConcert.venueType].color} rounded-full text-xs font-medium text-white`}>
                  {venueTypeLabels[featuredConcert.venueType].label}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                {featuredConcert.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-4">{featuredConcert.artist}</p>
              <p className="text-muted-foreground mb-6 max-w-xl">{featuredConcert.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(featuredConcert.date).toLocaleDateString('es', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  {featuredConcert.venue}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  {featuredConcert.attendees.toLocaleString()} / {featuredConcert.capacity.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {featuredConcert.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-muted rounded-full text-xs">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90" size="lg">
                  <Ticket className="w-5 h-5 mr-2" />
                  Comprar Ticket - {featuredConcert.ticketPrice} {featuredConcert.currency}
                </Button>
                <button className="p-3 rounded-full border border-border hover:bg-muted transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-full border border-border hover:bg-muted transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Audio Visualizer Placeholder */}
            <div className="w-full md:w-80 aspect-square rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-center gap-1 p-8">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-4 bg-gradient-to-t from-primary to-accent rounded-full"
                    animate={{
                      height: [20, 40 + Math.random() * 80, 20],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 text-white ml-1" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Concert Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcerts.filter(c => !c.featured || filter !== 'all').map((concert, i) => (
          <motion.div
            key={concert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
          >
            {/* Cover */}
            <div className="relative aspect-[16/10] bg-muted overflow-hidden">
              <img src={concert.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <span className={`absolute top-3 left-3 px-2 py-1 bg-gradient-to-r ${venueTypeLabels[concert.venueType].color} rounded-md text-xs font-medium text-white`}>
                {venueTypeLabels[concert.venueType].label}
              </span>

              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-xs flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(concert.date).toLocaleDateString('es', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {concert.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{concert.artist}</p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {concert.venue}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {concert.attendees.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="font-bold text-primary">{concert.ticketPrice} {concert.currency}</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                  <Ticket className="w-4 h-4 mr-1" />
                  Tickets
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
