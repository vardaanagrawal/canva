import React, { useState } from "react";
import "./canvas.css";
import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";

export default function Canvas() {
  const [zoom, setZoom] = useState(70);
  return (
    <div className="canvass">
      <Header />
      <Body zoom={zoom} />
      <Footer zoom={zoom} setZoom={setZoom} />
    </div>
  );
}
