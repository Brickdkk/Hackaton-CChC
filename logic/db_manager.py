# logic/db_manager.py
import hashlib
import json
from models import CharlaAST, ItemRiesgo, db

def generar_hash_verificacion(obra_id, capataz_id, datos_json):
    payload = f"{obra_id}-{capataz_id}-{json.dumps(datos_json, sort_keys=True)}"
    return hashlib.sha256(payload.encode()).hexdigest()

def guardar_resultado_final(obra_id, capataz_id, texto_bruto, datos_json, coords=None):
    try:
        hash_id = generar_hash_verificacion(obra_id, capataz_id, datos_json)
        
        nueva_charla = CharlaAST(
            obra_id=obra_id,
            capataz_id=capataz_id,
            transcripcion_bruta=texto_bruto,
            json_estructurado=datos_json,
            latitud=coords.get('lat') if coords else None,
            longitud=coords.get('lng') if coords else None,
            hash_verificacion=hash_id
        )
        db.session.add(nueva_charla)
        db.session.flush() 

        for r in datos_json.get('riesgos', []):
            item = ItemRiesgo(
                charla_id=nueva_charla.id,
                riesgo=r['riesgo'],
                medida_control=r['medida']
            )
            db.session.add(item)

        db.session.commit()
        return nueva_charla.id
    except Exception as e:
        db.session.rollback()
        return None