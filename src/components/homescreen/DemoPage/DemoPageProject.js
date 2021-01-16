import React from "react";
import "./style.css";
import NoteAddSharpIcon from "@material-ui/icons/NoteAddSharp";
export default function DemoPageProject() {
  return (
    <div className="DemoPage__project">
      <div className="NoProject__title">
        Seems like you don't have any requirements created in this project !!
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
