import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Search, Filter, Heart, Eye, Share2, 
  Maximize2, Grid, LayoutGrid, Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'Todas' },
  { id: 'digital', name: 'Digital Art' },
  { id: '3d', name: '3D / XR' },
  { id: 'generative', name: 'Generativo' },
  { id: 'photography', name: 'Fotografía' },
  { id: 'animation', name: 'Animación' },
];

const artworks = [
  {
    id: '1',
    title: 'Nebula Dreams #42',
    creator: { name: 'Stellar Art', username: 'stellar_art', verified: true },
    imageUrl: '/placeholder.svg',
    mediaType: 'image',
    price: 250,
    currency: 'TAMV',
    isForSale: true,
    isNft: true,
    likesCount: 8934,
    viewsCount: 45678,
    category: 'digital',
    featured: true,
  },
  {
    id: '2',
    title: 'Quantum Geometry',
    creator: { name: 'Abstract Mind', username: 'abstract_mind', verified: true },
    imageUrl: '/placeholder.svg',
    mediaType: 'image',
    price: 180,
    currency: 'TAMV',
    isForSale: true,
    isNft: true,
    likesCount: 5621,
    viewsCount: 23456,
    category: 'generative',
    featured: false,
  },
  {
    id: '3',
    title: 'Cyber Samurai',
    creator: { name: '3D Master', username: '3d_master', verified: false },
    imageUrl: '/placeholder.svg',
    mediaType: '3d',
    price: 500,
    currency: 'TAMV',
    isForSale: true,
    isNft: true,
    likesCount: 12045,
    viewsCount: 67890,
    category: '3d',
    featured: true,
  },
  {
    id: '4',
    title: 'Electric Waves',
    creator: { name: 'Motion Artist', username: 'motion_art', verified: true },
    imageUrl: '/placeholder.svg',
    mediaType: 'video',
    likesCount: 3456,
    viewsCount: 18234,
    category: 'animation',
    isForSale: false,
    isNft: false,
    featured: false,
  },
  {
    id: '5',
    title: 'Neural Garden',
    creator: { name: 'AI Artist', username: 'ai_artist', verified: true },
    imageUrl: '/placeholder.svg',
    mediaType: 'image',
    price: 320,
    currency: 'TAMV',
    isForSale: true,
    isNft: true,
    likesCount: 7823,
    viewsCount: 34567,
    category: 'generative',
    featured: false,
  },
  {
    id: '6',
    title: 'Holographic Portrait',
    creator: { name: 'Future Photo', username: 'future_photo', verified: false },
    imageUrl: '/placeholder.svg',
    mediaType: 'image',
    likesCount: 2341,
    viewsCount: 12345,
    category: 'photography',
    isForSale: false,
    isNft: false,
    featured: false,
  },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [layout, setLayout] = useState<'masonry' | 'grid'>('masonry');

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = activeCategory === 'all' || artwork.category === activeCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.creator.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Galería de Arte
          </h1>
          <p className="text-muted-foreground">Descubre arte digital del Omniverse</p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">
          <Sparkles className="w-4 h-4 mr-2" />
          Subir Obra
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar obras, artistas..."
            className="pl-10 bg-card/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setLayout('masonry')}
              className={`p-2 ${layout === 'masonry' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 ${layout === 'grid' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={layout === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'}>
        {filteredArtworks.map((artwork, i) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer ${
              layout === 'masonry' ? 'break-inside-avoid' : ''
            }`}
          >
            {/* Image */}
            <div className={`relative bg-muted overflow-hidden ${layout === 'grid' ? 'aspect-square' : ''}`}>
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                  layout === 'grid' ? 'h-full' : 'h-auto'
                }`}
                style={layout === 'masonry' ? { minHeight: 200 + (i % 3) * 100 } : undefined}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {artwork.isNft && (
                  <span className="px-2 py-1 bg-purple-500/80 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                    NFT
                  </span>
                )}
                {artwork.featured && (
                  <span className="px-2 py-1 bg-yellow-500/80 backdrop-blur-sm text-black text-xs font-medium rounded-md">
                    Destacado
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {artwork.title}
              </h3>
              
              <div className="flex items-center gap-1 mb-3">
                <span className="text-sm text-muted-foreground">@{artwork.creator.username}</span>
                {artwork.creator.verified && (
                  <span className="w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[6px] text-white">✓</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {artwork.likesCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {artwork.viewsCount.toLocaleString()}
                  </span>
                </div>
                {artwork.isForSale && (
                  <span className="font-bold text-primary">
                    {artwork.price} {artwork.currency}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
