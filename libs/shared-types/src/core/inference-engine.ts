import { EcgPattern, TAMVCrum } from './tamvcrums';

export const calculateEcgPattern = (
  navJumps: number, 
  sessionDuration: number
): EcgPattern => {
  const intensity = navJumps / (sessionDuration / 60000); // Jumps por minuto

  if (intensity > 15) return "overloaded";
  if (intensity > 8) return "scattered";
  if (intensity < 2 && sessionDuration > 300000) return "focused";
  return "stable";
};
