import { motion } from 'framer-motion';
import { Coins, TrendingUp, Wallet, Gift, Star, CreditCard, Sparkles, ArrowRight } from 'lucide-react';

const monetizationMethods = [
  'Suscripciones', 'NFT Sales', 'Subastas', 'Patrocinios', 
  'Propinas', 'Cursos', 'Eventos', 'Merchandising',
  'Comisiones', 'Staking', 'Royalties', 'Afiliados'
];

const tokenStats = [
  { label: 'Circulación', value: '100M', icon: Coins },
  { label: 'Holders', value: '250K+', icon: Wallet },
  { label: 'Volumen 24h', value: '$2.5M', icon: TrendingUp },
  { label: 'APY Staking', value: '12.5%', icon: Gift },
];

const EconomySection = () => {
  return (
    <section id="economy" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-solar-gold/5 via-transparent to-accent/5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-solar-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-mono text-accent mb-6">
            ECONOMÍA CEREMONIAL
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-gold">30 Formas</span> de Monetización
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La economía es <span className="text-accent font-medium">acto ceremonial</span>, transparente y creador-first.
            Token social tipo "estrellas" con respaldo en blockchain híbrido.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Token Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Token Display */}
            <div className="glass-strong rounded-3xl p-8 border border-accent/30 mb-8">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent via-solar-gold to-accent flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 30px hsl(42 100% 55% / 0.3)',
                      '0 0 50px hsl(42 100% 55% / 0.5)',
                      '0 0 30px hsl(42 100% 55% / 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-10 h-10 text-primary-foreground" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-gradient-gold">$TAMV</h3>
                  <p className="text-muted-foreground">Token Social del Ecosistema</p>
                </div>
              </div>

              {/* Token Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {tokenStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/30 rounded-xl p-4"
                  >
                    <stat.icon className="w-5 h-5 text-accent mb-2" />
                    <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-accent to-solar-gold text-primary-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Comprar $TAMV
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl glass border border-accent/30 font-semibold"
                >
                  Stake
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-medium text-sm">Sin Gas Fees</div>
                  <div className="text-xs text-muted-foreground">Transacciones gratuitas</div>
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-secondary" />
                <div>
                  <div className="font-medium text-sm">Instant Swap</div>
                  <div className="text-xs text-muted-foreground">Intercambio inmediato</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Monetization Methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-aurora-green" />
              Métodos de Monetización
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {monetizationMethods.map((method, index) => (
                <motion.span
                  key={method}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-xl glass text-sm font-medium cursor-pointer hover:border-accent/50 border border-transparent transition-all"
                >
                  {method}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="px-4 py-2 rounded-xl bg-accent/20 text-accent text-sm font-medium"
              >
                +18 más
              </motion.span>
            </div>

            {/* Revenue Split */}
            <div className="glass rounded-2xl p-6 mb-6">
              <h4 className="font-display font-bold mb-4">División de Ingresos</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Creadores</span>
                    <span className="text-aurora-green font-mono">85%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-aurora-green to-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Plataforma</span>
                    <span className="text-primary font-mono">10%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: '10%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tesorería DAO</span>
                    <span className="text-accent font-mono">5%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-accent to-solar-gold"
                      initial={{ width: 0 }}
                      whileInView={{ width: '5%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              href="#"
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-primary font-medium"
            >
              Ver whitepaper económico
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EconomySection;
