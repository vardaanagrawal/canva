import React, { useRef, useState } from "react";
import { ShareIcon } from "../../../../utils/icons";
import { useSelector } from "react-redux";

export default function Share() {
  const [shareDD, setShareDD] = useState(false);

  const sbRef = useRef(null); // create button ref
  const sdRef = useRef(null); // create dropdown ref
  const handleClickOutside = (event) => {
    if (
      sdRef.current && // tells us that whether the create dropdown  is open or not
      !sdRef.current.contains(event.target) && // tells us whether clicked item is create dropdown or not
      !sbRef.current.contains(event.target) // tells us whether clicked item is create button or not
    ) {
      setShareDD(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div>
      <div
        className="dn-share-btn"
        ref={sbRef}
        onClick={() => {
          setShareDD(!shareDD);
        }}
        style={{
          padding: "0px 10px",
        }}
      >
        <ShareIcon />
        <div className="dn-share-btn-text">Share</div>
      </div>
      {shareDD && <ShareDD sdRef={sdRef} setShareDD={setShareDD} />}
    </div>
  );
}

function ShareDD({ sdRef, setShareDD }) {
  const project = useSelector((state) => state.project);
  const user = useSelector((state) => state.user);

  const [copy, setCopy] = useState(false);

  async function handleCopy() {
    setCopy(true);
    await navigator.clipboard.writeText(
      `http://localhost:3000/design/${project._id}/view`
    );
    setTimeout(() => {
      setCopy(false);
    }, 5000);
  }

  return (
    <div className="share-dd" ref={sdRef}>
      <div className="share-dd-title">Share this design</div>
      <div className="share-dd-link">{`http://localhost:3000/design/${project._id}/view`}</div>
      <div
        className="share-dd-copy-link-btn"
        onClick={() => {
          handleCopy();
        }}
      >
        {copy ? "Copied!" : "Copy Link"}
      </div>
      <div className="share-dd-download-btn">Download</div>
    </div>
  );
}
