import React from "react";

const OrderRow = ({ order, getUserName, onEdit, onDelete }) => {
  return (
    <tr style={{ backgroundColor: "#cceffc" }}>
      <td>{order.id}</td>
      <td>{getUserName(order.user_id)}</td>
      <td>{order.product_name}</td>
      <td style={{ textAlign: "right" }}>{order.amount}</td>
      <td style={{ textAlign: "center" }}>
        <div className="d-none d-sm-flex justify-content-center gap-2">
          <button
            className="btn btn-sm d-flex align-items-center"
            style={{ backgroundColor: "#99dff9", color: "#004466", border: "1px solid #66cef6" }}
            onClick={() => onEdit(order)}
          >
            <i className="fa fa-pencil me-1" style={{ color: "#004466" }}></i> Editar
          </button>
          <button
            className="btn btn-sm d-flex align-items-center"
            style={{ backgroundColor: "#00aeef", color: "#004466", border: "1px solid #33bef2" }}
            onClick={() => onDelete(order)}
          >
            <i className="fa fa-times me-1" style={{ color: "#004466" }}></i> Eliminar
          </button>
        </div>

        <div className="d-flex d-sm-none justify-content-around">
          <button
            className="btn btn-light d-flex flex-column align-items-center"
            onClick={() => onEdit(order)}
          >
            <i className="fa fa-pencil fs-5" style={{ color: "#004466" }}></i>
            <small>Editar</small>
          </button>
          <button
            className="btn btn-light d-flex flex-column align-items-center"
            onClick={() => onDelete(order)}
          >
            <i className="fa fa-times fs-5" style={{ color: "#004466" }}></i>
            <small>Eliminar</small>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRow;
