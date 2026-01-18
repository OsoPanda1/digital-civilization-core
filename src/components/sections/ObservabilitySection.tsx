import { motion } from 'framer-motion';
import { Activity, BarChart3, Eye, Gauge, LineChart, Zap } from 'lucide-react';

const metrics = [
  { label: 'Latencia P99', value: '0.8ms', change: '-12%', positive: true },
  { label: 'Throughput', value: '1.2M/s', change: '+23%', positive: true },
  { label: 'Error Rate', value: '0.001%', change: '-45%', positive: true },
  { label: 'Uptime', value: '99.999%', change: '+0.01%', positive: true },
];

const tools = [
  { name: 'OpenTelemetry', desc: 'Núcleo de trazas y métricas', color: 'text-primary' },
  { name: 'Prometheus', desc: 'Almacenamiento de series temporales', color: 'text-secondary' },
  { name: 'Grafana', desc: 'Visualización y alertas', color: 'text-accent' },
  { name: 'Honeycomb', desc: 'Debugging de alta cardinalidad', color: 'text-aurora-green' },
];

const ObservabilitySection = () => {
  return (
    <section id="observability" className="relative py-32 px-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-mono text-primary mb-6">
              CONCIENCIA CIVILIZATORIA
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Observabilidad{' '}
              <span className="text-gradient-primary">Cuántica</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              La observabilidad no es solo monitoreo, es <span className="text-primary font-medium">conciencia civilizatoria</span>: 
              cada célula del sistema sabe qué ocurre en el todo. Métricas, trazas y logs como 
              actos transparentes de confianza pública.
            </p>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className={`font-display font-bold ${tool.color} mb-1`}>
                    {tool.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{tool.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Ver Dashboard en Vivo
            </motion.button>
          </motion.div>

          {/* Right - Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl p-6 border border-primary/20">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display font-bold">Sistema Celular</div>
                    <div className="text-xs text-muted-foreground font-mono">Tiempo real • 0ms lag</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-aurora-green animate-pulse" />
                  <span className="text-xs font-mono text-aurora-green">LIVE</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-muted/30 rounded-xl p-4"
                  >
                    <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
                    <div className="font-display text-2xl font-bold text-foreground mb-1">
                      {metric.value}
                    </div>
                    <div className={`text-xs font-mono ${metric.positive ? 'text-aurora-green' : 'text-cosmic-red'}`}>
                      {metric.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Fake Graph */}
              <div className="relative h-40 bg-muted/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-around p-4">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-gradient-to-t from-primary to-secondary rounded-t"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${20 + Math.random() * 60}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">Última hora</span>
                </div>
              </div>

              {/* Activity Indicators */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-aurora-green" />
                    <span className="text-xs font-mono">847 células activas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono">3.2M req/min</span>
                  </div>
                </div>
                <Gauge className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl glass flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-gradient-gold">∞</div>
                <div className="text-[10px] text-muted-foreground">Células</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ObservabilitySection;
