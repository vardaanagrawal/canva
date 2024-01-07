import React from "react";
import "./footer.css";
import { useDispatch } from "react-redux";
import { showSidebar2 } from "../../../../redux/actions/sidebar2Actions";

export default function Footer({ zoom, setZoom }) {
  const dispatch = useDispatch();

  return (
    <div className="canvas-footer">
      <div className="canvas-footer-left">
        <div
          className="header-btn"
          onClick={() => {
            dispatch(
              showSidebar2({
                visible: true,
                type: "notes",
              })
            );
          }}
        >
          <i className="fa-regular fa-pen-to-square"></i>
          <div className="notes-btn-text">Notes</div>
        </div>
      </div>
      <div className="canvas-footer-right">
        <div className="zoom-slider-box">
          <input
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
          <i class="fa-regular fa-eye"></i>
          <div className="preview-btn-text">Preview</div>
        </div>
      </div>
    </div>
  );
}
