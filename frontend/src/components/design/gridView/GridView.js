import React, { useEffect, useRef, useState } from "react";
import "./gridView.css";
import { useDispatch, useSelector } from "react-redux";
import { setDesignView } from "../../../redux/actions/x7Sidebar2Actions";
import {
  CopyIcon,
  CreateNewIcon,
  GridViewIcon,
  TrashIcon,
  ZoomIcon,
} from "../../../utils/icons";
import { setPage } from "../../../redux/actions/x2ProjectsActions";
import { manageElement } from "../../../redux/actions/x5ProjectActions";
import {
  addPage,
  deletePage,
  updatePageNumber,
} from "../../../redux/actions/x9PageActions";
import ViewOnlyPage from "../../viewOnly/ViewOnlyPage";

import { v4 as uuidv4 } from "uuid";

export default function GridView() {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);
  const page = useSelector((state) => state.page);
  const handleClick = async () => {
    await dispatch({
      type: "set_undo_array",
      payload: [],
    });
    await dispatch({
      type: "set_redo_array",
      payload: [],
    });
    if (!page._id) {
      await dispatch(
        setPage(project.pages.filter((x) => x.page_number === 1)[0])
      );
    }
    dispatch(setDesignView("page"));
  };

  function deselectPage() {
    dispatch(setPage({}));
  }
  function selectPage(item) {
    dispatch(setPage(item));
  }

  async function handleAddPage() {
    project.pages.forEach(async (item, index) => {
      if (item.page_number > page.page_number) {
        await dispatch(
          updatePageNumber({
            ...item,
            page_number: item.page_number + 1,
          })
        );
      }
    });
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    const res = await dispatch(
      addPage({
        _id: id,
        name: "",
        page_number: page.page_number + 1,
        notes: "",
        components: [],
        project: project.pages[0].project,
        height: page.height,
        width: page.width,
        color: "white",
      })
    );
  }

  async function handleCopyPage() {
    project.pages.forEach(async (item, index) => {
      if (item.page_number > page.page_number) {
        await dispatch(
          updatePageNumber({
            ...item,
            page_number: item.page_number + 1,
          })
        );
      }
    });
    const uuid = uuidv4();
    const hexString = uuid.replace(/-/g, "");
    const id = hexString.substring(0, 24);
    const components = page.components.map((item) => {
      const uuid = uuidv4();
      const hexString = uuid.replace(/-/g, "");
      const id = hexString.substring(0, 24);
      return {
        ...item,
        _id: id,
      };
    });
    const res = await dispatch(
      addPage({
        _id: id,
        name: page.name,
        page_number: page.page_number + 1,
        notes: page.notes,
        components: components,
        project: project.pages[0].project,
        height: page.height,
        width: page.width,
        color: page.color,
      })
    );
  }

  async function handleDeletePage() {
    if (project.pages.length > 1) {
      project.pages.forEach(async (item, index) => {
        if (item.page_number > page.page_number) {
          await dispatch(
            updatePageNumber({
              ...item,
              page_number: item.page_number - 1,
            })
          );
        }
      });
      const res = await dispatch(deletePage(page));
    }
  }

  const divRef = useRef(null);
  const [width, setWidth] = useState(200);

  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="design-grid-view">
      <div className="design-grid-view-header">
        {page._id && (
          <div className="design-grid-view-header-inner">
            <div
              className="design-btn"
              onClick={() => {
                deselectPage();
              }}
            >
              Deselect page
            </div>
            <div
              className="design-btn"
              onClick={() => {
                handleAddPage();
              }}
            >
              <CreateNewIcon />
            </div>
            <div
              className="design-btn"
              onClick={() => {
                handleCopyPage();
              }}
            >
              <CopyIcon />
            </div>
            <div
              className="design-btn"
              onClick={() => {
                handleDeletePage();
              }}
            >
              <TrashIcon />
            </div>
          </div>
        )}
      </div>
      <div className="gv-body-outer">
        <div className="gv-body">
          {project.pages
            .sort((a, b) => a.page_number - b.page_number)
            .map((item, index) => (
              <div
                ref={divRef}
                className="gv-item"
                style={{
                  width: "100%",
                  height: (item.height * width) / item.width,
                  border: page._id === item._id && "solid 3px blueviolet",
                }}
                onClick={() => {
                  selectPage(item);
                }}
                onDoubleClick={handleClick}
              >
                <ViewOnlyPage page={item} zoom={(width * 100) / item.width} />
              </div>
            ))}
        </div>
      </div>
      <div className="design-grid-view-footer">
        <div className="design-btn">
          Page {page.page_number || 1} / {project.pages.length}
        </div>
        <div className="design-btn design-btn-active" onClick={handleClick}>
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
  );
}
