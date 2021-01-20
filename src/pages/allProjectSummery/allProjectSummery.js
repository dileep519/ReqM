import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, withRouter } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
//import "bootstrap/dist/css/bootstrap.css";

import { UserContext } from "./../../context/userContext/userContext";

import "./style.css";

const AllProjectSummary = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [data, setData] = useState([]);
  const [loged, setLoged] = useState(0);
  const [priority, setPriority] = useState(0);
  let history = useHistory();
  useEffect(() => {
    getdata();
    getloged();
  }, []);

  const getdata = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    axios.get(api, { headers: { authtoken: `${user}` } }).then((res) => {
      setData(res.data);
    });
  };

  const getloged = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    axios.get(api, { headers: { authtoken: `${user}` } }).then((res) => {
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        let api =
          "http://localhost:3001/api/story/get-stories/projectId/" +
          `${res.data[i]._id}`;
        axios
          .get(api, {
            headers: { authtoken: `${user}` },
          })
          .then((res) => {
            //console.log(res.data);
            if (res.data.length !== 0) setLoged(res.data.length + loged);
            let cnt = 0;
            if (res.data.length != 0) {
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].storyDetails.priority === "High") cnt++;
              }
            }
            setPriority(cnt + priority);
          });
      }
    });
  };
  const pushHistory = (id) => {
    let path = history.location.pathname;
    if (path[path.length - 1] !== "/") path += "/";
    history.push(path + id);
  };

  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  return (
    <div className="allProjectSummery__container">
      <h3>&nbsp; &nbsp; All Project Summary</h3>

      <div className="card-container">
        <p className="text-cordinate">Active Project Spaces</p>
        <h3 className="content-align">{data.length}</h3>
      </div>
      <div className="card-container">
        <p className="text-cordinate">Requirement Logded</p>
        <h3 className="content-align">{loged}</h3>
      </div>
      <div className="card-container">
        <p className="text-cordinate">Priority Requirements</p>
        <h3 className="content-align-p">{priority}</h3>
      </div>

      <h3>&nbsp; &nbsp; Active Project Spaces</h3>
      {/* this thing will come from map and we need to click onClick on that*/}
      {}
      {data.slice(0, data.length).map((item, index) => (
        <div
          className={`card-container box-p${index % 2}`}
          key={index}
          onClick={() => pushHistory(item._id)}
        >
          <p className="text-cordinate-p">{item.projectName}</p>
        </div>
      ))}

      <div className="card-container">
        <div className="box-b">
          <h2 style={hStyle}>
            <IconContext.Provider
              value={{
                color: "white",
                className: "global-class-name react-icons",
              }}
            >
              <GoDiffAdded />
              Add Project
            </IconContext.Provider>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AllProjectSummary);
