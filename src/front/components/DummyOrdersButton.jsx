import React from "react";

const DummyOrdersButton = ({ users, createDummyOrders, loading }) => (
  <button
    className="btn"
    style={{ backgroundColor: "#004466", color: "#fff", marginRight: "10px" }}
    onClick={createDummyOrders}
    disabled={loading || !users || users.length === 0}
  >
    {loading ? "Importando..." : "Agregar 5 órdenes dummy"}
  </button>
);

export default DummyOrdersButton;
