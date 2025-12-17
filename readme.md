## 1.- Funcionamiento de cada script
- app.py Es el punto de entrada. Aqui es donde se configura flask. Se habilitan los CORS (para conectarse con react) y se definen las rutas (URLs) que el frontend va a llamar
- database.py Define la instancia "SQLAlchemy". Se separa para evitar bloqueos por importaciones ciclicas.
- models.py Es el "plano" de la db. Aqui se define como luciran las tablas de users, obras y AST en python.
- obra_segura.py Esta es la base de datos real(SQLite). Es un archivo fisico que contiene toda la info que se va guardando.
- setup_db.py Es el poblador de datos. Se utiliza para insertar trabajadores, obras etc.
- requirements.txt Es la lista de requisitos para poder correr el script. es literal todo lo que necesitamos ademas de python.
- __init__.py Es un archivo VACIO, no tiene absolutamente nada. Pero es clave, ya que le informa a python que debe tratar la carpeta tablasql, subcarpetas y todos sus scripts como paquetes importables.

## 2.- Carpeta Logic
- audio_processor.py La funcion es la comunicacion externa. Aqui ira la conexion con la api. Recibe el "audio" y entrega el texto en formato json.
- safety_validator.py Es el filtro legal. Revisa si el contenido que se obtuvo en audio_processor.py cumple con las normas, segun las palabras clave. Por asi decirlo, ignora el ruido, o informa si falta informacion adicional. Es la inteligencia de prevencion de riesgos practicamente.
- db_manager.py Contiene las funciones para insertar los datos en la tabla. Es quien maneja todas las herramientas para modificar la db.
- workflow.py Es el orquestador de esta arquitectura (tipo modular). Coordina a todos, y los hace funcionar bien. El flujo de orquestacion es: audio_processor pide texto. -> safety_validator lo valida. -> db_manager lo inserta en la db.

## 3.- Support folders
- uploads Es el almacen temporal. Aqui flask guardara los archivos de audio que envie el frontend antes de procesarlos por la DB.
- venv Es un entorno aislado. Contiene todas las librerias necesarias para correr el proyecto. Es clave correrlo utilizando este entorno. Sino, habria que instalar las librerias en la misma verison y eso podria dar problemas de versiones, etc. Mejor correrlo desde este entorno. Lo ejecutan como si fuese una carpeta utilizando el comando cd, y listo. 