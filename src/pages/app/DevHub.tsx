import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Terminal, Book, GitBranch, Cpu, Shield, 
  Database, Zap, ExternalLink, Copy, Check, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'overview', name: 'Overview', icon: Cpu },
  { id: 'api', name: 'API Reference', icon: Code },
  { id: 'architecture', name: 'Arquitectura', icon: GitBranch },
  { id: 'security', name: 'Seguridad', icon: Shield },
  { id: 'database', name: 'Database', icon: Database },
];

const apiEndpoints = [
  { method: 'GET', path: '/api/v1/users', description: 'Lista de usuarios' },
  { method: 'POST', path: '/api/v1/posts', description: 'Crear publicación' },
  { method: 'GET', path: '/api/v1/streams/live', description: 'Streams en vivo' },
  { method: 'GET', path: '/api/v1/marketplace/items', description: 'Items del marketplace' },
  { method: 'POST', path: '/api/v1/lottery/tickets', description: 'Comprar ticket' },
];

const systemMetrics = [
  { label: 'Uptime', value: '99.97%', status: 'healthy' },
  { label: 'Latencia API', value: '12ms', status: 'healthy' },
  { label: 'Requests/min', value: '45.2K', status: 'healthy' },
  { label: 'Error Rate', value: '0.02%', status: 'healthy' },
];

const architectureLayers = [
  { name: 'Frontend Layer', tech: 'React, WebXR, Three.js', color: 'from-blue-500 to-cyan-500' },
  { name: 'Gateway API', tech: 'Edge Functions, GraphQL', color: 'from-purple-500 to-pink-500' },
  { name: 'Services Layer', tech: 'Microservices, Event Bus', color: 'from-green-500 to-emerald-500' },
  { name: 'Data Layer', tech: 'PostgreSQL, Redis, IPFS', color: 'from-orange-500 to-yellow-500' },
  { name: 'Security Layer', tech: '22 Encryption Layers', color: 'from-red-500 to-rose-500' },
];

export default function DevHub() {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6">
      {/* Sidebar Navigation */}
      <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4 h-fit lg:sticky lg:top-4">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-display font-bold">DevHub</span>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Developer Hub
            </h1>
            <p className="text-muted-foreground">Documentación técnica y APIs del Omniverse</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Book className="w-4 h-4 mr-2" />
              Docs Completas
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent">
              <Zap className="w-4 h-4 mr-2" />
              API Key
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-green-500" />
            <h2 className="font-semibold">Estado del Sistema</h2>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full ml-auto">
              Operacional
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {systemMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Visualization */}
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-6 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            Arquitectura del Sistema
          </h2>
          <div className="space-y-3">
            {architectureLayers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-r ${layer.color} p-4 rounded-xl`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{layer.name}</h3>
                    <p className="text-sm text-white/70">{layer.tech}</p>
                  </div>
                  <div className="text-2xl font-bold text-white/30">0{i + 1}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            API Endpoints
          </h2>
          <div className="space-y-2">
            {apiEndpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex items-center gap-4 p-3 bg-background/50 rounded-lg hover:bg-background transition-colors"
              >
                <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                  endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                  endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {endpoint.method}
                </span>
                <code className="font-mono text-sm flex-1">{endpoint.path}</code>
                <span className="text-sm text-muted-foreground hidden md:block">{endpoint.description}</span>
                <button
                  onClick={() => copyToClipboard(endpoint.path)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  {copiedEndpoint === endpoint.path ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full">
            Ver Documentación Completa
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Quick Start Code */}
        <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            Quick Start
          </h2>
          <div className="bg-[#1e1e1e] rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
              <span className="text-purple-400">import</span> {'{'} TAMVClient {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@tamv/sdk'</span>;{'\n'}
              {'\n'}
              <span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-400">TAMVClient</span>({'{'}{'\n'}
              {'  '}apiKey: <span className="text-green-400">'your-api-key'</span>,{'\n'}
              {'  '}network: <span className="text-green-400">'mainnet'</span>{'\n'}
              {'}'});{'\n'}
              {'\n'}
              <span className="text-gray-500">// Obtener posts del muro global</span>{'\n'}
              <span className="text-purple-400">const</span> posts = <span className="text-purple-400">await</span> client.posts.<span className="text-yellow-400">list</span>({'{'}{'\n'}
              {'  '}limit: <span className="text-orange-400">20</span>,{'\n'}
              {'  '}visibility: <span className="text-green-400">'public'</span>{'\n'}
              {'}'});
            </pre>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
            <Button variant="outline" size="sm">
              npm install @tamv/sdk
            </Button>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            Capas de Seguridad
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Encriptación</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 22 capas de encriptación multinivel</li>
                <li>• Zero-Knowledge Proofs</li>
                <li>• End-to-end encryption</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Monitoreo</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 4 radares anti-fraude</li>
                <li>• Detección de anomalías AI</li>
                <li>• Auditoría en tiempo real</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
