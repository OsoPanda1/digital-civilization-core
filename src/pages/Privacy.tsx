import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuantumGrid from '@/components/ui/QuantumGrid';
import tamvLogo from '@/assets/tamv-logo-orb.png';

export default function Privacy() {
  return (
    <div className="min-h-screen relative">
      <QuantumGrid />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>

        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <img src={tamvLogo} alt="TAMV" className="w-12 h-12" />
            <h1 className="text-3xl font-display font-bold">Política de Privacidad</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Información que Recopilamos</h2>
              <p className="text-muted-foreground">
                Recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico,
                y contenido que publicas en la plataforma. También recopilamos información automáticamente
                cuando utilizas nuestros servicios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Uso de la Información</h2>
              <p className="text-muted-foreground">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
                <li>Personalizar tu experiencia en la plataforma.</li>
                <li>Comunicarnos contigo sobre actualizaciones y novedades.</li>
                <li>Detectar y prevenir actividades fraudulentas.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Compartir Información</h2>
              <p className="text-muted-foreground">
                No vendemos tu información personal a terceros. Podemos compartir información con proveedores
                de servicios que nos ayudan a operar la plataforma, siempre bajo estrictas condiciones de
                confidencialidad.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Seguridad de los Datos</h2>
              <p className="text-muted-foreground">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu información
                personal contra acceso no autorizado, pérdida o destrucción.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Tus Derechos</h2>
              <p className="text-muted-foreground">
                Tienes derecho a acceder, corregir o eliminar tu información personal. También puedes
                solicitar una copia de los datos que tenemos sobre ti.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Cookies</h2>
              <p className="text-muted-foreground">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso
                de la plataforma y personalizar el contenido.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">7. Contacto</h2>
              <p className="text-muted-foreground">
                Si tienes preguntas sobre nuestra política de privacidad, contáctanos a través de los
                canales oficiales de soporte de TAMV Omniverse.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
