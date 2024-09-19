export function addPage(data) {
  return async function (dispatch) {
    dispatch({
      type: "add_page",
      payload: data,
    });
  };
}

export function deletePage(data) {
  return async function (dispatch) {
    dispatch({
      type: "delete_page",
      payload: data,
    });
  };
}

export function updatePageNumber(data) {
  return async function (dispatch) {
    dispatch({
      type: "update_page_number",
      payload: data,
    });
  };
}
