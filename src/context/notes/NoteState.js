import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiYWYwZDUyZTQ2OTc1OGI1ZmY4Y2VjIn0sImlhdCI6MTYzOTgxMDM4Nn0.thLzb4f3T7w5py8n09ZPwTPE2T4MdIp_uvhSKKB-2yo",
      },
      // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setNotes(json);
  };

  // adding a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiYWYwZDUyZTQ2OTc1OGI1ZmY4Y2VjIn0sImlhdCI6MTYzOTgxMDM4Nn0.thLzb4f3T7w5py8n09ZPwTPE2T4MdIp_uvhSKKB-2yo",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    if (response.status === 200) {
      const not = {
        _id: "61bdab23599f515167445e10",
        user: "61baf0d52e469758b5ff8cec",
        title: title,
        description: description,
        tag: tag,
        date: "2021-12-18T09:34:27.163Z",
        __v: 0,
      };

      setNotes(notes.concat(not));
    }
  };

  //Delete a Note

  const deleteNote = async (id) => {
    // TODO : Api call

    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiYWYwZDUyZTQ2OTc1OGI1ZmY4Y2VjIn0sImlhdCI6MTYzOTgxMDM4Nn0.thLzb4f3T7w5py8n09ZPwTPE2T4MdIp_uvhSKKB-2yo",
      },
      // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    console.log("Note with id " + id + "deleted");
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    if (response.status === 200) setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // Default options are marked with *
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFiYWYwZDUyZTQ2OTc1OGI1ZmY4Y2VjIn0sImlhdCI6MTYzOTgxMDM4Nn0.thLzb4f3T7w5py8n09ZPwTPE2T4MdIp_uvhSKKB-2yo",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    // Logic to edit note in client side

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element.id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
