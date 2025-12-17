import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime # IMPORTANTE: Para la lógica de fechas
from database import db
from models import Usuario, CharlaAST, Asistencia # IMPORTANTE: Importar modelos
from logic.workflow import flujo_maestro_ast

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'obra_segura.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/api/upload-ast', methods=['POST'])
def upload_ast():
    obra_id = request.form.get('obra_id', 1)
    capataz_id = request.form.get('capataz_id', 1)
    lat = request.form.get('lat')
    lng = request.form.get('lng')
    
    # Manejo de audio real si llega del frontend
    archivo_audio = request.files.get('audio')
    
    resultado = flujo_maestro_ast(
        archivo_audio=archivo_audio,
        obra_id=obra_id,
        capataz_id=capataz_id,
        coords={'lat': lat, 'lng': lng}
    )
    return jsonify(resultado)

@app.route('/api/verificar-ingreso/<rut>', methods=['GET'])
def verificar_ingreso(rut):
    # 1. Buscar al trabajador por RUT
    user = Usuario.query.filter_by(rut=rut).first()
    if not user:
        return jsonify({
            "acceso": False, 
            "motivo": "Trabajador no enrolado en Carpeta de Arranque"
        }), 404
    
    # 2. Control de Bloqueo Administrativo
    if not user.esta_habilitado:
        return jsonify({
            "acceso": False, 
            "nombre": user.nombre,
            "motivo": "Bloqueado: Documentación vencida (Contrato/Mutual)"
        }), 200
    
    # 3. Verificación de Seguridad Operativa (DS 44)
    hoy = datetime.utcnow().date()
    # Buscamos si el usuario firmó alguna charla hoy
    ast_hoy = db.session.query(Asistencia).join(CharlaAST).filter(
        Asistencia.usuario_id == user.id,
        db.func.date(CharlaAST.fecha) == hoy
    ).first()
    
    if not ast_hoy:
        return jsonify({
            "acceso": False, 
            "nombre": user.nombre,
            "motivo": "Falta firma en AST/Charla de hoy"
        }), 200

    return jsonify({
        "acceso": True, 
        "nombre": user.nombre,
        "empresa": user.empresa_tipo,
        "mensaje": "Acceso Autorizado"
    }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)