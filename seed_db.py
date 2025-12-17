import random
from models import db, Worker, Document, SignatureLog, Miper
# Asume que 'app' se importa desde tu archivo principal
# from app import app 

def seed_database(app):
    with app.app_context():
        db.create_all()
        
        print("--- Iniciando Seeding Seguro ---")

        # 1. Crear Documentos Base (Versiones oficiales)
        doc_types = ["Contrato", "IRL", "EPP", "RIOHS", "Examen"]
        docs = []
        for dt in doc_types:
            d = Document(type=dt, version="1.0", content_hash=f"sha256_template_{dt}")
            db.session.add(d)
            docs.append(d)
        db.session.commit()

        # 2. Generar 20 Trabajadores Ficticios
        roles = ["Enfierrador", "Jornal", "Maestro Mayor", "Capataz", "Carpintero"]
        
        for i in range(1, 21):
            rut = f"{10000000 + i}-{random.randint(0, 9)}"
            name = f"Trabajador {i}"
            role = random.choice(roles)
            
            # Simulamos el estado real: 70% cumple todo, 30% tiene papeles pendientes
            is_accredited = random.random() > 0.3 
            
            w = Worker(
                worker_id=rut,
                name=name,
                role=role,
                accidents_last_12_months=random.choice([0, 0, 0, 1]) if not is_accredited else 0, # Algunos con accidentes
                hours_worked=random.randint(100, 2000),
                # Lógica de Checklist [cite: 6-9]
                contrato_trabajo=1, # Asumimos contrato base
                irl=1 if is_accredited else 0,
                entrega_epp=1 if is_accredited else 0,
                riohs=1 if is_accredited else 0,
                examen_aptitud=1 if is_accredited else 0 
            )
            
            # CASO BORDE PARA ELIECER: Trabajador 5 Bloqueado por Examen de Altura
            if i == 5:
                w.name = "Pedro Soto (TEST BLOQUEO)"
                w.examen_aptitud = 0 # Esto debe poner el semáforo en ROJO
                w.role = "Enfierrador"

            db.session.add(w)
            
            # 3. Firmas Digitales (Solo si tiene el documento en '1')
            if w.contrato_trabajo == 1:
                # Simulamos la firma legal
                log = SignatureLog(
                    worker_id=w.worker_id, 
                    document_id=1, # ID del Contrato
                    gps="-33.4489, -70.6693", # Coordenadas de la obra [cite: 12]
                    ip_address="192.168.1.50",
                    user_agent="SafetyZeroApp/v1.0 Android"
                )
                log.signature_hash = log.generate_hash() # Generar Hash único [cite: 17]
                db.session.add(log)
        
        db.session.commit()
        print(">>> Base de datos poblada con 20 trabajadores y trazas legales.")