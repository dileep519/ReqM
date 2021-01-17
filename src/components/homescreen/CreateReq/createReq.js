import React from "react";
import "./style.css";
import NoteAddSharpIcon from "@material-ui/icons/NoteAddSharp";
import { useHistory } from "react-router-dom";
export default function CreateReq() {
  let history = useHistory();

  let path = history.location.pathname;

  if (path[path.length - 1] !== "/") path += "/";
  console.log(path);
  const pushStory = () => {
    history.push(path + "adduserstory");
  };

  const pushJTBD = () => {
    history.push(path + "jtbd");
  };

  return (
    <div className="DemoPage__project">
      <div className="NoProject__title">
        Seems like you don't have any requirements created in this project !!
      </div>
      <div className="NoProject__container">
        <div className="NoProject__left">
          <NoteAddSharpIcon onClick={pushStory} />
          <div className="NoProject__addStory">Click to add User Story</div>
        </div>
        <div className="NoProject__right">
          <NoteAddSharpIcon onClick={pushJTBD} />
          <div className="NoProject__req">Click to add job To Be Done</div>
        </div>
      </div>
    </div>
  );
}
