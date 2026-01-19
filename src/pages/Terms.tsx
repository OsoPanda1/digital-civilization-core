import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuantumGrid from '@/components/ui/QuantumGrid';
import tamvLogo from '@/assets/tamv-logo-orb.png';

export default function Terms() {
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
            <h1 className="text-3xl font-display font-bold">Términos y Condiciones</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Aceptación de los Términos</h2>
              <p className="text-muted-foreground">
                Al acceder y utilizar TAMV Omniverse, aceptas estar sujeto a estos términos y condiciones de uso.
                Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder al servicio.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Uso del Servicio</h2>
              <p className="text-muted-foreground">
                TAMV Omniverse proporciona una plataforma de ecosistema digital para creadores, artistas y 
                desarrolladores. El uso del servicio está sujeto a las siguientes condiciones:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Debes tener al menos 18 años de edad para utilizar el servicio.</li>
                <li>Eres responsable de mantener la confidencialidad de tu cuenta.</li>
                <li>No puedes utilizar el servicio para actividades ilegales.</li>
                <li>Debes respetar los derechos de propiedad intelectual de otros usuarios.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Contenido del Usuario</h2>
              <p className="text-muted-foreground">
                Los usuarios conservan la propiedad de su contenido. Al publicar contenido en TAMV Omniverse,
                otorgas una licencia no exclusiva para mostrar, distribuir y promover tu contenido dentro de la plataforma.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Tokens y Transacciones</h2>
              <p className="text-muted-foreground">
                Los tokens TAMV son una moneda virtual utilizada dentro del ecosistema. Las transacciones son
                finales y no reembolsables salvo en casos específicos determinados por la plataforma.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">5. Modificaciones</h2>
              <p className="text-muted-foreground">
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones
                entrarán en vigor inmediatamente después de su publicación en la plataforma.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold">6. Contacto</h2>
              <p className="text-muted-foreground">
                Para cualquier consulta sobre estos términos, puedes contactarnos a través de los canales
                oficiales de soporte de TAMV Omniverse.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
