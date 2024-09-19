import ColorSidebar from "../../components/design/sidebar/sidebars/colorSidebar/ColorSidebar";
import ElementsSidebar from "../../components/design/sidebar/sidebars/elementSidebar/ElementsSidebar";
import ImageSidebar from "../../components/design/sidebar/sidebars/imagesSidebar/ImageSidebar";
import NoteSidebar from "../../components/design/sidebar/sidebars/notesSidebar/NoteSidebar";
import PositionSidebar from "../../components/design/sidebar/sidebars/positionSidebar/PositionSidebar";
import ProjectSidebar from "../../components/design/sidebar/sidebars/projectsSidebar/ProjectSidebar";
import ShapeSidebar from "../../components/design/sidebar/sidebars/shapeSidebar/ShapeSidebar";
import TextSidebar from "../../components/design/sidebar/sidebars/textSidebar/TextSidebar";
import UploadSidebar from "../../components/design/sidebar/sidebars/uploadsSidebar/UploadSidebar";

const sidebar2Components = {
  elements: <ElementsSidebar />,
  text: <TextSidebar />,
  images: <ImageSidebar />,
  uploads: <UploadSidebar />,
  projects: <ProjectSidebar />,
  position: <PositionSidebar />,
  color: <ColorSidebar />,
  shapes: <ShapeSidebar />,
  notes: <NoteSidebar />,
};

export function showSidebar2(data) {
  if (data.visible) {
    data = { ...data, component: sidebar2Components[data.type] };
  }
  return async function (dispatch) {
    dispatch({
      type: "SHOW_SIDEBAR2",
      payload: data,
    });
  };
}

export function setDesignView(data) {
  return async function (dispatch) {
    dispatch({
      type: "set_design_view",
      payload: data,
    });
  };
}
