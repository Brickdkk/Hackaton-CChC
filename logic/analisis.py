# logic/analisis.py
from models import ItemRiesgo, CharlaAST, db
from sqlalchemy import func
import datetime

def obtener_kpis_seguridad():
    """
    Genera datos para el Mapa de Calor y Estadísticas de Riesgo.
    """
    # 1. Riesgos más frecuentes detectados por la IA
    riesgos_frecuentes = db.session.query(
        ItemRiesgo.riesgo, 
        func.count(ItemRiesgo.id).label('total')
    ).group_by(ItemRiesgo.riesgo).order_by(func.count(ItemRiesgo.id).desc()).limit(5).all()

    # 2. Total de ASTs generados hoy (Cumplimiento)
    hoy = datetime.utcnow().date()
    total_hoy = CharlaAST.query.filter(db.func.date(CharlaAST.fecha) == hoy).count()

    return {
        "riesgos_top": [{"label": r.riesgo, "value": r.total} for r in riesgos_frecuentes],
        "total_charlas_hoy": total_hoy
    }