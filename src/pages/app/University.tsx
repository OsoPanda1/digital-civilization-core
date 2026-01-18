import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, BookOpen, Users, Clock, Star, Play,
  Award, Search, Filter, ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'Todos', count: 340 },
  { id: 'blockchain', name: 'Blockchain', count: 45 },
  { id: 'art', name: 'Arte Digital', count: 78 },
  { id: 'music', name: 'Producción Musical', count: 56 },
  { id: 'dev', name: 'Desarrollo', count: 89 },
  { id: 'business', name: 'Negocios', count: 42 },
  { id: 'ai', name: 'IA & ML', count: 30 },
];

const courses = [
  {
    id: '1',
    title: 'Blockchain para Creadores: De Cero a NFTs',
    instructor: { name: 'Dr. Crypto', username: 'dr_crypto', avatar: '/placeholder.svg' },
    thumbnail: '/placeholder.svg',
    category: 'Blockchain',
    level: 'beginner',
    price: 99,
    originalPrice: 199,
    currency: 'TAMV',
    rating: 4.9,
    reviewsCount: 1234,
    studentsCount: 5678,
    lessonsCount: 42,
    duration: '8h 30m',
    isFree: false,
    isBestseller: true,
  },
  {
    id: '2',
    title: 'Producción Musical en el Metaverso',
    instructor: { name: 'Sound Master', username: 'sound_master', avatar: '/placeholder.svg' },
    thumbnail: '/placeholder.svg',
    category: 'Producción Musical',
    level: 'intermediate',
    price: 149,
    currency: 'TAMV',
    rating: 4.8,
    reviewsCount: 892,
    studentsCount: 3421,
    lessonsCount: 56,
    duration: '12h 15m',
    isFree: false,
    isBestseller: false,
  },
  {
    id: '3',
    title: 'Introducción a Web3 y DApps',
    instructor: { name: 'Dev Guru', username: 'dev_guru', avatar: '/placeholder.svg' },
    thumbnail: '/placeholder.svg',
    category: 'Desarrollo',
    level: 'beginner',
    price: 0,
    currency: 'TAMV',
    rating: 4.7,
    reviewsCount: 2341,
    studentsCount: 12456,
    lessonsCount: 24,
    duration: '4h 45m',
    isFree: true,
    isBestseller: false,
  },
  {
    id: '4',
    title: 'Arte Generativo con IA',
    instructor: { name: 'AI Artist', username: 'ai_artist', avatar: '/placeholder.svg' },
    thumbnail: '/placeholder.svg',
    category: 'Arte Digital',
    level: 'advanced',
    price: 199,
    currency: 'TAMV',
    rating: 4.9,
    reviewsCount: 567,
    studentsCount: 1890,
    lessonsCount: 38,
    duration: '10h 20m',
    isFree: false,
    isBestseller: true,
  },
];

const levelColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  advanced: 'bg-red-500/20 text-red-400',
  expert: 'bg-purple-500/20 text-purple-400',
};

const levelLabels: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  expert: 'Experto',
};

export default function University() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'all' || 
      course.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary" />
            Universidad TAMV
          </h1>
          <p className="text-muted-foreground">Aprende de los mejores creadores del Omniverse</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90">
          <BookOpen className="w-4 h-4 mr-2" />
          Crear Curso
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Cursos', value: '340+', icon: BookOpen },
          { label: 'Estudiantes', value: '45K+', icon: Users },
          { label: 'Instructores', value: '120+', icon: GraduationCap },
          { label: 'Certificados', value: '12K+', icon: Award },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 text-center"
          >
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search and Categories */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cursos, instructores..."
            className="pl-10 bg-card/60"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name}
              <span className={`text-xs ${activeCategory === cat.id ? 'text-white/70' : 'text-muted-foreground'}`}>
                ({cat.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {course.isFree && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-md">
                    GRATIS
                  </span>
                )}
                {course.isBestseller && (
                  <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-medium rounded-md">
                    BESTSELLER
                  </span>
                )}
              </div>

              <span className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${levelColors[course.level]}`}>
                {levelLabels[course.level]}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[48px]">
                {course.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
                  <img src={course.instructor.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium text-sm">{course.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({course.reviewsCount.toLocaleString()} reseñas)</span>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {course.lessonsCount} lecciones
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                {course.isFree ? (
                  <span className="text-lg font-bold text-green-400">Gratis</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{course.price} {course.currency}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                )}
                <span className="text-xs text-muted-foreground">
                  {course.studentsCount.toLocaleString()} estudiantes
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Ver Más Cursos
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
