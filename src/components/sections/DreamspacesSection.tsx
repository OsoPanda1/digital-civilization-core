import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Palette, 
  Coins, 
  Users, 
  Vote, 
  Music,
  Ticket,
  ShoppingBag,
  ArrowUpRight
} from 'lucide-react';

const dreamspaces = [
  {
    id: 'university',
    name: 'Universidad Digital',
    description: 'Educación inmersiva en XR/4D con certificaciones en blockchain',
    icon: GraduationCap,
    color: 'from-quantum-blue to-primary',
    stats: { courses: '1,200+', students: '50K+' },
  },
  {
    id: 'gallery',
    name: 'Galería de Arte',
    description: 'Colecciones NFT y exposiciones holográficas interactivas',
    icon: Palette,
    color: 'from-nebula-purple to-stellar-pink',
    stats: { artists: '2,500+', works: '15K+' },
  },
  {
    id: 'economy',
    name: 'Hub Económico',
    description: '30 formas de monetización con token social propio',
    icon: Coins,
    color: 'from-solar-gold to-accent',
    stats: { transactions: '1M+', volume: '$10M+' },
  },
  {
    id: 'guilds',
    name: 'Gremios',
    description: 'Comunidades de creadores con gobernanza descentralizada',
    icon: Users,
    color: 'from-aurora-green to-quantum-blue',
    stats: { guilds: '500+', members: '100K+' },
  },
  {
    id: 'dao',
    name: 'Gobernanza DAO',
    description: 'Votación transparente y decisiones comunitarias',
    icon: Vote,
    color: 'from-cosmic-red to-nebula-purple',
    stats: { proposals: '3,200+', votes: '500K+' },
  },
  {
    id: 'concerts',
    name: 'Conciertos XR',
    description: 'Eventos en vivo con experiencias inmersivas 4D',
    icon: Music,
    color: 'from-stellar-pink to-cosmic-red',
    stats: { events: '800+', attendees: '2M+' },
  },
  {
    id: 'lottery',
    name: 'Lotería Social',
    description: 'Sistema de recompensas justo con transparencia total',
    icon: Ticket,
    color: 'from-primary to-aurora-green',
    stats: { winners: '10K+', distributed: '$5M+' },
  },
  {
    id: 'marketplace',
    name: 'Mercado Global',
    description: 'Comercio peer-to-peer con custodia inteligente',
    icon: ShoppingBag,
    color: 'from-accent to-solar-gold',
    stats: { products: '25K+', sellers: '8K+' },
  },
];

const DreamspacesSection = () => {
  return (
    <section id="dreamspaces" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-mono text-primary mb-6">
            MÓDULOS INTERCONECTADOS
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-primary">Dreamspaces</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cada módulo es un universo autónomo pero interconectado, proyectado en experiencias XR/3D/4D
          </p>
        </motion.div>

        {/* Dreamspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dreamspaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 h-full border border-transparent hover:border-primary/30 transition-all duration-500">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${space.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <space.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {space.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {space.description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4">
                  {Object.entries(space.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-display font-bold text-primary text-lg">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Action */}
                <button className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorar
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${space.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DreamspacesSection;
