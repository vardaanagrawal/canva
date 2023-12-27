import React from "react";
import "./header.css";
import "./helpers.css";
import { useSelector } from "react-redux";
import {
  BgColorButton,
  DeleteButton,
  DuplicateButton,
  EditPhotoButton,
  FontEditRow,
  FontFamilyButton,
  FontSizeButton,
  HeaderDivider,
  PositionButton,
  ShapeButton,
} from "./Helpers";

export default function Header() {
  const selected_component = useSelector((state) => state.selected_component);
  return (
    <div className="canvas-header">
      {selected_component.component_type === 0 ? (
        <Type0 />
      ) : selected_component.component_type === 2 ? (
        <Type2 />
      ) : selected_component.component_type === 3 ? (
        <Type3 />
      ) : selected_component.component_type === 4 ? (
        <Type4 />
      ) : (
        selected_component.component_type === 1 && <Type1 />
      )}
    </div>
  );
}

// for nothing
function Type0() {
  return (
    <div className="canvas-header-inner">
      <div className="header-left-menu">
        <PositionButton />
      </div>
    </div>
  );
}
// for canvas
function Type1() {
  return (
    <div className="canvas-header-inner">
      <div className="header-left-menu">
        <BgColorButton />
        <HeaderDivider />
        <PositionButton />
      </div>
    </div>
  );
}
// for shapes
function Type2() {
  return (
    <div className="canvas-header-inner">
      <div className="header-left-menu">
        <ShapeButton />
        <HeaderDivider />
        <BgColorButton />
        <HeaderDivider />
        <PositionButton />
      </div>
      <div className="header-right-menu">
        <DuplicateButton />
        <DeleteButton />
      </div>
    </div>
  );
}
// for text
function Type3() {
  return (
    <div className="canvas-header-inner">
      <div className="header-left-menu">
        <FontFamilyButton />
        <FontSizeButton />
        <HeaderDivider />
        <FontEditRow />
        <HeaderDivider />
        <PositionButton />
      </div>
      <div className="header-right-menu">
        <DuplicateButton />
        <DeleteButton />
      </div>
    </div>
  );
}
// for images
function Type4() {
  return (
    <div className="canvas-header-inner">
      <div className="header-left-menu">
        <EditPhotoButton />
        <HeaderDivider />
        <PositionButton />
      </div>
      <div className="header-right-menu">
        <DuplicateButton />
        <DeleteButton />
      </div>
    </div>
  );
}
