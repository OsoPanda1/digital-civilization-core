import { motion } from 'framer-motion';
import { Cpu, GitBranch, Database, Cloud, Workflow, Boxes, Layers, Zap } from 'lucide-react';

const techStack = [
  { category: 'IaC', tools: ['OpenTofu', 'Pulumi', 'AWS CDK'], icon: Layers, color: 'from-primary to-quantum-blue' },
  { category: 'Observabilidad', tools: ['OTEL', 'Prometheus', 'Grafana'], icon: Workflow, color: 'from-aurora-green to-primary' },
  { category: 'Code Intelligence', tools: ['Sourcegraph', 'Cody AI', 'Jupiter'], icon: GitBranch, color: 'from-secondary to-nebula-purple' },
  { category: 'Orquestación', tools: ['Kubernetes', 'Deno Deploy', 'Edge'], icon: Boxes, color: 'from-accent to-solar-gold' },
];

const ArchitectureSection = () => {
  return (
    <section id="federation" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-transparent to-muted/10" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-mono text-secondary mb-6">
            ARQUITECTURA CELULAR
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Mega-<span className="text-gradient-primary">Microservicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            El sistema es un <span className="text-secondary font-medium">organismo vivo</span>, donde cada célula es soberana pero parte del todo.
            Orquestación cuántica con baja latencia y escalabilidad infinita.
          </p>
        </motion.div>

        {/* Architecture Visualization */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Central Node */}
              <motion.div
                className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center z-10"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(185 100% 50% / 0.4)',
                    '0 0 60px hsl(185 100% 50% / 0.6)',
                    '0 0 30px hsl(185 100% 50% / 0.4)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Cpu className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              {/* Orbiting Cells */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 360) / 8;
                const radius = 140;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-12 h-12 rounded-xl glass flex items-center justify-center"
                    style={{
                      x: Math.cos((angle * Math.PI) / 180) * radius - 24,
                      y: Math.sin((angle * Math.PI) / 180) * radius - 24,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 30 + i * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`} />
                  </motion.div>
                );
              })}

              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8;
                  const x = Math.cos((angle * Math.PI) / 180) * 140;
                  const y = Math.sin((angle * Math.PI) / 180) * 140;
                  return (
                    <motion.line
                      key={i}
                      x1="200"
                      y1="200"
                      x2={200 + x}
                      y2={200 + y}
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.3 }}
                      viewport={{ once: true }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(185, 100%, 50%)" />
                    <stop offset="100%" stopColor="hsl(270, 80%, 60%)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Right - Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {techStack.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-5 hover:border-primary/30 border border-transparent transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stack.color} flex items-center justify-center flex-shrink-0`}>
                    <stack.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-lg mb-2">{stack.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-lg bg-muted/50 text-sm font-mono text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 border border-primary/20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-gradient-primary mb-1">∞</div>
              <div className="text-sm text-muted-foreground">Microservicios Internos</div>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-aurora-green/20 to-primary/20 flex items-center justify-center mb-4">
                <Cloud className="w-8 h-8 text-aurora-green" />
              </div>
              <div className="font-display text-3xl font-bold text-gradient-primary mb-1">&lt;1ms</div>
              <div className="text-sm text-muted-foreground">Latencia Global</div>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-solar-gold/20 flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div className="font-display text-3xl font-bold text-gradient-gold mb-1">99.999%</div>
              <div className="text-sm text-muted-foreground">Disponibilidad</div>
            </div>
            <div>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-secondary/20 to-nebula-purple/20 flex items-center justify-center mb-4">
                <GitBranch className="w-8 h-8 text-secondary" />
              </div>
              <div className="font-display text-3xl font-bold text-gradient-primary mb-1">Federada</div>
              <div className="text-sm text-muted-foreground">Arquitectura Soberana</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
