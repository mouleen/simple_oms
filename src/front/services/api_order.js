const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getOrderIndex = async () => {
  try {
    const response = await fetch(backendUrl + "/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
      return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    }
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const createOrder = async (order) => {
  try {
    const response = await fetch(backendUrl + "/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
      return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    }
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const updateOrder = async (order) => {
  try {
    const response = await fetch(backendUrl + "/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
      return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    }
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await fetch(backendUrl + "/orders/admin/" + id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse = await response.json();
    if (!response.ok) {
      return { ok: false, msg: jsonResponse.msg || `Error ${response.status}` };
    }
    return jsonResponse;
  } catch (err) {
    return { ok: false, msg: err.message };
  }
};
