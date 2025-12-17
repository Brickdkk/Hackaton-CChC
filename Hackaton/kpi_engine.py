import pandas as pd

# Simulación de datos de Lo Campino
data = {
    'mes': ['Octubre', 'Noviembre', 'Diciembre'],
    'masa_mensual': [120, 135, 150],  # N° de trabajadores en obra [cite: 154]
    'accidentes': [2, 1, 0]           # Accidentes registrados [cite: 154]
}

df = pd.DataFrame(data)

# Fórmula de Accidentabilidad: (Accidentes / Masa Mensual) * 100 [cite: 154]
df['tasa_accidentabilidad'] = (df['accidentes'] / df['masa_mensual']) * 100

print("Estadísticas para el Prevencionista:")
print(df)

