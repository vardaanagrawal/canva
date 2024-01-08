import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateImageInDb, uploadImg } from "../../../../api";
import { updateUploads } from "../../../../redux/actions/x4UploadsActions";
import {
  manageElement,
} from "../../../../redux/actions/x5ProjectActions";
import { setSelectedComponent } from "../../../../redux/actions/x6ComponentActions";

export default function UploadSidebar() {
  const [img, setImg] = useState();

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  async function upload(img) {
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "hddvzsci");
    formData.append("folder", "canva");
    const res = await uploadImg(formData);
    const image_data = {
      asset_id: res.asset_id,
      image_url: res.secure_url,
      height: 150,
      width: Math.floor((150 * res.width) / res.height),
    };
    dispatch(updateUploads(image_data));
    const res2 = await updateImageInDb(user._id, image_data);
    console.log(res2);
  }

  const uploads = useSelector((state) => state.uploads);

  function addItem(item) {
    // dispatch(addComponent(item));
    dispatch(
      manageElement({
        action: "add",
        element: "component",
        method: "change",
        item: item,
      })
    );
    dispatch(setSelectedComponent(item));
  }

  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Upload Files</div>
      <div className="sidebar2-body upload-sidebar-body">
        <input
          type="file"
          id="upload-file-input"
          onChange={(e) => {
            if (e.target.files[0]) upload(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        ></input>
        <label htmlFor="upload-file-input" className="upload-file-btn">
          Upload
        </label>
        <div className="uploads-list-title">Your Uploads</div>
        {uploads.length > 0 && (
          <div className="uploads-list">
            {uploads.map((item, index) => (
              <div
                key={index}
                className="uploads-item"
                onClick={() => {
                  const id = Math.floor(Math.random() * 900) + 100;
                  addItem({
                    _id: id,
                    component_type: 4,
                    image_url: item.image_url,
                    height: item.height,
                    width: item.width,
                    x: 100,
                    y: 100,
                  });
                }}
              >
                <img src={item.image_url} className="uploads-item-img"></img>
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
    </div>
  );
}
