import React from "react";
import "./style.css";
import NoteAddSharpIcon from "@material-ui/icons/NoteAddSharp";
export default function NoParticularProject() {
  return (
    <div className="NoProject">
      <div className="NoProject__title">
        Select the Format For The Requirement
      </div>
      <div className="NoProject__container">
        <div className="NoProject__left">
          <NoteAddSharpIcon />
          <div className="NoProject__addStory">Click to add User Story</div>
        </div>
        <div className="NoProject__right">
          <NoteAddSharpIcon />
          <div className="NoProject__req">Click to add job To Be Done</div>
        </div>
      </div>
    </div>
  );
}
