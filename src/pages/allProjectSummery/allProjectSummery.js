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
  const [jtbdloged, setJtbdloged] = useState(0);
  const [jtbdpriority, setJtbdPriority] = useState(0);

  let history = useHistory();
  useEffect(async () => {
    getdata();
    getloged();
    getjtbd();
  }, []);

  const getdata = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    try {
      let res = await axios.get(api, { headers: { authtoken: `${user}` } });
      setData(res.data);
    } catch (error) {
      history.push("/error");
      window.alert("The server is not working!!");
    }
  };

  const getloged = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    try {
      let res = await axios.get(api, { headers: { authtoken: `${user}` } });
      //console.log(res.data);
      let cnt = 0;
      let story = 0;
      for (let i = 0; i < res.data.length; i++) {
        let apis =
          "http://localhost:3001/api/story/get-stories/projectId/" +
          `${res.data[i]._id}`;
        try {
          let res2 = await axios.get(apis, {
            headers: { authtoken: `${user}` },
          });

          //if (res.data.length !== 0) setLoged(res.data.length + loged);
          story += Number(res2.data.length);
          for (let i = 0; i < res2.data.length; i++) {
            if (res2.data[i].storyDetails.priority === "High") cnt++;
          }
        } catch (error) {
          window.alert("Server is not Working");
          history.push("/error");
        }
      }
      //console.log(cnt);
      //console.log(story);
      setPriority(cnt);
      setLoged(story);
    } catch (error) {
      window.alert("Server is not Working");
      history.push("/error");
    }
  };

  const getjtbd = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    try {
      let res = await axios.get(api, { headers: { authtoken: `${user}` } });
      //console.log(res.data);
      let cnt = 0;
      let story = 0;
      for (let i = 0; i < res.data.length; i++) {
        let apis =
          "http://localhost:3001/api/jtbd/get-jtbd/projectId/" +
          `${res.data[i]._id}`;
        try {
          let res2 = await axios.get(apis, {
            headers: { authtoken: `${user}` },
          });

          //if (res.data.length !== 0) setLoged(res.data.length + loged);
          story += Number(res2.data.length);
          for (let i = 0; i < res2.data.length; i++) {
            if (res2.data[i].JobTobeDone.priority === "High") cnt++;
          }
        } catch (error) {
          window.alert("Server is not Working");
          history.push("/error");
        }
      }

      setJtbdloged(story);
      setJtbdPriority(cnt);
    } catch (error) {
      window.alert("Server is not Working");
      history.push("/error");
    }
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
        <h3 className="content-align">{loged + jtbdloged}</h3>
      </div>
      <div className="card-container">
        <p className="text-cordinate">Priority Requirements</p>
        <h3 className="content-align-p">{priority + jtbdpriority}</h3>
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
