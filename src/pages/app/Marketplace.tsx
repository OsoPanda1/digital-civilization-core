import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Search, Filter, Grid, List, Heart,
  Star, ShoppingCart, Tag, TrendingUp
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'digital', name: 'Digital' },
  { id: 'physical', name: 'Físico' },
  { id: 'services', name: 'Servicios' },
  { id: 'collectibles', name: 'Coleccionables' },
  { id: 'wearables', name: 'Wearables' },
];

const items = [
  {
    id: '1',
    title: 'Quantum Avatar Pack',
    seller: { name: 'Avatar Studio', username: 'avatar_studio', verified: true },
    images: ['/placeholder.svg'],
    price: 150,
    originalPrice: 200,
    currency: 'TAMV',
    category: 'digital',
    rating: 4.9,
    reviewsCount: 234,
    salesCount: 1250,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'XR Concert Experience Pass',
    seller: { name: 'EventMaster', username: 'event_master', verified: true },
    images: ['/placeholder.svg'],
    price: 75,
    currency: 'TAMV',
    category: 'services',
    rating: 4.8,
    reviewsCount: 89,
    salesCount: 567,
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Limited NFT Collection #42',
    seller: { name: 'CryptoArtist', username: 'crypto_art', verified: true },
    images: ['/placeholder.svg'],
    price: 500,
    currency: 'TAMV',
    category: 'collectibles',
    rating: 5.0,
    reviewsCount: 45,
    salesCount: 12,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'Virtual Land Plot - Prime Location',
    seller: { name: 'MetaRealty', username: 'meta_realty', verified: true },
    images: ['/placeholder.svg'],
    price: 2500,
    currency: 'TAMV',
    category: 'digital',
    rating: 4.7,
    reviewsCount: 23,
    salesCount: 8,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Custom Music Production',
    seller: { name: 'SoundWave', username: 'sound_wave', verified: false },
    images: ['/placeholder.svg'],
    price: 300,
    currency: 'TAMV',
    category: 'services',
    rating: 4.9,
    reviewsCount: 156,
    salesCount: 423,
    isFeatured: false,
  },
  {
    id: '6',
    title: 'Holographic Wearable Set',
    seller: { name: 'FutureFashion', username: 'future_fashion', verified: true },
    images: ['/placeholder.svg'],
    price: 85,
    originalPrice: 120,
    currency: 'TAMV',
    category: 'wearables',
    rating: 4.6,
    reviewsCount: 312,
    salesCount: 890,
    isFeatured: false,
  },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Marketplace
          </h1>
          <p className="text-muted-foreground">Compra, vende e intercambia en el Omniverse</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Carrito (3)
          </Button>
          <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90">
            <Tag className="w-4 h-4 mr-2" />
            Vender
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="pl-10 bg-card/60"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-muted'}`}
            >
              <List className="w-4 h-4" />
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

      {/* Featured Items */}
      {activeCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Destacados
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {items.filter(i => i.isFeatured).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="w-24 h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">@{item.seller.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-primary">{item.price} {item.currency}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-4'}>
        {filteredItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`group bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all cursor-pointer ${
              viewMode === 'list' ? 'flex gap-4 p-4' : ''
            }`}
          >
            {/* Image */}
            <div className={`relative bg-muted overflow-hidden ${viewMode === 'list' ? 'w-32 h-32 rounded-lg flex-shrink-0' : 'aspect-square'}`}>
              <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              
              {item.originalPrice && (
                <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md">
                  -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                </span>
              )}
              
              <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70">
                <Heart className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Info */}
            <div className={viewMode === 'list' ? 'flex-1 min-w-0' : 'p-4'}>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm text-muted-foreground">@{item.seller.username}</span>
                {item.seller.verified && (
                  <span className="w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[6px] text-white">✓</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">{item.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({item.reviewsCount})</span>
                <span className="text-xs text-muted-foreground">• {item.salesCount} ventas</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{item.price} {item.currency}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                  )}
                </div>
                {viewMode === 'list' && (
                  <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
