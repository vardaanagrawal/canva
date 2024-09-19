import React from "react";
import './spinLoader.css';

export default function SpinLoader({ height, width, color }) {
  return (
    <div
      className="spin-loader"
      style={{
        height: height,
        width: width,
        border: `solid 3px ${color}`,
        borderBottom: "solid transparent 3px",
      }}
    ></div>
  );
}
