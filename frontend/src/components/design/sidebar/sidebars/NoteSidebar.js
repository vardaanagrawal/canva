import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function NoteSidebar() {
  const current_project = useSelector((state) => state.current_project);
  const [notes, setNotes] = useState(current_project.notes);
  return (
    <div className="sidebar2-inner">
      <div className="sidebar2-title">Notes</div>
      <div className="sidebar2-body">
        <textarea
          value={notes}
          onChange={(e) => {
            if (e.target.value.length <= 1000) setNotes(e.target.value);
          }}
          placeholder="Write here..."
          className="notes-text-area"
        ></textarea>
        <div className="notes-letter-count">{notes.length}/1000</div>
      </div>
    </div>
  );
}
