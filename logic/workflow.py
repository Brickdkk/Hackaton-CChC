# logic/workflow.py
from .audio_processor import convertir_audio_a_texto, estructurar_texto_a_json
from .safety_validator import validar_seguridad
from .db_manager import guardar_resultado_final

def flujo_maestro_ast(archivo_audio, obra_id, capataz_id, coords=None):
    # 1. IA: Transcripción
    texto = convertir_audio_a_texto(archivo_audio)
    
    # 2. IA: Estructuración
    datos_json = estructurar_texto_a_json(texto)
    
    # 3. NORMATIVA: Validación DS 44
    alertas = validar_seguridad(datos_json)
    datos_json['alertas_normativas'] = alertas
    
    # 4. LEGAL: Guardado con Trazabilidad
    id_registro = guardar_resultado_final(obra_id, capataz_id, texto, datos_json, coords)
    
    return {
        "id": id_registro,
        "cumple_norma": len(alertas) == 0,
        "alertas": alertas,
        "datos": datos_json,
        "mensaje": "AST procesado con validación legal DS 44"
    }