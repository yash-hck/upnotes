import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const state = { name: "Yash", passion: "Badminton" };

  <NoteContext.provider value={state}>{props.children};</NoteContext.provider>;
};

export default NoteState;
