import QuantumGrid from '@/components/ui/QuantumGrid';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import DreamspacesSection from '@/components/sections/DreamspacesSection';
import ObservabilitySection from '@/components/sections/ObservabilitySection';
import SecuritySection from '@/components/sections/SecuritySection';
import ArchitectureSection from '@/components/sections/ArchitectureSection';
import EconomySection from '@/components/sections/EconomySection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Quantum Particle Background */}
      <QuantumGrid />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <HeroSection />
        <DreamspacesSection />
        <ObservabilitySection />
        <SecuritySection />
        <ArchitectureSection />
        <EconomySection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
