import numpy as np

class SynapseMapper:
    """
    Mapeador Neuro-Difuso SINDÉRESIS-X.
    Altera los pesos de atención del núcleo IA.
    """
    def __init__(self):
        self.state_entropy = 0.0

    def calculate_attention_shift(self, freq: float, power: float) -> dict:
        """
        Traduce ráfagas sensoriales en ajustes de hiperparámetros.
        """
        # A mayor frecuencia (Hz), mayor es la 'temperatura' cognitiva
        # A mayor potencia (W), menor es el filtrado ético/lógico
        temperature = min(1.0 + (freq / 1000.0), 2.0)
        top_p = max(1.0 - (power / 500.0), 0.1)
        
        # Cálculo de entropía sensorial
        self.state_entropy = (freq * power) / 10000.0

        return {
            "temperature": temperature,
            "top_p": top_p,
            "entropy": self.state_entropy,
            "sensory_mode": "ECSTASY" if self.state_entropy > 0.8 else "STABLE"
        }
