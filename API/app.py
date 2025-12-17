import pandas as pd
from flask import Flask, jsonify, request
from datetime import datetime
import hashlib
import sys
import os

# Add the current directory to sys.path to ensure imports work
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from logic.analisis import calculate_kpis

app = Flask(__name__)

# --- Mock Data (Simulating Database) ---
# DataFrame for Workers and their Document Status
# 1: Document Valid/Signed, 0: Missing/Invalid
data = {
    'worker_id': ['11111111-1', '22222222-2', '33333333-3'],
    'name': ['Juan Perez', 'Maria Gonzalez', 'Pedro Soto'],
    'role': ['Maestro Mayor', 'Jornal', 'Rigger'],
    'sexo': ['Masculino', 'Femenino', 'Masculino'], # Added for DS 44
    'contrato_trabajo': [1, 1, 0],
    'irl': [1, 1, 1],
    'entrega_epp': [1, 1, 0],
    'riohs': [1, 1, 1],
    'examen_aptitud': [1, 1, 0],
    'accidents_last_12_months': [0, 1, 0],
    'hours_worked': [1800, 1600, 200]
}

df_workers = pd.DataFrame(data)

# --- Helper Functions ---

def generate_traceability(action, worker_id):
    """
    Generates traceability metadata compliant with Dictamen 0789/15.
    """
    timestamp = datetime.now().isoformat()
    # Simulating IP and GPS for the MVP
    ip_address = request.remote_addr if request else '127.0.0.1'
    # GPS coordinates provided by Nacho (Frontend) or defaulted
    gps_coords = request.args.get('gps') or request.json.get('gps') if request.is_json else "-33.4489, -70.6693"
    
    trace_string = f"{timestamp}|{worker_id}|{action}|{ip_address}|{gps_coords}"
    trace_hash = hashlib.sha256(trace_string.encode()).hexdigest()
    
    return {
        'timestamp': timestamp,
        'ip': ip_address,
        'gps': gps_coords,
        'action': action,
        'hash': trace_hash
    }

# --- Endpoints ---

@app.route('/auth/register', methods=['POST'])
def register_worker():
    """
    Sincronización con Maida (Login y Género).
    Recibe: rut, password, nombre, sexo.
    """
    data = request.get_json()
    
    required_fields = ['rut', 'password', 'nombre', 'sexo']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400
    
    # En un caso real, aquí se guardaría en la BD y se hashearía la password.
    # Para este MVP, agregamos al DataFrame en memoria.
    
    new_worker = {
        'worker_id': data['rut'],
        'name': data['nombre'],
        'role': 'Nuevo Ingreso', # Default role
        'sexo': data['sexo'],
        'contrato_trabajo': 0,
        'irl': 0,
        'entrega_epp': 0,
        'riohs': 0,
        'examen_aptitud': 0,
        'accidents_last_12_months': 0,
        'hours_worked': 0
    }
    
    global df_workers
    # Concatenar el nuevo trabajador
    df_workers = pd.concat([df_workers, pd.DataFrame([new_worker])], ignore_index=True)
    
    traceability = generate_traceability('register_worker', data['rut'])
    
    return jsonify({
        'message': 'Trabajador registrado exitosamente',
        'worker_id': data['rut'],
        'traceability': traceability
    }), 201

@app.route('/worker/<worker_id>/status', methods=['GET'])
def get_worker_status(worker_id):
    """
    Lógica del "Pasaporte Digital" (Semáforo de Acceso).
    Valida los 5 documentos críticos.
    """
    worker = df_workers[df_workers['worker_id'] == worker_id]
    
    if worker.empty:
        return jsonify({'error': 'Worker not found'}), 404
    
    w = worker.iloc[0]
    
    # Documentos críticos
    docs = ['contrato_trabajo', 'irl', 'entrega_epp', 'riohs', 'examen_aptitud']
    checklist = {doc: bool(w[doc]) for doc in docs}
    
    # Regla de Negocio: Si todos son 1, devuelve "Verde". Si falta alguno, devuelve "Rojo"
    missing_docs = [doc for doc, status in checklist.items() if not status]
    
    if not missing_docs:
        status = 'Verde'
        message = 'Habilitado para ingreso'
    else:
        status = 'Rojo'
        message = f'Bloqueado. Faltan documentos: {", ".join(missing_docs)}'
    
    traceability = generate_traceability('check_status', worker_id)
    
    return jsonify({
        'worker_id': worker_id,
        'name': w['name'],
        'role': w['role'],
        'status': status,
        'message': message,
        'checklist': checklist,
        'traceability': traceability
    })

@app.route('/kpi/accidentabilidad', methods=['GET'])
def get_kpis():
    """
    Motor de KPIs (Estándar PEC de la Mutual).
    Devuelve Tasa de Frecuencia y Tasa de Cumplimiento.
    """
    kpis = calculate_kpis(df_workers)
    return jsonify(kpis)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
