import React from "react";

const OrderRow = ({ order, getUserName, onEdit, onDelete }) => (
  <tr style={{ backgroundColor: "#cceffc" }}>
    <td>{order.id}</td>
    <td>{getUserName(order.user_id)}</td>
    <td>{order.product_name}</td>
    <td style={{ textAlign: "right" }}>{order.amount}</td>
    <td style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        <button
          className="btn"
          style={{
            backgroundColor: "#99dff9",
            color: "#004466",
            border: "1px solid #66cef6",
          }}
          onClick={() => onEdit(order)}
        >
          Editar
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#00aeef",
            color: "#004466",
            border: "1px solid #33bef2",
          }}
          onClick={() => onDelete(order)}
        >
          Eliminar
        </button>
      </div>
    </td>
  </tr>
);

export default OrderRow;