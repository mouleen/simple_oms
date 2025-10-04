import React, { useState, useEffect } from "react";
import { getOrderIndex, deleteOrder, updateOrder, createOrder } from "../services/api_order.js";
import { getUserIndex } from "../services/api_user.js";
import OrderTable from "./OrderTable";
import OrderModal from "./OrderModal";
import ExportButton from "./ExportButton";
import DummyOrdersButton from "./DummyOrdersButton";
import ImportButton from "./ImportButton";
import { faker } from "@faker-js/faker";

const OrderIndex = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState({ user_id: "", product_name: "", amount: 0 });
  const [modalError, setModalError] = useState(null);

  const [importing, setImporting] = useState(false);

  useEffect(() => {
    loadOrders();
    loadUsers();
  }, []);

  const loadOrders = async () => {
    setLoadingOrders(true);
    setError(null);
    try {
      const res = await getOrderIndex();
      if (res?.ok && res.data) setOrders(res.data);
      else setError(res?.msg || "Error cargando órdenes");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await getUserIndex();
      if (res?.ok && res.data) setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserName = (id) => users.find((u) => u.id === id)?.name || `User ${id}`;

  const handleCreateOrEdit = async () => {
    setModalError(null);
    if (!modalData.user_id || !modalData.product_name || !modalData.amount) {
      return setModalError("Complete todos los campos.");
    }

    try {
      let res;
      const payload = { ...modalData, user_id: Number(modalData.user_id), amount: Number(modalData.amount) };

      if (modalType === "create") res = await createOrder(payload);
      else if (modalType === "edit") res = await updateOrder(payload);

      if (!res.ok) return setModalError(res.msg || "Error desconocido");

      setModalType(null);
      setModalData({ user_id: "", product_name: "", amount: 0 });
      loadOrders();
    } catch (err) {
      setModalError(err.message);
    }
  };

  const handleDelete = async () => {
    setModalError(null);
    if (!modalData.id) return;

    try {
      const res = await deleteOrder(modalData.id);
      if (!res.ok) return setModalError(res.msg || "Error desconocido");

      setModalType(null);
      setModalData({ user_id: "", product_name: "", amount: 0 });
      loadOrders();
    } catch (err) {
      setModalError(err.message);
    }
  };

  const createDummyOrders = async () => {
    if (!users || users.length === 0) return;
    setImporting(true);
    faker.locale = "es";

    try {
      for (let i = 0; i < 5; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const res = await createOrder({
          user_id: user.id,
          product_name: faker.commerce.productName(),
          amount: faker.number.int({ min: 10, max: 500 }),
        });
        if (!res.ok) console.error("Error al crear dummy: ", res.msg);
      }
      loadOrders();
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "#004466" }}>Listado de Órdenes</h2>
        <div className="d-flex">
          <ImportButton setOrders={setOrders} users={users} loadOrders={loadOrders} />
          <ExportButton orders={orders} />
          <DummyOrdersButton users={users} createDummyOrders={createDummyOrders} loading={importing} />
          <button
            className="btn"
            style={{ backgroundColor: "#66cef6", color: "#004466", border: "1px solid #33bef2" }}
            onClick={() => {
              setModalType("create");
              setModalData({ user_id: "", product_name: "", amount: 0 });
              setModalError(null);
            }}
          >
            Crear Orden
          </button>
        </div>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por producto, usuario o ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ backgroundColor: "#cceffc", borderColor: "#33bef2", color: "#004466" }}
      />

      {loadingOrders && <p>Cargando...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loadingOrders && !error && (
        <OrderTable
          orders={orders}
          users={users}
          searchTerm={searchTerm}
          getUserName={getUserName}
          onEdit={(o) => {
            setModalType("edit");
            setModalData(o);
            setModalError(null);
          }}
          onDelete={(o) => {
            setModalType("delete");
            setModalData(o);
            setModalError(null);
          }}
        />
      )}

      <OrderModal
        type={modalType}
        show={!!modalType}
        onClose={() => setModalType(null)}
        onSubmit={modalType === "delete" ? handleDelete : handleCreateOrEdit}
        data={modalData}
        setData={setModalData}
        users={users}
        error={modalError}
      />
    </div>
  );
};

export default OrderIndex;
