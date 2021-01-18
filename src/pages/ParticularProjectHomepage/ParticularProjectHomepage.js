import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.css";

import "./style.css";
import { UserContext } from "./../../context/userContext/userContext";

const ParticularPageProject = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [data, setData] = useState([]);
  let projectID = useParams().projectID;
  useEffect(() => {
    getuserStory();
  }, [projectID]);

  const getuserStory = async () => {
    let api =
      "http://localhost:3001/api/story/get-stories/projectId/" + `${projectID}`;
    axios
      .get(api, {
        headers: { authtoken: `${user}` },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };
  const PriorityHigh = (data) => {
    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].storyDetails.priority === "high") cnt++;
    }

    return cnt;
  };

  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  // to redirect the route
  let history = useHistory();
  let path = history.location.pathname;
  if (path[path.length - 1] !== "/") path += "/";
  // clicking pushing the history of adduserstory
  const pushHistory = () => {
    history.push(path + "addreq");
  };

  // clicking pushing the history of viewall

  const pushHistoryView = () => {
    history.push(path + "viewall");
  };
  console.log(data);
  return (
    <div className="container mt-3">
      <div className="box" onClick={pushHistory}>
        <h2 style={hStyle}>
          <IconContext.Provider
            value={{
              color: "white",
              className: "global-class-name react-icons",
            }}
          >
            <GoDiffAdded />
            Add Requirement
          </IconContext.Provider>
        </h2>
      </div>
      <h3>&nbsp; &nbsp; Requirement Summary</h3>
      <div className="card__container__wraper">
        <div className="card-container">
          <p className="text-cordinate">Requirements Logded</p>
          <h3 className="content-align">{data.length}</h3>
        </div>
        <div className="card-container">
          <p className="text-cordinate">Priority Requirement</p>
          <h3 className="content-align-p">{PriorityHigh(data)}</h3>
        </div>
        <div className="card-container">
          <p className="text-cordinate">Assigned To Me</p>
          <h3 className="content-align">0</h3>
        </div>
      </div>
      <div className="table-data">
        <div className="box">
          <h5 className="box2">Recent Requirements</h5>
          <h6 style={hStyle} className="box1" onClick={pushHistoryView}>
            View All
          </h6>
        </div>
        <table class="table border shadow center mt-0">
          <thead class="thead-light">
            <tr>
              <th scope="col">Requirement</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Priority</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 3).map((user, index) => (
              <tr key={index}>
                <th scope="row">Req: {index + 1}</th>
                <td>{user.storyDetails.storyTitle}</td>
                <td>{100}</td>
                <td className="text-danger">{user.storyDetails.priority}</td>
                <td>
                  <Link class=" mr-2" to={`/users/${user.id}`}>
                    <BiDotsVerticalRounded />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParticularPageProject;
