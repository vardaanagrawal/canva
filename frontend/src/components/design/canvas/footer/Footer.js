import React from "react";
import "./footer.css";
import { useDispatch } from "react-redux";
import { showSidebar2 } from "../../../../redux/actions/sidebar2Actions";

export default function Footer({ zoom, setZoom }) {
  const dispatch = useDispatch();

  return (
    <div
      className="canvas-footer"
      onClick={() => {
        dispatch(
          showSidebar2({
            visible: true,
            type: "notes",
          })
        );
      }}
    >
      <div className="header-btn">Notes</div>
    </div>
  );
}

{
  /* <button
        className="zoom-out-btn"
        onClick={() => {
          setZoom(zoom - 0.1);
        }}
        disabled={zoom === 2}
      >
        -
      </button>
      <div>{zoom}%</div>
      <button
        className="zoom-in-btn"
        onClick={() => {
          setZoom(zoom + 0.1);
        }}
        disabled={zoom === 2}
      >
        +
      </button> */
}
