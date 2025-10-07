"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from api.models import db, User, Order
from datetime import timedelta

import re

routes_user = Blueprint('users', __name__, url_prefix='/users')

# Allow CORS requests to this API
CORS(routes_user)

# Endpoint de Creación
@routes_user.route('/', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    pattern_valid_email=r"^[^@]+@[^@]+\.[^@]+$"

    # Validacion requerimientos
    if not name or not email :
        return jsonify({"msg": "Datos incompletos", "ok": False}), 400

    # Validacion email
    if re.match(pattern_valid_email,email) is None:
        return jsonify({"msg": "Email invalido", "ok": False}), 400
    
    if User.query.filter((User.email == email)).first():
        return jsonify({"msg": "No es posible crear un usuario con esos datos", "ok": False}), 409

    new_user = User(name=name, email=email)

    db.session.add(new_user)    
    db.session.commit()

    # Aramamos la respuesta
    response = jsonify({
        "msg": f"Usuario: {new_user.name}, creado con éxito",
        "ok": True,
        "data": new_user.serialize(),
    })
    return response, 200


# Listado de usuarios
@routes_user.route("/", methods=["GET"])
def list_users():
    users = User.query.all()
    # Aramamos la respuesta
    response = jsonify({
        "msg": "Listado de usuario",
        "ok": True,
        "data": [user.serialize() for user in users]
    })
    return response, 200

# Obtener perfil de usuario por ID (público)

@routes_user.route("/<int:user_id>", methods=["GET"])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado", "ok": False}), 404
    
    response = jsonify({
        "msg": "Perfil de usuario",
        "ok": True,
        "data": user.serialize(),
        })
    return response, 200

# User Delete 
@routes_user.route("/admin/<int:id>", methods=["DELETE"])
def delete_user(id: int):
    # Existencia de Usuario
    user_exists=User.query.filter_by(id=id).first()
    if not user_exists:
        msg = f"No existe un usuario con ID {id}."
        return jsonify({"msg":msg,"ok":False}) , 400
    
    db.session.delete(user_exists)
    db.session.commit()
    return jsonify({"msg":"Usuario eliminado con exito","ok":True}),200


# Obtener usuario por ID con sus ordenes

@routes_user.route("/<int:user_id>/orders", methods=["GET"])
def get_user_orders(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado", "ok": False}), 404
    
    response = jsonify({
        "msg": "PerfOrdenes del usuario",
        "ok": True,
        "data": user.serialize_orders(),
        })
    return response, 200






# Endpoint de Actualización
@routes_user.route('/', methods=['PATCH'])
def update():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    id = data.get("id")
    pattern_valid_email=r"^[^@]+@[^@]+\.[^@]+$"

    # Validacion requerimientos
    if not name or not email or not id:
        return jsonify({"msg": "Datos incompletos", "ok": False}), 400

    # Validacion email
    if re.match(pattern_valid_email,email) is None:
        return jsonify({"msg": "Email invalido", "ok": False}), 400
    
        
    # Se valida existencia de orden para el mismo usuario y mismo producto // podria permitirse 
    existing_user = User.query.filter((User.id == id)).first()
    if not existing_user:
        return jsonify({"msg":f"No existe el usuario que desea actualizar {email}.","ok":False}),400
        
    # Actualizamos orden
    if existing_user.name == name and existing_user.email == email  :
        return jsonify({"msg":f"No hay datos nuevos para actualizar de {email}.","ok":False}),400
    
    if not existing_user.email == email:
        existing_new_email = User.query.filter(User.email == email, User.id != id).first()
        if existing_new_email:
            return jsonify({"msg":f"El correo nuevo {email} ya esta en uso para otro usuario .","ok":False}),400

    existing_user.name = name
    existing_user.email = email

    db.session.add(existing_user)
    db.session.commit()


    # Aramamos la respuesta
    response = jsonify({
        "msg": f"Usuario: {existing_user.email}, creaactualizadodo con éxito",
        "ok": True,
        "data": existing_user.serialize(),
    })
    return response, 200