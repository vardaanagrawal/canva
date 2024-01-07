import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNotes } from "../../../../redux/actions/currentProjectActions";

export default function NoteSidebar() {
  const current_project = useSelector((state) => state.current_project);
  const [notes, setNotes] = useState(current_project.notes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateNotes(notes));
  }, [notes]);

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
