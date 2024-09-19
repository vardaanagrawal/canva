import React, { useEffect, useState } from "react";
import "./canvas.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useSelector } from "react-redux";
import Body from "./body/Body";

export default function Canvas() {
  const [zoom, setZoom] = useState(70);

  const page = useSelector((state) => state.page);
  const sidebar2 = useSelector((state) => state.sidebar2);
  const [footerOpen, setFooterOpen] = useState(false);

  useEffect(() => {
    let canvasBody = document.querySelector(".canvas-body");

    const calculateZoomFactor = () => {
      const screenDimensions = {
        width: canvasBody.offsetWidth - 100,
        height: canvasBody.offsetHeight - 150,
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
    const handleResize = () => {
      calculateZoomFactor();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebar2, footerOpen]);

  return (
    <div className="canvass">
      <Header />
      <Body zoom={zoom} setZoom={setZoom} />
      <Footer
        zoom={zoom}
        setZoom={setZoom}
        setFooterOpen={setFooterOpen}
        footerOpen={footerOpen}
      />
    </div>
  );
}
