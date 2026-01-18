import { motion } from 'framer-motion';
import { Globe, Github, Twitter, MessageCircle, Heart, Zap, Shield, Activity } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 px-6">
      {/* Top Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glass-strong rounded-2xl p-6 border border-primary/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-aurora-green/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-aurora-green" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">99.999%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">&lt;1ms</div>
                <div className="text-xs text-muted-foreground">Latencia Global</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">22 Capas</div>
                <div className="text-xs text-muted-foreground">Seguridad</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">Federado</div>
                <div className="text-xs text-muted-foreground">Arquitectura</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wider text-gradient-primary">TAMV</span>
                <span className="block text-[10px] text-muted-foreground font-mono">OMNIVERSE</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Sistema Operativo Civilizatorio Digital. Donde cada acción es un acto público de confianza y legado.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, MessageCircle].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold mb-4 text-foreground">Dreamspaces</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Universidad', 'Galería', 'Mercado', 'Conciertos', 'Gremios'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-foreground">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Documentación', 'API Reference', 'Whitepaper', 'Roadmap', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4 text-foreground">Comunidad</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {['Discord', 'Telegram', 'Twitter', 'GitHub', 'DAO'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} TAMV Omniverse. Sistema Operativo Civilizatorio.
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Construido con <Heart className="w-4 h-4 text-cosmic-red mx-1" /> para la civilización digital
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
