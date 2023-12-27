import React, { useState } from "react";
import "./canvas.css";
import Header from "./header/Header";
import Body from "./body/Body";
import Footer from "./footer/Footer";

export default function Canvas() {
  const [zoom, setZoom] = useState(1);
  return (
    <div className="canvas">
      <Header />
      <Body zoom={zoom} />
      <Footer zoom={zoom} setZoom={setZoom} />
    </div>
  );
}
