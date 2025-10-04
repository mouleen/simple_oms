export const initialStore = () => {
  return {
    message: null,
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    role: localStorage.getItem("role") || null,
    userId: localStorage.getItem("userId") || null
  };
};

export default function storeReducer(store, action = {}) {
  //v2
  const { type, payload } = action; //destructuring
  if (typeof type !== "string") return store;

  if (payload === undefined || payload === null) {
    // Clonamos el store y eliminamos la propiedad
    const { [type]: _, ...rest } = store;
    return rest;
  }
  return {
    ...store,
    [type]: payload,
  };
  //v1
  /*
  return {
    ...store,
    [action.type]: action.payload,
  };*/

  switch (action.type) {
    case "get_hello":
      return {
        ...store,
        message: action.payload,
      };
    case "get_token":
      return {
        ...store,
        token: action.payload,
      };
    case "2":
      return {
        ...store,
        user: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
