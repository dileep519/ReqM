import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../context/userContext/userContext";
import "./style.css";
export default function ViewSummery() {
  let projectID = useParams().projectID;
  let storyID = useParams().storyID;
  const [data, setData] = useState({});

  const [user, setUser] = useContext(UserContext).user;

  //console.log(projectID);
  //console.log(storyID);

  useEffect(() => {
    getDetails();
  }, [projectID, storyID]);

  const getDetails = async () => {
    let api =
      "http://localhost:3001/api/story/get-stories/projectId/" + `${projectID}`;
    axios
      .get(api, {
        headers: { authtoken: `${user}` },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]._id === storyID) {
            setData(res.data[i].storyDetails);
          }
        }
      });
  };
  //console.log(data);

  return (
    <div className="viewSummery">
      <div className="view__story view__part1">
        <div className="userstory__header">Story Title</div>
        <div className="userstory__data">{data.storyTitle}</div>
        <div className="userstory__header">As a</div>
        <div className="userstory__data">{data.asA}</div>
        <div className="userstory__header">I Want to</div>
        <div className="userstory__data">{data.actionRequirement}</div>
      </div>
      <div className="view__story view__part2">
        <div className="userstory__header">So That</div>
        <div className="userstory__data">{data.actionOutput}</div>
        <div className="userstory__header">Provided By</div>
        <div className="userstory__data">{data.actionProvidedBy}</div>
        <div className="userstory__header">Mode</div>
        <div className="userstory__data">{data.actionReceivedMode}</div>
      </div>
      <div className="view__story view__part3">
        <div className="userstory__header">Additional Details</div>
        <div className="userstory__data">{data.details}</div>
        <div className="userstory__header">Assigned To</div>
        <div className="userstory__data">{data.actionAssignedTo}</div>
        <div className="userstory__header">Priortization</div>
        <div className="userstory__data userstory__data__priority">
          {data.priority}
        </div>
      </div>
      <div className="div__button">
        <div className="BUTTON">Edit</div>
      </div>
    </div>
  );
}
