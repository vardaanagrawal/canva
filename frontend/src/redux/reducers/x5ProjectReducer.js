const project = (state = {}, action) => {
  // ---------------------------------------------------------------------------------------------
  // project -------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  if (action.type === "set_project" || action.type === "save_project") {
    state = action.payload;
  } else if (action.type === "update_project") {
    if (action.payload.data._id === state._id)
      state = {
        ...state,
        ...action.payload.data,
      };
  }
  // ---------------------------------------------------------------------------------------------
  // page ----------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  else if (action.type === "add_page") {
    const pages = [...state.pages, action.payload];
    state = {
      ...state,
      pages,
    };
  } else if (action.type === "update_page") {
    const page_id = action.payload.prev_state._id;
    const index = state.pages.findIndex((obj) => obj._id === page_id);
    const updatedPages = [
      ...state.pages.slice(0, index), // elements before the updated component
      { ...state.pages[index], ...action.payload.new_state }, // updated component
      ...state.pages.slice(index + 1), // elements after the updated component
    ];
    state = {
      ...state,
      pages: updatedPages,
    };
  } else if (action.type === "update_page_notes") {
    const page_id = action.payload.prev_state._id;
    const index = state.pages.findIndex((obj) => obj._id === page_id);
    const updatedPages = [
      ...state.pages.slice(0, index), // elements before the updated component
      { ...state.pages[index], ...action.payload.new_state }, // updated component
      ...state.pages.slice(index + 1), // elements after the updated component
    ];
    state = {
      ...state,
      pages: updatedPages,
    };
  } else if (action.type === "delete_page") {
    const pages = state.pages.filter((x) => x._id !== action.payload._id);
    state = {
      ...state,
      pages,
    };
  } else if (action.type === "update_page_number") {
    const page_id = action.payload._id;
    const index = state.pages.findIndex((obj) => obj._id === page_id);
    const updatedPages = [
      ...state.pages.slice(0, index), // elements before the updated component
      { ...state.pages[index], ...action.payload }, // updated component
      ...state.pages.slice(index + 1), // elements after the updated component
    ];
    state = {
      ...state,
      pages: updatedPages,
    };
  }
  // ---------------------------------------------------------------------------------------------
  // component -----------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------
  else if (action.type === "add_component") {
    const page_id = action.payload.item.page_id;
    const index = state.pages.findIndex((obj) => obj._id === page_id);
    const page = {
      ...state.pages[index],
      components: [...state.pages[index].components, action.payload.item],
    };
    const updatedPages = [
      ...state.pages.slice(0, index), // elements before the updated component
      page,
      ...state.pages.slice(index + 1), // elements after the updated component
    ];
    state = {
      ...state,
      pages: updatedPages,
    };
  } else if (action.type === "update_component") {
    const component_id = action.payload.prev_state._id;
    const page_id = action.payload.prev_state.page_id;
    const page_index = state.pages.findIndex((obj) => obj._id === page_id);
    const component_index = state.pages[page_index].components.findIndex(
      (obj) => obj._id === component_id
    );
    const updatedComponents = [
      ...state.pages[page_index].components.slice(0, component_index),
      {
        ...state.pages[page_index].components[component_index],
        ...action.payload.new_state,
      },
      ...state.pages[page_index].components.slice(component_index + 1),
    ];

    const updatedPages = [
      ...state.pages.slice(0, page_index),
      { ...state.pages[page_index], components: updatedComponents },
      ...state.pages.slice(page_index + 1),
    ];

    state = { ...state, pages: updatedPages };
  } else if (action.type === "delete_component") {
    const page_id = action.payload.item.page_id;
    const page_index = state.pages.findIndex((obj) => obj._id === page_id);
    const component_id = action.payload.item._id;
    const deletedComponent = state.pages[page_index].components.filter(
      (obj) => obj._id === component_id
    );
    if (!deletedComponent[0].isNew) {
      if (state.pages[page_index].deletedComponent) {
        state.pages[page_index].deletedComponent.push(deletedComponent[0]);
      } else {
        state.pages[page_index].deletedComponent = deletedComponent;
      }
    }

    const components = state.pages[page_index].components.filter(
      (obj) => obj._id !== component_id
    );

    const pages = [
      ...state.pages.slice(0, page_index),
      { ...state.pages[page_index], components },
      ...state.pages.slice(page_index + 1),
    ];

    state = {
      ...state,
      pages,
    };
  } else if (action.type === "change_component_size") {
    const component_id = action.payload._id;
    const page_id = action.payload.page_id;
    const page_index = state.pages.findIndex((obj) => obj._id === page_id);
    const component_index = state.pages[page_index].components.findIndex(
      (obj) => obj._id === component_id
    );
    const updatedComponents = [
      ...state.pages[page_index].components.slice(0, component_index),
      {
        ...state.pages[page_index].components[component_index],
        ...action.payload.new_state,
      },
      ...state.pages[page_index].components.slice(component_index + 1),
    ];

    const updatedPages = [
      ...state.pages.slice(0, page_index),
      { ...state.pages[page_index], components: updatedComponents },
      ...state.pages.slice(page_index + 1),
    ];

    state = { ...state, pages: updatedPages };
  }
  return state;
};

export default project;
