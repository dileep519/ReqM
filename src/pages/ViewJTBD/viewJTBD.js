import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../context/userContext/userContext";
import "./style.css";
export default function ViewSummery() {
  let projectID = useParams().projectID;
  let storyID = useParams().storyID;
  const [data, setData] = useState({});

  const [user, setUser] = useContext(UserContext).user;
  let history = useHistory();
  let path = history.location.pathname;
  if (path[path.length - 1] !== "/") path += "/";
  //console.log(projectID);
  //console.log(storyID);

  useEffect(() => {
    getDetails();
  }, [projectID, storyID]);

  const getDetails = async () => {
    let api =
      "http://localhost:3001/api/jtbd/get-jtbd/projectId/" + `${projectID}`;
    axios
      .get(api, {
        headers: { authtoken: `${user}` },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]._id === storyID) {
            setData(res.data[i].JobTobeDone);
          }
        }
      })
      .catch((e) => {
        window.alert(e);
        history.push("/");
      });
  };
  //console.log(data);

  return (
    <div className="viewSummery">
      <div className="view__story view__part1">
        <div className="userstory__header">Description</div>
        <div className="userstory__data">{data.description}</div>
        <div className="userstory__header">Persona</div>
        <div className="userstory__data">{data.persona}</div>
        <div className="userstory__header">Situation</div>
        <div className="userstory__data">{data.situation}</div>
        <div className="userstory__header">What I Want</div>
        <div className="userstory__data">{data.whatiwant}</div>
      </div>
      <div className="view__story view__part2">
        <div className="userstory__header">So I can</div>
        <div className="userstory__data">{data.soican}</div>
        <div className="userstory__header">Provided By</div>
        <div className="userstory__data">{data.providedBy}</div>
        <div className="userstory__header">Mode</div>
        <div className="userstory__data">{data.mode}</div>
        <div className="userstory__header">Priortization</div>
        <div className="userstory__data userstory__data__priority">
          {data.priority}
        </div>
      </div>
      <div className="view__story view__part3">
        <div className="userstory__header">Additional Details</div>
        <div className="userstory__data">{data.details}</div>
        <div className="userstory__header">Assigned To</div>
        <div className="userstory__data">{data.assignTo}</div>
      </div>
      <div className="div__button">
        <div
          className="BUTTON"
          onClick={() => {
            history.push(path + "edit");
          }}
        >
          Edit
        </div>
      </div>
    </div>
  );
}
