from database import db
from app import app
from models import Usuario, Obra, CharlaAST, ItemRiesgo, Asistencia

with app.app_context():
    # Esto le dice a SQLAlchemy que "imprima" todas las sentencias SQL en la terminal
    app.config['SQLALCHEMY_ECHO'] = True
    
    print("\n--- Generando Script SQL de las Tablas --- \n")
    db.create_all() 
    print("\n--- Base de Datos Sincronizada ---")