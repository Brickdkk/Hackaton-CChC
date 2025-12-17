from database import db
from datetime import datetime

# ======================================================
# BLOQUE 1: GESTIÓN DE PERSONAS Y LEGAL (Dictamen 0789/15)
# ======================================================

class Worker(db.Model):
    __tablename__ = 'workers'
    
    # Identificación
    worker_id = db.Column(db.String(12), primary_key=True) # RUT
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50))
    
    # Autenticación Segura
    password = db.Column(db.String(128)) 
    firma_digital = db.Column(db.String(100)) # UUID
    
    # Checklist Carpeta de Arranque (0=Falta, 1=OK)
    contrato_trabajo = db.Column(db.Integer, default=0)
    irl = db.Column(db.Integer, default=0)
    entrega_epp = db.Column(db.Integer, default=0)
    riohs = db.Column(db.Integer, default=0)
    examen_aptitud = db.Column(db.Integer, default=0)
    
    # KPIs (Extra)
    accidents_last_12_months = db.Column(db.Integer, default=0)
    hours_worked = db.Column(db.Integer, default=0)

    # Relaciones
    signatures = db.relationship('SignatureLog', backref='worker', lazy=True)

class SignatureLog(db.Model):
    __tablename__ = 'signatures_log'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.String(12), db.ForeignKey('workers.worker_id'))
    document_id = db.Column(db.Integer) # Referencia al tipo de doc
    
    signature_hash = db.Column(db.String(64)) # Trazabilidad SHA-256
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    gps = db.Column(db.String(100))
    ip_address = db.Column(db.String(50))
    user_agent = db.Column(db.String(255))

class Document(db.Model):
    __tablename__ = 'documents'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    version = db.Column(db.String(10))
    content_hash = db.Column(db.String(64))

class Miper(db.Model):
    __tablename__ = 'miper'
    id = db.Column(db.Integer, primary_key=True)
    peligro = db.Column(db.String(255))
    riesgo = db.Column(db.String(255))
    medida_control = db.Column(db.String(255))


# ======================================================
# BLOQUE 2: GESTIÓN DE VOZ Y AST (IA)
# ¡ESTO ES LO QUE TE FALTABA!
# ======================================================

class Obra(db.Model):
    __tablename__ = 'obras'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))

class CharlaAST(db.Model):
    __tablename__ = 'charlas_ast'
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)
    obra_id = db.Column(db.Integer, db.ForeignKey('obras.id'))
    
    # El capataz es un Worker (RUT)
    capataz_id = db.Column(db.String(12), db.ForeignKey('workers.worker_id'))
    
    transcripcion_bruta = db.Column(db.Text)
    json_estructurado = db.Column(db.JSON)

class ItemRiesgo(db.Model):
    __tablename__ = 'items_riesgo'
    id = db.Column(db.Integer, primary_key=True)
    charla_id = db.Column(db.Integer, db.ForeignKey('charlas_ast.id'))
    riesgo = db.Column(db.String(255))
    medida_control = db.Column(db.String(255))