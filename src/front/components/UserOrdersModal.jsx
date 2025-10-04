import React, { useEffect, useState } from "react";
import { getOrderIndex } from "../services/api_order.js";

const UserOrdersModal = ({ show, onClose, user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!show || !user) return;
    const loadOrders = async () => {
      setLoading(true);
      const res = await getOrderIndex();
      if (res?.ok && res.data) {
        setOrders(res.data.filter(o => o.user_id === user.id));
      }
      setLoading(false);
    };
    loadOrders();
  }, [show, user]);

  if (!show || !user) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ backgroundColor: "#cceffc" }}>
          <div className="modal-header" style={{ backgroundColor: "#00aeef", color: "#004466" }}>
            <h5 className="modal-title">Órdenes de {user.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <p>Cargando órdenes...</p>
            ) : orders.length === 0 ? (
              <p>No hay órdenes para este usuario.</p>
            ) : (
              <table className="table table-striped">
                <thead style={{ backgroundColor: "#00aeef", color: "#004466" }}>
                  <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} style={{ backgroundColor: "#cceffc" }}>
                      <td>{o.id}</td>
                      <td>{o.product_name}</td>
                      <td>{o.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrdersModal;
