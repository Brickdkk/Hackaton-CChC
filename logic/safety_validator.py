# logic/safety_validator.py

NORMAS_CHILENAS = {
    "excavacion": ["entibaciones", "casco", "señalero"],
    "altura": ["arnes", "linea de vida", "casco con barbiquejo"],
    "hormigonado": ["guantes de goma", "botas", "antiparras"],
    "electrico": ["guantes dielectricos", "alfombra aislante"]
}

def validar_seguridad(datos_json):
    """
    Compara la actividad detectada con los EPP y medidas del DS 44.
    """
    actividad = datos_json.get('actividad', '').lower()
    # Extraemos todas las medidas mencionadas en el JSON
    medidas_detectadas = " ".join([m['medida'].lower() for m in datos_json.get('riesgos', [])])
    
    alertas = []
    
    for palabra_clave, obligatorios in NORMAS_CHILENAS.items():
        if palabra_clave in actividad:
            for item in obligatorios:
                if item not in medidas_detectadas:
                    alertas.append({
                        "nivel": "CRITICO",
                        "mensaje": f"INCUMPLIMIENTO NORMATIVO: Falta mencionar {item.upper()} para {palabra_clave.upper()}"
                    })
    
    return alertas