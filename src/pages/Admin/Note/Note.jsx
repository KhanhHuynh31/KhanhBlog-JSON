import React, { useState } from 'react'
import "./Note.css";
import { GoBell } from "react-icons/go";
import { GoPencil } from "react-icons/go";
import { CiGrid41 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { TiPinOutline } from "react-icons/ti";
import { IoIosMore } from "react-icons/io";
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
export default function Note() {
  const { theme } = useSelector((state) => state.WebReducer);
  const [openEditor, setOpenEditor] = useState(false);
  const noteListData = useSelector((state) => state.NoteReducer.noteData);
  const noteTypeData = useSelector(state => state.NoteReducer.noteTypes);
  const renderNoteTab = () => {
    return noteTypeData.map((note, index) => {
      return <button className="tab__note" key={index} >{note}</button>
    })
  }
  const renderNoteList = () => {
    return noteListData.map((note, index) => {
      return <div className='note__item' key={index}>
        <div className='item__header'>
          <CiCalendar className='note__icon' />
          <div className='note__change'>
            <TiPinOutline className='note__pin' />
            <IoIosMore className='note__more' />
          </div>
        </div>
        <div className='item__body'>
          <h3>{note.note_title}</h3>
          <p>{note.note_content}</p>
        </div>
        <div className='item__footer'>
          <p>{note.note_author}</p>
          <div className='item__date'>
            <CiCalendarDate className='note__date' />
            <span>{note.note_date}</span>
          </div>
        </div>
      </div>
    })
  }
  return (
    <div className="note__container">
      <div className="note__header">
        <div
          className="open__note"
          style={{ display: openEditor ? "none" : "flex" }}
          onClick={() => {
            setOpenEditor(true);
          }}
        >
          {" "}
          <GoPencil /> <span>Write your note</span>
        </div>
        <div className='note__input'
          style={{ display: openEditor ? "flex" : "none" }}>
          <input
            className="open__note"
            type="text"
            placeholder="Title..."
          ></input>
          <input
            list="note-type"
            name="noteType"
            className="open__note"
            placeholder="Type..."
            required
          />
        </div>
        <datalist id="note-type">
          {noteTypeData.map((noteType) => (
            <option key={noteType} value={noteType} />
          ))}
        </datalist>
        <div
          className="note__notify"
          style={{ display: openEditor ? "none" : "flex" }}
        >
          <GoBell />
        </div>
      </div>
      <div
        className="note__editor"
        style={{ display: openEditor ? "block" : "none" }}
      >
        <Editor
          key={theme}
          apiKey="qqcfb0qid0ghvvpl2t7ya6zeljdcmk0imjd2xxnnnawodpnn"
          className="my__editor"
          init={{
            height: 400,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "codesample",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",

            skin: theme === "dark" ? "oxide-dark" : "oxide",
            content_css: theme === "dark" ? "dark" : "default",
          }}
        />
        <div className="button__note">
          <button
            className="post__save"
            onClick={() => {
              setOpenEditor(false);
            }}
          >
            Close
          </button>
          <button className="post__save" type="submit">
            save
          </button>
        </div>
      </div>
      <div className="note__body">
        <div className="note__menu">
          <div className="note__tab">{renderNoteTab()}</div>
          <div className="title__button">
            <CiGrid41 className="note__grid" />
          </div>
        </div>
        <div className="note__content">{renderNoteList()}</div>
      </div>
    </div>
  );
}
