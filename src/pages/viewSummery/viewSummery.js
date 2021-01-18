import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../context/userContext/userContext";

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

  console.log(data);

  return (
    <div className="viewSummery">
      <div className="view__part1">
        <div>Story Title</div>
        <div>{data.storyTitle}</div>
        <div>As a</div>
        <div>{data.asA}</div>
        <div>I Want to</div>
        <div>{}</div>
      </div>
    </div>
  );
}
