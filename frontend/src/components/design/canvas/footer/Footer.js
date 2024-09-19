import React, { useState } from "react";
import "./footer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDesignView,
  showSidebar2,
} from "../../../../redux/actions/x7Sidebar2Actions";
import {
  GridViewIcon,
  NotesIcon,
  PlusIcon,
  ZoomIcon,
} from "../../../../utils/icons";
import { setPage } from "../../../../redux/actions/x2ProjectsActions";
import { addPage } from "../../../../redux/actions/x9PageActions";

import ViewOnlyPage from "../../../viewOnly/ViewOnlyPage";

import { v4 as uuidv4 } from "uuid";

export default function Footer({ zoom, setZoom, setFooterOpen, footerOpen }) {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.page);
  const project = useSelector((state) => state.project);
  const sidebar = useSelector((state) => state.sidebar2);

  // const [pages, setPages] = useState(false);

  async function handleAddPage(page_number) {
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    const res = await dispatch(
      addPage({
        action: "add",
        element: "page",
        prev_state: project.pages,
        new_state: {
          _id: id,
          height: page.height,
          width: page.width,
          page_number,
          color: "white",
          project: project._id,
          components: [],
          notes: "",
          name: "",
        },
      })
    );
  }
  const handleClick = async () => {
    await dispatch({
      type: "set_undo_array",
      payload: [],
    });
    await dispatch({
      type: "set_redo_array",
      payload: [],
    });
    await dispatch(setDesignView("grid"));
  };

  return (
    <div>
      {footerOpen && (
        <div className="footer-pages-list">
          <div className="footer-pages-list-inner">
            {project.pages
              .sort((a, b) => {
                return a.page_number - b.page_number;
              })
              .map((item, index) => (
                <div
                  key={index}
                  className={
                    page._id === item._id
                      ? "footer-page-item footer-page-item-selected"
                      : "footer-page-item"
                  }
                  onClick={() => {
                    dispatch(setPage(item));
                  }}
                  style={{
                    height: "70px",
                    width: (item.width * 70) / item.height,
                  }}
                >
                  <ViewOnlyPage page={item} zoom={7000 / item.height} />
                </div>
              ))}
            <div
              className="footer-page-item"
              onClick={() => handleAddPage(project.pages.length + 1)}
              style={{
                height: "70px",
                width: (project.pages[0].width * 70) / project.pages[0].height,
              }}
            >
              <PlusIcon />
            </div>
          </div>
        </div>
      )}
      <div className="canvas-footer">
        <div className="canvas-footer-left">
          <div
            className={
              sidebar.visible && sidebar.type === "notes"
                ? "design-btn design-btn-active"
                : "design-btn"
            }
            onClick={() => {
              dispatch(
                showSidebar2({
                  visible:
                    !sidebar.visible || sidebar.type !== "notes" ? true : false,
                  type:
                    sidebar.visible && sidebar.type === "notes" ? "" : "notes",
                })
              );
            }}
          >
            <div className="design-btn-icon">
              <NotesIcon />
            </div>
            <div className="design-btn-text">Notes</div>
          </div>
        </div>
        <div className="canvas-footer-mid"></div>
        <div className="canvas-footer-right">
          <div className="design-btn zoom-btn">{zoom}%</div>
          <div
            className={
              footerOpen ? "design-btn design-btn-active" : "design-btn"
            }
            onClick={() => {
              setFooterOpen(!footerOpen);
            }}
          >
            Page {page.page_number} / {project.pages.length}
          </div>
          <div className="design-btn" onClick={handleClick}>
            <GridViewIcon />
          </div>
          <div
            className={
              document.fullscreenElement
                ? "design-btn design-btn-active"
                : "design-btn"
            }
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
              } else {
                document.documentElement.requestFullscreen();
              }
            }}
          >
            <ZoomIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
