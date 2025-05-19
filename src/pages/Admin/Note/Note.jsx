import React, { useEffect, useState } from "react";
import "./Note.css";
import { GoPencil } from "react-icons/go";
import { CiCalendar, CiCalendarDate } from "react-icons/ci";
import { TiPinOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNoteAction,
  DeleteNoteAction,
  GetNoteAction,
  PinNoteAction,
  ResetNoteAction,
  UpdateNoteAction,
} from "../../../redux/actions/NoteAction";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import parse from "html-react-parser";
import toast from "react-hot-toast";
import QuillEditor from "../../../components/TextEditor/QullEditor";
import { loginUser } from "../../../redux/actions/UserActions";

export default function Note() {
  const noteListData = useSelector((state) => state.NoteReducer.noteData);
  const noteTypeData = useSelector((state) => state.NoteReducer.noteTypes);
  const noteEditData = useSelector((state) => state.NoteReducer.noteEdit);
  const notePintData = useSelector((state) => state.NoteReducer.notePin);
  const userData = useSelector((state) => state.UserReducer.user);

  const { success } = useSelector((state) => state.NoteReducer);
  const dispatch = useDispatch();
  const { id, type, pinted } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function
  const [openEditor, setOpenEditor] = useState(false);
  const [editorText, setEditorText] = useState("");
  const [formData, setFormData] = useState({
    note_title: "",
    note_type: "",
  });

  useEffect(() => {
    if (success !== "") {
      toast.success(success);
      dispatch(ResetNoteAction());
    }
  }, [success, dispatch]);
  useEffect(() => {
    if (id) {
      setOpenEditor(true);
      setFormData({
        note_title: noteEditData.note_title || "",
        note_type: noteEditData.note_type || "",
      });
      setEditorText(noteEditData.note_content || "");
    } else {
      resetForm();
    }
  }, [id, noteEditData]);
    useEffect(() => {
    // If not logged in, auto login as guest
    if (!userData || !userData.user_name) {
      dispatch(loginUser("guest", "guest123"));
    }
  }, [userData, dispatch]);
  const resetForm = () => {
    setFormData({ note_title: "", note_type: "" });
    setEditorText("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setEditorText(content); // Update the state with new content
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();
    const noteData = {
      ...formData,
      note_content: editorText,
      note_date: date,
      note_author: userData.user_id,
      note_id: id ? id : Math.max(...noteListData.map((o) => o.note_id), 0) + 1,
    };

    if (id) {
      dispatch(UpdateNoteAction(noteData));
    } else {
      dispatch(AddNoteAction(noteData));
    }
  };
  const renderNoteTab = () => (
    <>
      {noteTypeData.map((note, index) => (
        <NavLink
          to={`/admin/note/type/${note}`}
          className={({ isActive }) =>
            isActive ? "tab__note active__link" : "tab__note"
          }
          key={index}
        >
          {note}
        </NavLink>
      ))}
    </>
  );
  const renderNoteList = () => {
    let notesToRender;
    if (pinted) {
      notesToRender = notePintData;
    } else if (type) {
      notesToRender = noteListData.filter((note) => note.note_type === type);
    } else {
      notesToRender = noteListData;
    }
    notesToRender = notesToRender.filter(
      (note) => note.note_author === userData.user_id
    );
    return notesToRender.map((note, index) => {
      // Check if the note is pinned
      const isPinned = notePintData.some(
        (pinnedNote) => pinnedNote.note_id === note.note_id
      );

      return (
        <div className="note__item" key={index}>
          <div className="item__header">
            <CiCalendar className="note__icon" />
            <div className="note__change">
              <div onClick={() => dispatch(PinNoteAction(note.note_id))}>
                <TiPinOutline
                  className={`note__pin ${isPinned ? "pinned" : ""}`} // Change class based on pinned state
                />
              </div>
              <AiOutlineDelete
                className="note__more"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete "${note.note_title}"?`
                    )
                  ) {
                    dispatch(DeleteNoteAction(note.note_id));
                  }
                }}
              />
            </div>
          </div>
          <div
            className="item__body"
            onClick={() => {
              dispatch(GetNoteAction(note.note_id)); // Dispatch the action
              navigate(`/admin/note/${note.note_id}`); // Navigate to the note's page
            }}
            style={{ cursor: "pointer" }} // Add pointer cursor for better UX
          >
            <h3>{note.note_title}</h3>
            <div className="note__text">{parse(note.note_content)}</div>
          </div>
          <div className="item__footer">
            <div className="item__date">
                <CiCalendarDate className="note__date" />
                <span>{note.note_date}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="note__container">
      <form onSubmit={onSubmit}>
        <div className="note__header">
          <div
            className="open__note"
            style={{ display: openEditor ? "none" : "flex" }}
            onClick={() => setOpenEditor(true)}
          >
            <GoPencil /> <span>Write your note</span>
          </div>
          <div
            className="note__input"
            style={{ display: openEditor ? "flex" : "none" }}
          >
            <input
              className="open__note"
              type="text"
              placeholder="Title..."
              name="note_title"
              value={formData.note_title}
              onChange={handleChange}
              required
            />
            <input
              list="note-type"
              name="note_type"
              className="open__note"
              placeholder="Type..."
              value={formData.note_type}
              onChange={handleChange}
              required
            />
          </div>
          <datalist id="note-type">
            {noteTypeData.map((noteType) => (
              <option key={noteType} value={noteType} />
            ))}
          </datalist>
        </div>
        <div
          className="note__editor"
          style={{ display: openEditor ? "block" : "none" }}
        >
          <QuillEditor value={editorText} onChange={handleContentChange} />
          <div className="button__note">
            <button
              className="post__save"
              type="button"
              onClick={() => setOpenEditor(false)}
            >
              Close
            </button>
            <button className="post__save" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
      <div className="note__body">
        <h3>Your Note</h3>
        <div className="note__menu">
          <div className="note__tab">
            <NavLink
              to={`/admin/note`}
              end
              className={({ isActive }) =>
                isActive ? "tab__note active__link" : "tab__note"
              }
            >
              All
            </NavLink>
            <NavLink
              to={`/admin/note/pinted/pinted`}
              end
              className={({ isActive }) =>
                isActive ? "tab__note active__link" : "tab__note"
              }
            >
              Pinted
            </NavLink>
            {renderNoteTab()}
          </div>
        </div>
        <div className="note__content">{renderNoteList()}</div>
      </div>
    </div>
  );
}
