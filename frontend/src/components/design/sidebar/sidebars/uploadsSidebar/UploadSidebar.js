import React, { useState } from "react";
import "./uploadSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";
import { setSelectedComponent } from "../../../../../redux/actions/x6ComponentActions";
import { uploadImage } from "../../../../../redux/actions/x4UploadsActions";
import SpinLoader from "../../../../../utils/SpinLoader";

import { v4 as uuidv4 } from "uuid";

export default function UploadSidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const page = useSelector((state) => state.page);
  const uploads = useSelector((state) => state.uploads);

  const [uploading, setUploading] = useState(false);
  async function upload(img) {
    setUploading(true);
    await dispatch(uploadImage(user._id, img));
    setUploading(false);
  }

  function addItem(item) {
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        item: item,
      })
    );
    dispatch(setSelectedComponent(item));
  }

  return (
    <div className="elements-sidebar">
      <input
        type="file"
        id="upload-file-input"
        onChange={(e) => {
          if (e.target.files[0]) upload(e.target.files[0]);
        }}
      ></input>
      <label htmlFor="upload-file-input" className="upload-file-btn">
        {uploading ? (
          <SpinLoader height={18} width={18} color="white" />
        ) : (
          "Upload"
        )}
      </label>
      <div className="uploads-sidebar-title">Your Uploads</div>
      {uploads.length > 0 && (
        <div className="images-sidebar-body">
          {uploads.map((item, index) => (
            <div
              key={index}
              className="images-sidebar-item"
              onClick={() => {
                const uuid = uuidv4();
                const hexString = uuid.replace(/-/g, "");
                const id = hexString.substring(0, 24);
                addItem({
                  _id: id,
                  component_type: "image",
                  image_url: item.url,
                  height: 100,
                  width: 100,
                  x: 100,
                  y: 100,
                  zIndex: page.components.length + 1,
                  page_id: page._id,
                });
              }}
            >
              <img src={item.url} className="uploads-item-img"></img>
            </div>
          ))}
        </div>
      )}
      {uploads.length === 0 && (
        <div
          style={{
            width: "100%",
            padding: "50px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "small",
            color: "gray",
            gap: "20px",
          }}
        >
          <img
            src="https://static.canva.com/web/images/ceafbbae0e64011619bc0f490935a031.png"
            alt=""
            style={{ height: "80px" }}
          ></img>
          <div>Images you upload will be shown here</div>
        </div>
      )}
    </div>
  );
}
