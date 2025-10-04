import React, { useEffect, useState } from "react";
import { createUser, updateUser, deleteUser, getUserOrders } from "../services/api_user.js";

const UserModal = ({ type, show, onClose, userData, setUserData, users, refreshUsers }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (type === "orders" && show && userData?.id) {
      fetchOrders();
    }
  }, [type, show, userData]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserOrders(userData.id);
      if (res.ok && res.data?.orders) setOrders(res.data.orders);
      else setError(res.msg || "Error cargando órdenes");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (type === "create") res = await createUser(userData);
      else if (type === "edit") res = await updateUser(userData.id, userData);
      else if (type === "delete") res = await deleteUser(userData.id);

      if (!res.ok) {
        setError(res.msg || "Error desconocido");
        return;
      }

      onClose();
      refreshUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const modalTitleMap = {
    create: "Crear Usuario",
    edit: `Editar Usuario #${userData?.id}`,
    delete: `Eliminar Usuario #${userData?.id}`,
    orders: `Órdenes de ${userData?.name}`,
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={{ backgroundColor: "#cceffc" }}>
          <div className="modal-header" style={{ backgroundColor: "#00aeef", color: "#004466" }}>
            <h5 className="modal-title">{modalTitleMap[type]}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {error && <p className="text-danger">{error}</p>}
            {loading && <p>Cargando...</p>}

            {(type === "create" || type === "edit") && !loading && (
              <>
                <input
                  className="form-control mb-3"
                  placeholder="Nombre"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                <input
                  className="form-control"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
              </>
            )}

            {type === "delete" && !loading && <p>¿Seguro que quieres eliminar al usuario <strong>{userData.name}</strong>?</p>}

            {type === "orders" && !loading && (
              <>
                {orders.length === 0 ? (
                  <p>No hay órdenes para este usuario.</p>
                ) : (
                  <table className="table table-striped">
                    <thead style={{ backgroundColor: "#00aeef", color: "#004466" }}>
                      <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} style={{ backgroundColor: "#cceffc" }}>
                          <td>{o.id}</td>
                          <td>{o.product_name}</td>
                          <td>{o.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            {(type === "create" || type === "edit" || type === "delete") && (
              <button
                className="btn"
                style={{
                  backgroundColor: type === "edit" ? "#99dff9" : "#66cef6",
                  color: "#004466",
                }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Procesando..." : type === "delete" ? "Eliminar" : type === "edit" ? "Guardar cambios" : "Crear"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
