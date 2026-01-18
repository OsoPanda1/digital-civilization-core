import { motion } from 'framer-motion';
import { Shield, Lock, Radar, Users, Eye, Fingerprint, Server, AlertTriangle } from 'lucide-react';

const securityLayers = [
  { name: 'Encriptación Cuántica', icon: Lock, level: 1 },
  { name: 'Autenticación Biométrica', icon: Fingerprint, level: 2 },
  { name: 'Firewalls Adaptativos', icon: Shield, level: 3 },
  { name: 'Monitoreo en Tiempo Real', icon: Eye, level: 4 },
];

const radars = [
  { name: 'Anti-Fraude', status: 'active', threats: 0 },
  { name: 'Anti-Malware', status: 'active', threats: 0 },
  { name: 'Anti-Phishing', status: 'active', threats: 0 },
  { name: 'Anti-Contenido Ilegal', status: 'active', threats: 0 },
];

const SecuritySection = () => {
  return (
    <section id="security" className="relative py-32 px-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-mono text-aurora-green mb-6">
            GUARDIANÍA ÉTICA
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-primary">22 Capas</span> de Seguridad
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La seguridad no es defensa, es <span className="text-aurora-green font-medium">ritual de confianza pública</span>. 
            Defensa multinivel con guardianía ética y redundancia viva.
          </p>
        </motion.div>

        {/* Main Security Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Security Layers */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Capas de Protección
            </h3>
            {securityLayers.map((layer, index) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 flex items-center gap-4 hover:border-aurora-green/30 border border-transparent transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-aurora-green/20 to-primary/20 flex items-center justify-center">
                  <layer.icon className="w-6 h-6 text-aurora-green" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{layer.name}</div>
                  <div className="text-xs text-muted-foreground">Nivel {layer.level} • Activo</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-aurora-green animate-pulse" />
              </motion.div>
            ))}
            <div className="text-center pt-4">
              <span className="text-sm text-muted-foreground">+ 18 capas adicionales</span>
            </div>
          </motion.div>

          {/* Center - Main Shield Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Outer Rings */}
              {[1, 2, 3, 4].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute inset-0 rounded-full border border-primary/20"
                  style={{
                    transform: `scale(${0.5 + ring * 0.15})`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [0.5 + ring * 0.15, 0.52 + ring * 0.15, 0.5 + ring * 0.15],
                  }}
                  transition={{
                    duration: 3,
                    delay: ring * 0.5,
                    repeat: Infinity,
                  }}
                />
              ))}

              {/* Center Shield */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-aurora-green to-primary flex items-center justify-center glow-primary"
                  animate={{
                    boxShadow: [
                      '0 0 30px hsl(150 80% 50% / 0.3)',
                      '0 0 60px hsl(150 80% 50% / 0.5)',
                      '0 0 30px hsl(150 80% 50% / 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="w-16 h-16 text-primary-foreground" />
                </motion.div>
              </div>

              {/* Orbiting Icons */}
              {[Lock, Eye, Fingerprint, Server].map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute w-10 h-10 rounded-full glass flex items-center justify-center"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: Math.cos((index * Math.PI) / 2 + Date.now() / 2000) * 100 - 20,
                    y: Math.sin((index * Math.PI) / 2 + Date.now() / 2000) * 100 - 20,
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Radar Status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
              <Radar className="w-5 h-5 text-accent" />
              4 Radares Anti-Fraude
            </h3>
            {radars.map((radar, index) => (
              <motion.div
                key={radar.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{radar.name}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-aurora-green/20 text-aurora-green">
                    {radar.status.toUpperCase()}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-aurora-green to-primary"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>0 amenazas detectadas</span>
                  <span>100% cobertura</span>
                </div>
              </motion.div>
            ))}

            {/* Twin Teams */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-4 border border-accent/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-medium">Equipos Gemelos en Paralelo</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Redundancia viva con inmunología digital. Dos equipos trabajando en espejo 24/7.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
