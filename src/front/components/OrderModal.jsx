import React from "react";

const OrderModal = ({ type, show, onClose, onSubmit, data, setData, users, error }) => {
  if (!show) return null;

  const titleMap = {
    create: "Crear Nueva Orden",
    edit: `Editar Orden #${data.id || ""}`,
    delete: "Confirmar Eliminación",
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "#cceffc" }}>
          <div className="modal-header" style={{ backgroundColor: "#00aeef", color: "#004466" }}>
            <h5 className="modal-title">{titleMap[type]}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {(type === "create" || type === "edit") && (
              <>
                <div className="mb-3">
                  <label className="form-label">Usuario</label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: "#99dff9", color: "#004466" }}
                    value={data.user_id}
                    onChange={(e) => setData({ ...data, user_id: e.target.value })}
                  >
                    <option value="">Seleccione un usuario</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ backgroundColor: "#99dff9", color: "#004466" }}
                    value={data.product_name}
                    onChange={(e) => setData({ ...data, product_name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Monto</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ backgroundColor: "#99dff9", color: "#004466" }}
                    value={data.amount}
                    onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
                  />
                </div>
              </>
            )}

            {type === "delete" && (
              <p>
                ¿Seguro que quieres eliminar la orden <strong>#{data.id}</strong>?
              </p>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: type === "delete" ? "#00aeef" : "#66cef6",
                color: "#004466",
              }}
              onClick={onSubmit}
            >
              {type === "delete" ? "Eliminar" : type === "edit" ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
