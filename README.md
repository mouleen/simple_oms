<h1 align="center">Order Management </h1>
<h3 align="center">Flask | Python | PostgreSQL | React</h3>

<p align="left">
</p>

<h3 align="left">Demo</h3>
<p align="left">
  <p>WEB | API </p>
<a href="https://oms.gpp.one" target="_blank" rel="noreferrer">
    <img src="https://oms.gpp.one/world-wide-web.png" alt="DEMO-WEB" width="40" height="40"/>
</a>
<a href="https://omsapi.gpp.one" target="_blank" rel="noreferrer">
     <img src="https://oms.gpp.one/api.png" alt="DEMO-API" width="40" height="40"/>
</a>
</p>
<h3 align="left">Languages and Tools:</h3>
<p align="left">
  <a href="https://www.python.org" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/>
  </a>
  <a href="https://react.dev/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="react" width="40" height="40"/>
  </a>
  <a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="postgresql" width="40" height="40"/>
  </a>
  <a href="https://flask.palletsprojects.com/" target="_blank" rel="noreferrer">
    <img src="https://flask.palletsprojects.com/en/stable/_static/flask-logo.svg" alt="Flask" width="40" height="40"/>
</a>
</p>

<h1 align="center">Preparar el entorno</h1>

# 🐍 Proyecto Python en Entorno Virtual

Este proyecto está configurado para usar un **entorno virtual de Python** 
---

## ✅ Requisitos previos

- [Python 3](https://www.python.org/downloads/)  
- [Node.js](https://nodejs.org/)  
  > Incluye npm, necesario para instalar dependencias del frontend

---

## 📦 Comandos disponibles

### 🔹 Crear el entorno virtual
```bash
python3 -m venv .venv
source .venv/bin/activate
```

---

### 🔹 Instalar dependencias
Si tenés un archivo `requirements.txt`, instalá todas las librerías necesarias con:
```bash
#API
pip install -r requirements.txt
pipenv install
pipenv run init
pipenv run migrate
pipenv run upgrade


#Frontend
npm install
npm run start



```

---

### 🔹 Activar el entorno virtual
Cada vez que abras una nueva terminal y quieras trabajar en el proyecto:
```bash
source .venv/bin/activate
```

---

### 🔹 Guardar dependencias
Cuando instales nuevas librerías dentro del entorno, guardalas en `requirements.txt`:
```bash
pip freeze > requirements.txt
```

---

<h1 align="center">Preparar el entorno</h1>

# 🐍 Proyecto Python con Flask SQLAlchemy PostgreSQL y eact

Para inciar el proyecto para pruebas

```bash
# Copiar muestra y configurar variable del entorno en fichero .env
cp .env.example .env

#Frontend
cd frontend && npm run start 
#API
cd api && pipenv run start
```
```


