import React, { useState, useEffect, useMemo } from "react";
import { getUserIndex } from "../services/api_user.js";
import UserModal from "./UserModal.jsx";

const UserIndex = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalType, setModalType] = useState(null);
  const [modalUser, setModalUser] = useState({ name: "", email: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserIndex();
      if (res.ok && res.data) setUsers(res.data);
      else setError(res.msg || "Error cargando usuarios");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const s = searchTerm.toLowerCase();
    return users.filter(u =>
      u.name.toLowerCase().includes(s) ||
      u.email.toLowerCase().includes(s) ||
      String(u.id).includes(s)
    );
  }, [users, searchTerm]);

  const openModal = (type, user = { name: "", email: "" }) => {
    setModalType(type);
    setModalUser(user);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: "#004466" }}>Listado de Usuarios</h2>
        <button
          className="btn"
          style={{ backgroundColor: "#66cef6", color: "#004466", border: "1px solid #33bef2" }}
          onClick={() => openModal("create")}
        >
          Crear Usuario
        </button>
      </div>

      <input
        type="text"
        className="form-control my-3"
        placeholder="Buscar por nombre, email o ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ backgroundColor: "#cceffc", borderColor: "#33bef2", color: "#004466" }}
      />

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <table className="table align-middle">
          <thead style={{ backgroundColor: "#00aeef", color: "#004466" }}>
            <tr>
              <th style={{ textAlign: "left" }}>ID</th>
              <th style={{ textAlign: "left" }}>Nombre</th>
              <th style={{ textAlign: "left" }}>Email</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={{ backgroundColor: "#cceffc" }}>
                <td style={{ textAlign: "left" }}>{u.id}</td>
                <td style={{ textAlign: "left" }}>{u.name}</td>
                <td style={{ textAlign: "left" }}>{u.email}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    className="btn me-2"
                    style={{ backgroundColor: "#99dff9", color: "#004466", border: "1px solid #66cef6" }}
                    onClick={() => openModal("edit", u)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn me-2"
                    style={{ backgroundColor: "#00aeef", color: "#004466", border: "1px solid #33bef2" }}
                    onClick={() => openModal("delete", u)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: "#66cef6", color: "#004466", border: "1px solid #33bef2" }}
                    onClick={() => openModal("orders", u)}
                  >
                    Ver Órdenes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <UserModal
        type={modalType}
        show={!!modalType}
        userData={modalUser}
        setUserData={setModalUser}
        onClose={() => setModalType(null)}
        refreshUsers={loadUsers}
        users={users}
      />
    </div>
  );
};

export default UserIndex;
