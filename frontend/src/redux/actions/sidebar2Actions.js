import ColorSidebar from "../../components/design/sidebar/sidebars/ColorSidebar";
import ImageSidebar from "../../components/design/sidebar/sidebars/ImageSidebar";
import NoteSidebar from "../../components/design/sidebar/sidebars/NoteSidebar";
import PositionSidebar from "../../components/design/sidebar/sidebars/PositionSidebar";
import ProjectSidebar from "../../components/design/sidebar/sidebars/ProjectSidebar";
import ShapeSidebar from "../../components/design/sidebar/sidebars/ShapeSidebar";
import TextSidebar from "../../components/design/sidebar/sidebars/TextSidebar";
import UploadSidebar from "../../components/design/sidebar/sidebars/UploadSidebar";

const sidebar2Components = {
  shapes: <ShapeSidebar />,
  text: <TextSidebar />,
  images: <ImageSidebar />,
  uploads: <UploadSidebar />,
  projects: <ProjectSidebar />,
  position: <PositionSidebar />,
  color: <ColorSidebar />,
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
