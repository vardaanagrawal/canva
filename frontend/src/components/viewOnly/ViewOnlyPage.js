import React from "react";
import "./viewOnlyPage.css";

export default function ViewOnlyPage({ page, zoom }) {
  return (
    <div className="vo-page" style={{ backgroundColor: page.color }}>
      {page.components.map((item, index) => (
        <div
          key={item._id}
          style={{
            position: "absolute",
            top: (zoom / 100) * item.y + "px",
            left: (zoom / 100) * item.x + "px",
            height: (zoom / 100) * item.height + "px",
            width: (zoom / 100) * item.width + "px",
            zIndex: item.zIndex,
          }}
        >
          {item.component_type === "shape" ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                opacity: item.opacity + "%",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                height="100%"
                width="100%"
              >
                <path
                  d={item.svg}
                  fill={item.color}
                  stroke={item.border_color}
                  strokeWidth={item.border_width}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          ) : item.component_type === "text" ? (
            <div
              style={{
                height: "100%",
                width: "100%",
                opacity: item.opacity + "%",
                fontFamily: item.font_family,
                fontSize: `${(zoom / 100) * item.font_size}px`,
                color: item.color,
                fontWeight: item.bold,
                fontStyle: item.italic,
                textDecoration: item.underline,
                textAlign: item.text_align,
                WebkitTextStroke: item.text_outline,
                textShadow: item.text_shadow,
                background: "none",
              }}
              className="textbox-component-input"
            >
              {item.text}
            </div>
          ) : (
            item.component_type === "image" && (
              <img
                src={item.image_url}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  opacity: item.opacity + "%",
                }}
                draggable={false}
              ></img>
            )
          )}
        </div>
      ))}
    </div>
  );
}
