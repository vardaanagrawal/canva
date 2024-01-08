export function setSelectedComponent(data) {
  return async function (dispatch) {
    dispatch({
      type: "SET_SELECTED_COMPONENT",
      payload: data,
    });
  };
}

export function updateSelectedComponent(id, updatedFields) {
  return async function (dispatch) {
    dispatch({
      type: "UPDATE_COMPONENT",
      payload: {
        component_id: id,
        updated_fields: updatedFields,
      },
    });
  };
}
