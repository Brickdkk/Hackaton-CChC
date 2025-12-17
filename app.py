import os
import uuid
import hashlib
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db

# IMPORTANTE: Aquí importamos los nombres NUEVOS que definimos en models.py
# Worker = El nuevo Usuario
# SignatureLog = La nueva Asistencia legal
from models import Worker, CharlaAST, SignatureLog, Document, Miper
from logic.workflow import flujo_maestro_ast

app = Flask(__name__)
CORS(app)

# Configuración de la Base de Datos
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'obra_segura.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# ==========================================
# 1. ENDPOINT DE AUTENTICACIÓN (Login/Register)
# ==========================================
@app.route('/auth/login-register', methods=['POST'])
def login_register():
    data = request.get_json()
    
    rut = data.get('rut')
    nombre = data.get('nombre')
    password = data.get('password')
    gps = data.get('gps', '0,0')
    ip = request.remote_addr
    
    if not rut:
        return jsonify({"status": "error", "message": "RUT obligatorio"}), 400

    # Buscamos en la tabla 'workers' (No en usuarios)
    worker = Worker.query.filter_by(worker_id=rut).first()
    
    if not worker:
        # REGISTRO
        try:
            nueva_firma = str(uuid.uuid4())
            worker = Worker(
                worker_id=rut,
                name=nombre if nombre else "Nuevo Trabajador",
                password=password, 
                firma_digital=nueva_firma,
                contrato_trabajo=0,
                irl=0,
                entrega_epp=0,
                riohs=0,
                examen_aptitud=0
            )
            db.session.add(worker)
            db.session.flush()
        except Exception as e:
            db.session.rollback()
            return jsonify({"status": "error", "message": str(e)}), 500
    else:
        # LOGIN
        nueva_firma = worker.firma_digital
        if nombre: worker.name = nombre # Actualizar nombre si viene

    # Trazabilidad
    timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
    payload = f"{rut}|{nueva_firma}|{timestamp}|{gps}|{ip}"
    hash_trazabilidad = hashlib.sha256(payload.encode()).hexdigest()
    
    db.session.commit()

    return jsonify({
        "status": "success",
        "worker_id": rut,
        "firma_digital": nueva_firma,
        "hash_trazabilidad": hash_trazabilidad,
        "nombre_registrado": worker.name
    }), 200

# ==========================================
# 2. ENDPOINT DE CARGA DE VOZ (AST)
# ==========================================
@app.route('/api/upload-ast', methods=['POST'])
def upload_ast():
    obra_id = request.form.get('obra_id', 1)
    capataz_rut = request.form.get('capataz_id') 
    archivo_audio = request.files.get('audio')
    
    if not archivo_audio:
        return jsonify({"error": "Falta audio"}), 400

    resultado = flujo_maestro_ast(
        archivo_audio=archivo_audio,
        obra_id=obra_id,
        capataz_id=capataz_rut
    )
    return jsonify(resultado)

# ==========================================
# 3. ENDPOINT DE CONTROL DE ACCESO (QR)
# ==========================================
@app.route('/api/verificar-ingreso/<rut>', methods=['GET'])
def verificar_ingreso(rut):
    # Usamos Worker, no Usuario
    worker = Worker.query.filter_by(worker_id=rut).first()
    
    if not worker:
        return jsonify({"acceso": False, "motivo": "No Enrolado"}), 404
    
    # Validamos usando los campos nuevos (Integers 0 o 1)
    if worker.contrato_trabajo == 0:
        return jsonify({"acceso": False, "nombre": worker.name, "motivo": "Falta Contrato"}), 200
        
    return jsonify({"acceso": True, "nombre": worker.name, "mensaje": "Pase Autorizado"}), 200

# ==========================================
# 4. HEALTH CHECK
# ==========================================
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "system": "ObraSegura Backend v2.0"}), 200

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True, port=5000)