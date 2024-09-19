import React, { useEffect, useState } from "react";
import "./viewOnly.css";
import { useParams } from "react-router-dom";

import { getViewProject } from "../../redux/actions/x5ProjectActions";

import { useDispatch } from "react-redux";
import ViewOnlyPage from "./ViewOnlyPage";
import { GridViewIcon } from "../../utils/icons";

export default function ViewOnly() {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchProjectDetails(id);
    }
  }, [id]);

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  async function fetchProjectDetails(project_id) {
    const res = await dispatch(getViewProject(project_id));
    setLoading(false);
    if (res.success) {
      setError(false);
      setProject(res.project);
    } else {
      setError(true);
    }
  }

  const [zoom, setZoom] = useState(100);

  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    if (project._id) {
      const page = project.pages[pageNo];

      const calculateZoomFactor = () => {
        const doc = document.querySelector(".vo-body").getBoundingClientRect();
        const screenDimensions = {
          width: doc.width - 100,
          height: doc.height - 150,
        };

        const designDimensions = {
          width: page.width,
          height: page.height,
        };
        const widthZoomFactor = screenDimensions.width / designDimensions.width;
        const heightZoomFactor =
          screenDimensions.height / designDimensions.height;
        const zoom = Math.floor(
          Math.min(widthZoomFactor, heightZoomFactor) * 100
        );

        setZoom(zoom >= 20 && zoom <= 200 ? zoom : 20);
      };
      calculateZoomFactor();
    }
  }, [project]);

  const [pageList, setPageList] = useState(false);

  if (loading) return "Loading";
  if (error) return "Error";
  return (
    <div className="view-only">
      <div className="vo-nav">
        <div className="vo-nav-left">
          <img src="https://static.canva.com/web/images/856bac30504ecac8dbd38dbee61de1f1.svg" style={{height: "40px"}}></img>
        </div>
        <div className="vo-nav-right">
          <b>{project.name}</b> by {project.owner.name}
        </div>
      </div>
      <div className="vo-body">
        <div
          style={{
            height: (zoom / 100) * project.pages[0].height + "px",
            width: (zoom / 100) * project.pages[0].width + "px",
          }}
          className="vo-body-inner"
        >
          <ViewOnlyPage page={project.pages[pageNo]} zoom={zoom} />
        </div>
      </div>
      <div className="vo-foot">
        <div
          className="footer-page-btn"
          onClick={() => {
            setPageList(!pageList);
          }}
        >
          Page {pageNo + 1} / {project.pages.length}
        </div>
        <div className="vo-foot-right">
          <div className="zoom-slider-box">
            <input
              className="zoom-slider-input"
              type="range"
              min={20}
              max={200}
              value={zoom}
              onChange={(e) => {
                setZoom(e.target.value);
              }}
            ></input>
            <div className="zoom-value-box">{zoom}%</div>
          </div>
          <div className="header-btn">
            <GridViewIcon />
          </div>
        </div>
        {pageList && (
          <div className="page-list">
            {project.pages.map((item, index) => (
              <div
                className="page-list-item"
                style={{
                  width: (item.width * 70) / item.height,
                }}
                onClick={() => {
                  setPageNo(index);
                  setPageList(false);
                }}
              >
                <ViewOnlyPage page={item} zoom={7000 / item.height} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
