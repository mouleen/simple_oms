import React, { useState } from "react";
import { createOrder } from "../services/api_order.js";

const ImportButton = ({ setOrders, users, loadOrders }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatus("Importando...");

    try {
      const text = await file.text();
      const ordersArray = JSON.parse(text);

      for (let order of ordersArray) {
        // Convertir user_id y amount a números si es necesario
        const payload = {
          ...order,
          user_id: Number(order.user_id),
          amount: Number(order.amount),
        };
        const res = await createOrder(payload);
        if (!res.ok) console.error("Error al importar orden:", res.msg);
      }

      await loadOrders();
      setStatus("Órdenes importadas correctamente");
    } catch (err) {
      setStatus("Error al importar: " + err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 4000);
    }
  };

  return (
    <div style={{ marginRight: "10px" }}>
      <label
        className="btn"
        style={{ backgroundColor: "#004466", color: "#fff", cursor: "pointer" }}
      >
        {loading ? "Importando..." : "Importar JSON"}
        <input
          type="file"
          id="import-input"
          accept=".json"
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={loading}
        />
      </label>
      {status && <small className="ms-2" style={{ color: "#004466" }}>{status}</small>}
    </div>
  );
};

export default ImportButton;
