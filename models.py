from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import hashlib

db = SQLAlchemy()

class Worker(db.Model):
    __tablename__ = 'workers'
    
    # --- Sincronización Estricta con documentacionapi.txt [cite: 3] ---
    worker_id = db.Column(db.String(12), primary_key=True) # RUT del trabajador [cite: 4]
    name = db.Column(db.String(100), nullable=False) # Nombre completo [cite: 4]
    role = db.Column(db.String(50)) # Cargo o rol (ej. Maestro Mayor) [cite: 5]
    
    # Checklist "Carpeta de Arranque" (Int 0/1 para compatibilidad con Pandas)
    contrato_trabajo = db.Column(db.Integer, default=0) # 1: Vigente [cite: 6]
    irl = db.Column(db.Integer, default=0) # ODI [cite: 7]
    entrega_epp = db.Column(db.Integer, default=0) # [cite: 8]
    riohs = db.Column(db.Integer, default=0) # Reglamento Interno [cite: 9]
    examen_aptitud = db.Column(db.Integer, default=0) # Salud compatible [cite: 9]
    
    # Métricas para KPIs de Eliecer
    accidents_last_12_months = db.Column(db.Integer, default=0) # [cite: 10]
    hours_worked = db.Column(db.Integer, default=0) # [cite: 11]

    # Relación con firmas (No afecta el DataFrame de Eliecer, pero vital para legal)
    signatures = db.relationship('SignatureLog', backref='worker', lazy=True)

class Document(db.Model):
    """Gestión de versiones de documentos para 'No Repudio'"""
    __tablename__ = 'documents'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False) # Contrato, IRL, EPP, RIOHS
    version = db.Column(db.String(10), nullable=False) # Ej: "v2.0-2023"
    content_hash = db.Column(db.String(64)) # Hash del PDF plantilla

class SignatureLog(db.Model):
    """
    Cumplimiento Dictamen 0789/15: Trazabilidad de la firma.
    """
    __tablename__ = 'signatures_log'
    id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.String(12), db.ForeignKey('workers.worker_id'), nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey('documents.id'), nullable=False)
    
    # Metadatos de Integridad [cite: 17]
    signature_hash = db.Column(db.String(64), nullable=False) # SHA-256 único de la transacción
    timestamp = db.Column(db.DateTime, default=datetime.utcnow) # [cite: 12]
    gps = db.Column(db.String(100)) # Geolocalización [cite: 12]
    ip_address = db.Column(db.String(50)) # IP del dispositivo [cite: 12]
    user_agent = db.Column(db.String(255)) # Dispositivo usado
    
    def generate_hash(self):
        # Crea un sello criptográfico único
        payload = f"{self.worker_id}-{self.document_id}-{self.timestamp}-{self.gps}"
        return hashlib.sha256(payload.encode()).hexdigest()

class Miper(db.Model):
    """Matriz de Riesgos para consultas del Frontend"""
    __tablename__ = 'miper'
    id = db.Column(db.Integer, primary_key=True)
    peligro = db.Column(db.String(255))
    riesgo = db.Column(db.String(255))
    medida_control = db.Column(db.String(255))