import React, { useState } from "react";

const ExportButton = ({ orders }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    if (!orders || orders.length === 0) {
      setStatus("No hay órdenes para exportar");
      return;
    }

    setLoading(true);
    setStatus("Exportando...");

    try {
      const blob = new Blob([JSON.stringify(orders, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ordenes_${new Date().toISOString()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setStatus("Exportado correctamente");
    } catch (err) {
      setStatus("Error al exportar");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div style={{ marginRight: "10px" }}>
      <button
        className="btn"
        style={{ backgroundColor: "#00aeef", color: "#004466" }}
        onClick={handleExport}
        disabled={loading}
      >
        {loading ? "Exportando..." : "Exportar a JSON"}
      </button>
      {status && <small className="ms-2" style={{ color: "#004466" }}>{status}</small>}
    </div>
  );
};

export default ExportButton;
