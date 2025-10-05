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
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3">
        <h2 className="text-dark fw-bold mb-3 mb-sm-0">Listado de Usuarios</h2>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre, email o ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && (
        <table className="table align-middle">
          <thead style={{ backgroundColor: "#00aeef", color: "#004466" }}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th style={{ textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} style={{ backgroundColor: "#cceffc" }}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
                  <div className="d-none d-sm-flex justify-content-center gap-1 flex-wrap">
                    <button
                      className="btn btn-sm d-flex align-items-center"
                      style={{ backgroundColor: "#99dff9", color: "#004466", border: "1px solid #66cef6" }}
                      onClick={() => openModal("edit", u)}
                    >
                      <i className="fa fa-pencil me-1" style={{ color: "#004466" }}></i> Editar
                    </button>
                    <button
                      className="btn btn-sm d-flex align-items-center"
                      style={{ backgroundColor: "#00aeef", color: "#004466", border: "1px solid #33bef2" }}
                      onClick={() => openModal("delete", u)}
                    >
                      <i className="fa fa-times me-1" style={{ color: "#004466" }}></i> Eliminar
                    </button>
                    <button
                      className="btn btn-sm d-flex align-items-center"
                      style={{ backgroundColor: "#66cef6", color: "#004466", border: "1px solid #33bef2" }}
                      onClick={() => openModal("orders", u)}
                    >
                      <i className="fa fa-list me-1" style={{ color: "#004466" }}></i> Órdenes
                    </button>
                  </div>

                  <div className="d-flex d-sm-none justify-content-center gap-2 flex-wrap">
                    <button
                      className="btn btn-light d-flex align-items-center p-1"
                      onClick={() => openModal("edit", u)}
                    >
                      <i className="fa fa-pencil me-1" style={{ color: "#004466" }}></i>
                      <small>Editar</small>
                    </button>
                    <button
                      className="btn btn-light d-flex align-items-center p-1"
                      onClick={() => openModal("delete", u)}
                    >
                      <i className="fa fa-times me-1" style={{ color: "#004466" }}></i>
                      <small>Eliminar</small>
                    </button>
                    <button
                      className="btn btn-light d-flex align-items-center p-1"
                      onClick={() => openModal("orders", u)}
                    >
                      <i className="fa fa-list me-1" style={{ color: "#004466" }}></i>
                      <small>Órdenes</small>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div
        className="d-flex d-sm-none justify-content-start align-items-center bg-white border-top shadow-lg position-fixed bottom-0 start-0 end-0 px-3 py-2"
        style={{
          zIndex: 1050,
          height: "64px",
        }}
      >
        <button
          className="btn btn-light d-flex flex-column align-items-center"
          onClick={() => openModal("create")}
        >
          <i className="fa fa-plus fs-5 text-info"></i>
          <small>Crear Usuario</small>
        </button>
      </div>


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
