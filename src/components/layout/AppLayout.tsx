import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Video, Music, GraduationCap, Ticket, 
  ShoppingBag, Palette, MessageCircle, Bell, Search,
  Menu, X, User, Settings, LogOut, Zap, Code
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import QuantumGrid from '@/components/ui/QuantumGrid';
import tamvLogo from '@/assets/tamv-logo-orb.png';

const navItems = [
  { name: 'Inicio', href: '/app', icon: Home },
  { name: 'Muro Global', href: '/app/feed', icon: Users },
  { name: 'Streaming', href: '/app/streams', icon: Video },
  { name: 'Conciertos', href: '/app/concerts', icon: Music },
  { name: 'Universidad', href: '/app/university', icon: GraduationCap },
  { name: 'Lotería', href: '/app/lottery', icon: Ticket },
  { name: 'Marketplace', href: '/app/marketplace', icon: ShoppingBag },
  { name: 'Galería', href: '/app/gallery', icon: Palette },
  { name: 'Canales', href: '/app/channels', icon: MessageCircle },
  { name: 'DevHub', href: '/app/devhub', icon: Code },
];

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { data: profile } = useProfile();

  const isActive = (path: string) => {
    if (path === '/app') return location.pathname === '/app';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <QuantumGrid />
      
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="fixed left-0 top-0 h-full bg-card/80 backdrop-blur-xl border-r border-border z-40 hidden lg:flex flex-col"
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-border">
          <img src={tamvLogo} alt="TAMV" className="w-10 h-10" />
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-display font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                TAMV
              </motion.span>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-medium text-sm"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-3 border-t border-border">
            <Link
              to="/app/profile"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex-1 min-w-0"
                  >
                    <p className="text-sm font-medium truncate">{profile?.display_name || 'Usuario'}</p>
                    <p className="text-xs text-muted-foreground truncate">@{profile?.username}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
            <AnimatePresence>
              {sidebarOpen && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => signOut()}
                  className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-40 flex items-center px-4 gap-4">
        <button onClick={() => setMobileMenuOpen(true)} className="p-2">
          <Menu className="w-6 h-6" />
        </button>
        <img src={tamvLogo} alt="TAMV" className="w-8 h-8" />
        <span className="font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          TAMV
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-lg">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-72 bg-card z-50 lg:hidden flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <img src={tamvLogo} alt="TAMV" className="w-8 h-8" />
                  <span className="font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    TAMV
                  </span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className={`min-h-screen pt-16 lg:pt-0 transition-all ${
          sidebarOpen ? 'lg:pl-[260px]' : 'lg:pl-[72px]'
        }`}
      >
        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
