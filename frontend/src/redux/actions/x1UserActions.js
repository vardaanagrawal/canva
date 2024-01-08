export function setUser(data) {
  const userData = {
    _id: data._id,
    name: data.name,
    email: data.email,
  };
  return async function (dispatch) {
    dispatch({ type: "SET_USER", payload: userData });
    dispatch({ type: "SET_PROJECTS", payload: data.projects });
    dispatch({ type: "SET_FOLDERS", payload: data.folders });
    dispatch({ type: "SET_UPLOADS", payload: data.uploads });
  };
}
