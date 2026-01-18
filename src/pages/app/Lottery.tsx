import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, Trophy, Clock, Users, Sparkles, Zap,
  Gift, Star, TrendingUp, History
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const activeLotteries = [
  {
    id: '1',
    title: 'Mega Jackpot Semanal',
    description: 'El premio más grande del Omniverse',
    prizePool: 50000,
    currency: 'TAMV',
    ticketPrice: 10,
    soldTickets: 3245,
    maxTickets: 5000,
    drawAt: '2024-01-21T20:00:00',
    status: 'active',
    featured: true,
  },
  {
    id: '2',
    title: 'Lotería Artística',
    description: 'Gana NFTs exclusivos de los mejores artistas',
    prizePool: 15000,
    currency: 'TAMV',
    ticketPrice: 5,
    soldTickets: 1890,
    maxTickets: 3000,
    drawAt: '2024-01-20T18:00:00',
    status: 'active',
    featured: false,
  },
  {
    id: '3',
    title: 'Sorteo VIP Concierto',
    description: 'Acceso VIP a Quantum Symphony Night',
    prizePool: 5000,
    currency: 'TAMV',
    ticketPrice: 25,
    soldTickets: 156,
    maxTickets: 200,
    drawAt: '2024-01-23T12:00:00',
    status: 'active',
    featured: false,
  },
];

const pastWinners = [
  { name: 'cosmic_dreamer', prize: '25,000 TAMV', lottery: 'Mega Jackpot', date: '2024-01-14' },
  { name: 'stellar_art', prize: '10,000 TAMV', lottery: 'Lotería Artística', date: '2024-01-13' },
  { name: 'neon_wave', prize: '5,000 TAMV', lottery: 'Sorteo Diario', date: '2024-01-12' },
];

export default function Lottery() {
  const [selectedLottery, setSelectedLottery] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState(1);

  const featuredLottery = activeLotteries.find(l => l.featured);

  const getTimeRemaining = (drawAt: string) => {
    const diff = new Date(drawAt).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { days, hours, minutes };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Ticket className="w-6 h-6 text-yellow-500" />
            Lotería TAMV
          </h1>
          <p className="text-muted-foreground">Participa y gana premios increíbles</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-card/60 px-4 py-2 rounded-lg border border-border">
            <Ticket className="w-4 h-4 text-primary" />
            <span>Mis Tickets: <strong>12</strong></span>
          </div>
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            Historial
          </Button>
        </div>
      </div>

      {/* Featured Lottery */}
      {featuredLottery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 border border-yellow-500/30"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left - Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    JACKPOT
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                  {featuredLottery.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredLottery.description}</p>

                {/* Prize Pool */}
                <div className="bg-black/20 rounded-xl p-6 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Premio Acumulado</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-display font-bold text-yellow-400">
                      {featuredLottery.prizePool.toLocaleString()}
                    </span>
                    <span className="text-2xl text-yellow-400/70">{featuredLottery.currency}</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Próximo sorteo en:
                  </p>
                  <div className="flex gap-3">
                    {Object.entries(getTimeRemaining(featuredLottery.drawAt)).map(([unit, value]) => (
                      <div key={unit} className="bg-black/30 rounded-lg p-3 text-center min-w-[70px]">
                        <p className="text-2xl font-bold">{value}</p>
                        <p className="text-xs text-muted-foreground capitalize">{unit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Tickets vendidos</span>
                    <span>{featuredLottery.soldTickets.toLocaleString()} / {featuredLottery.maxTickets.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(featuredLottery.soldTickets / featuredLottery.maxTickets) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right - Buy Tickets */}
              <div className="lg:w-80">
                <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    Comprar Tickets
                  </h3>

                  <div className="mb-4">
                    <label className="text-sm text-muted-foreground mb-2 block">Cantidad</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={ticketCount}
                        onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 h-10 rounded-lg bg-muted text-center font-bold"
                      />
                      <button
                        onClick={() => setTicketCount(ticketCount + 1)}
                        className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Precio por ticket</span>
                      <span>{featuredLottery.ticketPrice} {featuredLottery.currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cantidad</span>
                      <span>x{ticketCount}</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary">{featuredLottery.ticketPrice * ticketCount} {featuredLottery.currency}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-black font-bold">
                    <Zap className="w-5 h-5 mr-2" />
                    Comprar {ticketCount} Ticket{ticketCount > 1 ? 's' : ''}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Probabilidad de ganar: 1 en {Math.ceil(featuredLottery.maxTickets / ticketCount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Other Lotteries */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Otras Loterías Activas</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeLotteries.filter(l => !l.featured).map((lottery, i) => (
            <motion.div
              key={lottery.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
            >
              <h3 className="font-semibold mb-2">{lottery.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{lottery.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Premio</p>
                  <p className="text-xl font-bold text-primary">{lottery.prizePool.toLocaleString()} {lottery.currency}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Ticket</p>
                  <p className="font-bold">{lottery.ticketPrice} {lottery.currency}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    style={{ width: `${(lottery.soldTickets / lottery.maxTickets) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {lottery.soldTickets}/{lottery.maxTickets} tickets
                </p>
              </div>

              <Button className="w-full" variant="outline">
                <Ticket className="w-4 h-4 mr-2" />
                Participar
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Past Winners */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Ganadores Recientes
        </h2>
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
          {pastWinners.map((winner, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-4 ${i !== pastWinners.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">@{winner.name}</p>
                  <p className="text-sm text-muted-foreground">{winner.lottery}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{winner.prize}</p>
                <p className="text-xs text-muted-foreground">{winner.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
