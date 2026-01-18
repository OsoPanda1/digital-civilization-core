const { execSync } = require('child_process');
const fs = require('fs');

console.log("🚀 Iniciando Protocolo de Bootstrap - TAMV Core...");

try {
  // 1. Verificar si pnpm está instalado
  execSync('pnpm --version', { stdio: 'inherit' });
  
  // 2. Instalación limpia de dependencias
  console.log("📦 Sincronizando dependencias del Omniverso...");
  execSync('pnpm install', { stdio: 'inherit' });

  // 3. Validación de Capas
  console.log("🛡️ Validando integridad de Capas Federadas...");
  execSync('pnpm turbo run build --filter=@tamv/shared-types', { stdio: 'inherit' });

  console.log("✅ Sistema base listo para operación.");
} catch (error) {
  console.error("❌ Fallo en el protocolo de inicio:", error.message);
  process.exit(1);
}
