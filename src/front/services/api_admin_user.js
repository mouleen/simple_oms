const backendUrl = import.meta.env.VITE_BACKEND_URL;
const apikey =
  "2136348ff926fcefd12680594f9ee1b413add849a6d437afac9f2b20d109dee9";

export const getAdminUsersList = async (token) => {
  try {
    if (!token) {
      return { msg: "Debe iniciar sesión como administrador", ok: false };
    }

    const response = await fetch(backendUrl + "/api/user/admin/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "x-api-key": apikey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error en getAdminStoresList:", error);
    return { msg: "Error de conexión", ok: false, error: error.message };
  }
};

// Eliminar un usuario //
export const deleteUser = async (token, userId) => {
  try {
    if (!token) {
      return { msg: "Debe iniciar sesión como administrador", ok: false };
    }

    const response = await fetch(
      backendUrl + `/api/user/admin/${userId}/deactivate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error en deleteUser:", error);
    return { msg: "Error de conexión", ok: false, error: error.message };
  }
};

// Activar un usuario //
export const activateUser = async (token, userId) => {
  try {
    if (!token) {
      return { msg: "Debe iniciar sesión como administrador", ok: false };
    }

    const response = await fetch(
      backendUrl + `/api/user/admin/${userId}/activate`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error en activateUser:", error);
    return { msg: "Error de conexión", ok: false, error: error.message };
  }
};

// Configurar clave de usuario //
export const setCredentials = async (token,userId,password) =>{
  try {
    if (!token) {
      return { msg: "Debe iniciar sesión como administrador", ok: false };
    }

    const response = await fetch(
      backendUrl + `/api/user/admin/${userId}/password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(password),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error en setCredentials:", error);
    return { msg: "Error de conexión", ok: false, error: error.message };
  }
}



// Obtener estadísticas del dashboard de administración
export const getAdminStats = async (token) => {
  try {
    if (!token) {
      return { msg: "Debe iniciar sesión como administrador", ok: false };
    }

    const response = await fetch(backendUrl + "/api/store/" + id + "/detail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "x-api-key": apikey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("Error en getAdminStats:", error);
    return { msg: "Error de conexión", ok: false, error: error.message };
  }
};



