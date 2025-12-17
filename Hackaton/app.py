import pandas as pd
from flask import Flask, jsonify, request
from datetime import datetime
import hashlib

app = Flask(__name__)

# --- Mock Data (Simulating Database) ---
# DataFrame for Workers and their Document Status
# 1: Document Valid/Signed, 0: Missing/Invalid
data = {
    'worker_id': ['11111111-1', '22222222-2', '33333333-3'],
    'name': ['Juan Perez', 'Maria Gonzalez', 'Pedro Soto'],
    'role': ['Maestro Mayor', 'Jornal', 'Rigger'],
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
    gps_coords = "-33.4489, -70.6693" # Santiago, Chile
    
    trace_string = f"{timestamp}|{worker_id}|{action}|{ip_address}|{gps_coords}"
    trace_hash = hashlib.sha256(trace_string.encode()).hexdigest()
    
    return {
        'timestamp': timestamp,
        'ip': ip_address,
        'gps': gps_coords,
        'action': action,
        'hash': trace_hash
    }

def calculate_kpis():
    """
    Calculates KPIs based on PEC standard (Mutual de Seguridad).
    """
    total_workers = len(df_workers)
    total_accidents = df_workers['accidents_last_12_months'].sum()
    total_hours = df_workers['hours_worked'].sum()
    
    # Tasa de Frecuencia (Frequency Rate) = (Number of accidents / Total hours worked) * 1,000,000
    frequency_rate = (total_accidents / total_hours * 1_000_000) if total_hours > 0 else 0
    
    # Compliance Rate
    compliant_workers = df_workers[
        (df_workers['contrato_trabajo'] == 1) &
        (df_workers['irl'] == 1) &
        (df_workers['entrega_epp'] == 1) &
        (df_workers['riohs'] == 1) &
        (df_workers['examen_aptitud'] == 1)
    ]
    compliance_rate = (len(compliant_workers) / total_workers * 100) if total_workers > 0 else 0
    
    return {
        'frequency_rate': round(frequency_rate, 2),
        'compliance_rate': round(compliance_rate, 2),
        'total_workers': total_workers,
        'active_workers': len(compliant_workers)
    }

# --- Endpoints ---

@app.route('/worker/<worker_id>/status', methods=['GET'])
def get_worker_status(worker_id):
    """
    Digital Passport Logic.
    Returns Green (Approved) or Red (Blocked) status.
    """
    worker = df_workers[df_workers['worker_id'] == worker_id]
    
    if worker.empty:
        return jsonify({'error': 'Worker not found'}), 404
    
    w = worker.iloc[0]
    
    checklist = {
        'contrato_trabajo': bool(w['contrato_trabajo']),
        'irl': bool(w['irl']),
        'entrega_epp': bool(w['entrega_epp']),
        'riohs': bool(w['riohs']),
        'examen_aptitud': bool(w['examen_aptitud'])
    }
    
    is_approved = all(checklist.values())
    status = 'Verde' if is_approved else 'Rojo'
    message = 'Acreditado para ingreso' if is_approved else 'Bloqueado: Documentación pendiente'
    
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
    Returns Safety KPIs.
    """
    kpis = calculate_kpis()
    return jsonify(kpis)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
