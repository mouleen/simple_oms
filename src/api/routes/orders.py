from flask import Flask, request, jsonify, url_for, Blueprint,current_app,g
from api.models import db, User, Order
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token,JWTManager
import json,yaml
from sqlalchemy.orm import joinedload

routes_order = Blueprint('orders', __name__,url_prefix='/orders')

# Allow CORS requests to this API
CORS(routes_order)

## ORDENES ##
 #id: Mapped[int] = mapped_column(primary_key=True)
  #  user_id: Mapped[int] = mapped_column( ForeignKey("users.id"), nullable=False)
  #  product_name: Mapped[str] = mapped_column(String(200), nullable=False)
  #  created_at = Column(DateTime(timezone=True), server_default=func.now())

# Endpoint de creacion de Ordenes
@routes_order.route('/', methods=['POST'])
def add_order():
    body=json.loads(request.data)
    userid=body['user_id']
    product_name=body['product_name']
    amount=body['amount']


    # Se validan datos requeridos
    if product_name is None or userid is None or amount is None:
        return jsonify({"msg":f"Hay datos faltantes necesarios para poder crear el producto.","ok":False}),400
    
    if amount and (amount < 1 or amount > 10000) :
        return jsonify({"msg":f"Ingrese una cantidad valida mayor que 0 y menor que 10000","ok":False}),400
    
    # Se valida existencia de orden para el mismo usuario y mismo producto // podria permitirse 
    existing_user = User.query.filter_by(id=userid).first()
    if not existing_user:
        return jsonify({"msg":f"No existe el usuario {userid}.","ok":False}),400
        
    # Se valida existencia de orden para el mismo usuario y mismo producto // podria permitirse 
    existing_order = Order.query.filter_by(id=userid,product_name=product_name).first()
    if existing_order:
        return jsonify({"msg":f"Ya existe una orden del producto del usuario {userid}.","ok":False}),400
        
    # Crear orden
    order = Order(
        user_id=userid,
        product_name=product_name,
        amount=amount
    )

    db.session.add(order)
    db.session.commit()

    # Aramamos la respuesta
    response=jsonify({
        "msg": "Orden creada con éxito",
        "ok": True,
        "data": order.serialize()
    })
    return response,200

# Endpoint de Listado de Ordenes
@routes_order.route('/', methods=['GET'])
def orders_list():
    orders = (
        Order.query
        .join(User)
        .filter(Order.user_id == User.id)
        .all()
    )

    # Aramamos la respuesta
    response=jsonify({
        "msg": f"Listado de ordenes",
        "ok": True,
        "data": [order.serialize() for order in orders]
    })
    return response,200


# Endpoint de Eliminación de Ordenes
@routes_order.route("/admin/<int:id>", methods=["DELETE"])
def delete_order(id: int):
    # Existencia de Orden
    order_exists=Order.query.filter_by(id=id).first()
    if not order_exists:
        msg = f"No existe una orden con ID {id}."
        return jsonify({"msg":msg,"ok":False}) , 400
    
    db.session.delete(order_exists)
    db.session.commit()
    return jsonify({"msg":"Orden eliminada con exito","ok":True}),200


# Endpoint de actualizacion de Ordenes
@routes_order.route('/', methods=['PATCH'])
def update_order():
    body=json.loads(request.data)
    userid=body['user_id']
    product_name=body['product_name']
    amount=body['amount']
    id=body['id']


    # Se validan datos requeridos
    if product_name is None or userid is None or amount is None or id is None:
        return jsonify({"msg":f"Hay datos faltantes necesarios para poder crear el producto.","ok":False}),400
    
    if amount and (amount < 1 or amount > 10000) :
        return jsonify({"msg":f"Ingrese una cantidad valida mayor que 0 y menor que 10000","ok":False}),400
    
    # Se valida existencia de orden para el mismo usuario y mismo producto // podria permitirse 
    existing_user = User.query.filter_by(id=userid).first()
    if not existing_user:
        return jsonify({"msg":f"No existe el usuario {userid}.","ok":False}),400
        
    # Se valida existencia de orden para el mismo usuario y mismo producto // podria permitirse 
    existing_order = Order.query.filter_by(id=id).first()
    if not existing_order:
        return jsonify({"msg":f"No existe la orden que desea actualizar del usuario {userid} Producto:{product_name}.","ok":False}),400
        
    # Actualizamos orden
    existing_order.amount = amount
    existing_order.product_name=product_name,

    db.session.add(existing_order)
    db.session.commit()

    # Aramamos la respuesta
    response=jsonify({
        "msg": "Orden actualizada con éxito",
        "ok": True,
        "data": existing_order.serialize()
    })
    return response,200