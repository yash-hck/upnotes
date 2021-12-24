import React, { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "61bdab23599f515167445e10",
      user: "61baf0d52e469758b5ff8cec",
      title: "chit",
      description: "changed description",
      tag: "personal",
      date: "2021-12-18T09:34:27.163Z",
      __v: 0,
    },
    {
      _id: "61bdab6c599f515167445e14",
      user: "61baf0d52e469758b5ff8cec",
      title: "my-title",
      description: "brushup",
      tag: "personal",
      date: "2021-12-18T09:35:40.690Z",
      __v: 0,
    },
    {
      _id: "61bdab6c599f515167445e15",
      user: "61baf0d52e469758b5ff8cec",
      title: "my-title",
      description: "brushup",
      tag: "personal",
      date: "2021-12-18T09:35:40.690Z",
      __v: 0,
    },
    {
      _id: "61bdab6c599f515167445e16",
      user: "61baf0d52e469758b5ff8cec",
      title: "my-title",
      description: "brushup",
      tag: "personal",
      date: "2021-12-18T09:35:40.690Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children};
    </NoteContext.Provider>
  );
};

export default NoteState;
