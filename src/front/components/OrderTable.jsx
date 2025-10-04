import React, { useMemo } from "react";
import OrderRow from "./OrderRow";

const OrderTable = ({ orders, users, searchTerm, getUserName, onEdit, onDelete }) => {
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    const s = searchTerm.toLowerCase();
    return orders.filter(o =>
      o.product_name.toLowerCase().includes(s) ||
      getUserName(o.user_id).toLowerCase().includes(s) ||
      String(o.id).includes(s)
    );
  }, [orders, searchTerm, users]);

  return (
    <table className="table align-middle">
      <thead style={{ backgroundColor: "#00aeef", color: "#004466" }}>
        <tr>
          <th style={{ textAlign: "left" }}>ID</th>
          <th style={{ textAlign: "left" }}>Usuario</th>
          <th style={{ textAlign: "left" }}>Producto</th>
          <th style={{ textAlign: "right" }}>Monto</th>
          <th style={{ textAlign: "center" }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map(order => (
          <OrderRow
            key={order.id}
            order={order}
            getUserName={getUserName}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
