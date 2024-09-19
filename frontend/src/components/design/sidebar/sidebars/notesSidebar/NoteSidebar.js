import React, { useEffect, useState } from "react";
import "./noteSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { manageElement } from "../../../../../redux/actions/x5ProjectActions";

export default function NoteSidebar() {
  const page = useSelector((state) => state.page);
  const [notes, setNotes] = useState(page.notes);
  const [name, setName] = useState(page.name);

  useEffect(() => {
    setNotes(page.notes);
    setName(page.name);
  }, [page]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      manageElement({
        action: "update",
        element: "page_notes",
        prev_state: page,
        new_state: {
          notes,
        },
      })
    );
  }, [notes]);

  async function handleNameChange() {
    dispatch(
      manageElement({
        action: "update",
        element: "page",
        prev_state: page,
        new_state: {
          name,
        },
      })
    );
  }

  return (
    <div className="elements-sidebar">
      <div className="elements-sidebar-title">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNameChange();
          }}
          className="notes-sidebar-name-form"
        >
          <label>Page {page.page_number} - </label>
          <input
            type="text"
            placeholder="Add page title"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onBlur={() => {
              handleNameChange();
            }}
            className="notes-sidebar-name-input"
          ></input>
        </form>
      </div>
      <div className="note-sidebar-body">
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
