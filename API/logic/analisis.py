import pandas as pd

def calculate_kpis(df_workers):
    """
    Calcula los KPIs de seguridad según estándar PEC.
    """
    # 1. Tasa de Frecuencia
    # Fórmula: (Total Accidentes / Horas Hombre Trabajadas) * 1.000.000
    total_accidents = df_workers['accidents_last_12_months'].sum()
    total_hours = df_workers['hours_worked'].sum()
    
    if total_hours > 0:
        frequency_rate = (total_accidents / total_hours) * 1_000_000
    else:
        frequency_rate = 0

    # 2. Tasa de Cumplimiento
    # % de trabajadores con checklist 100% completo (los 5 documentos en 1)
    docs = ['contrato_trabajo', 'irl', 'entrega_epp', 'riohs', 'examen_aptitud']
    
    # Verificar si las columnas existen, si no, asumir 0
    for doc in docs:
        if doc not in df_workers.columns:
            df_workers[doc] = 0

    # Crear una columna temporal para verificar si cumple todo
    # axis=1 opera por fila. all() verifica que todos sean True (o 1)
    # Aseguramos que sean numéricos para la comparación
    compliance_check = df_workers[docs].apply(pd.to_numeric, errors='coerce').fillna(0)
    df_workers['full_compliance'] = (compliance_check == 1).all(axis=1)
    
    if len(df_workers) > 0:
        compliance_rate = (df_workers['full_compliance'].sum() / len(df_workers)) * 100
    else:
        compliance_rate = 0
    
    return {
        "tasa_frecuencia": round(frequency_rate, 2),
        "tasa_cumplimiento": round(compliance_rate, 2),
        "total_trabajadores": len(df_workers),
        "total_horas_trabajadas": int(total_hours),
        "total_accidentes": int(total_accidents)
    }
