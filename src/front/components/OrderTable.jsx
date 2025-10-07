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
    <div
      className="table-responsive"
      style={{
        width: "100%",
        maxWidth: "100vw",
        overflowX: "auto",
        overflowY: "hidden",
        fontSize: "0.875rem",
      }}
    >
      <table
        className="table align-middle mb-0"
        style={{
          width: "100%",
        }}
      >
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead style={{ backgroundColor: "#00aeef", color: "#004466" }}>
          <tr>
            <th style={{ textAlign: "left", whiteSpace: "nowrap" }}>ID</th>
            <th style={{ textAlign: "left", whiteSpace: "nowrap" }}>Usuario</th>
            <th style={{ textAlign: "left" }}>Producto</th>
            <th style={{ textAlign: "right", whiteSpace: "nowrap" }}>Cantidad</th>
            <th style={{ textAlign: "center", whiteSpace: "nowrap" }}>Acciones</th>
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
    </div>
  );
};

export default OrderTable;
