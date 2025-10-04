from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, ForeignKey,  Date, Table, DateTime, func, select,  Column, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped, mapped_column, relationship
from werkzeug.security import generate_password_hash, check_password_hash
from typing import List, Optional
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(60), unique=False, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relación con Ordenes
    orders = relationship("Order", back_populates="user", cascade="all, delete-orphan")
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
        }
    
    def serialize_orders(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "orders": [order.serialize() for order in self.orders]
        }
 
class Order(db.Model):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column( ForeignKey("users.id"), nullable=False)
    product_name: Mapped[str] = mapped_column(String(200), nullable=False)
    amount:Mapped[int] = mapped_column( nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relación con Usuarios
    user= relationship("User", back_populates="orders")
    

    def serialize(self):
        return {
            "id": self.id,
            "product_name": self.product_name,
            "amount": self.amount,
            "user_id": self.user_id
        }
