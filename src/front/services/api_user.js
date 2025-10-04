const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getUserIndex = async () => {
  try {
    const response = await fetch(backendUrl + "/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse = await response.json();
    if (!response.ok) return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

// Obtener perfil de usuario por ID (público)
export const getUserProfile = async (userId) => {
  try {
    const response = await fetch(`${backendUrl}/api/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apikey,
      },
    });
    const jsonResponse = await response.json();
    if (!response.ok) return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const createUser = async (user) => {
  try {
    const response = await fetch(backendUrl + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const jsonResponse = await response.json();
    if (!response.ok) return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await fetch(backendUrl + "/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const jsonResponse = await response.json();
    if (!response.ok) return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(backendUrl + "/users/admin/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse = await response.json();
    if (!response.ok) return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const getUserOrders = async (user_id) => {
  try {
    const response = await fetch(`${backendUrl}/users/${user_id}/orders`);
    const json = await response.json();
    if (!response.ok) return { ok: false, msg: json.msg || `Error ${response.status}` };
    return json;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};
