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
  const [jtbdloged, setJtbdloged] = useState(0);
  const [jtbdpriority, setJtbdPriority] = useState(0);

  const [totalloged, setTotalLoged] = useState(0);
  const [priority, setPriority] = useState(0);

  let history = useHistory();
  useEffect(async () => {
    getdata();
    //getloged();
    //getjtbd();
    getTotalLoged();
  }, []);

  const getdata = async () => {
    let api = "http://localhost:3001/api/project/get-all-projects";
    let projects = [];
    try {
      let res = await axios.get(api, { headers: { authtoken: `${user}` } });
      // console.log(res.data);

      let data = res.data;
      let email = JSON.parse(localStorage.getItem("email"));
      //console.log(email);
      //console.log(res.data[0]);
      for (let i = 0; i < data.length; i++) {
        let EMAILS = data[i].usersAssociated;
        // console.log(EMAILS);
        for (let j = 0; j < EMAILS.length; j++) {
          if (EMAILS[j] === email) {
            projects.push(data[i]);
            break;
          }
        }
      }
      //console.log(projects);
      setData(projects);
    } catch (error) {
      history.push("/error");
      window.alert(error);
    }
  };

  // to get all the length of all userStory and jtbd
  const getTotalLoged = async () => {
    let len1 = 0;
    let len2 = 0;
    let p = 0;
    let api1 = "http://localhost:3001/api/jtbd/get-jtbd/userid/123"; // this is to get all jtbd created by user
    let api2 = "http://localhost:3001/api/story/get-stories/userid/123"; // this is to get all userstory created by user
    // get all the jtbd created by user

    try {
      let res1 = await axios.get(api1, {
        headers: { authtoken: `${user}` },
      });
      for (let i = 0; i < res1.data.length; i++) {
        if (res1.data[i].JobTobeDone.priority === "High") p++;
      }

      len1 = res1.data.length;
    } catch (error) {
      window.alert("Server is not working");
      history.push("/");
      return;
    }
    try {
      let res2 = await axios.get(api2, {
        headers: { authtoken: `${user}` },
      });
      len2 = res2.data.length;
      for (let i = 0; i < res2.data.length; i++) {
        if (res2.data[i].storyDetails.priority === "High") p++;
      }
    } catch (error) {
      window.alert("Server is not working");
      history.push("/");
      return;
    }
    setTotalLoged(len1 + len2);
    setPriority(p);
  };

  /*
  const getloged = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    try {
      let res = await axios.get(api, { headers: { authtoken: `${user}` } });
      //console.log(res.data);
      let cnt = 0;
      let story = 0;
      for (let i = 0; i < res.data.length; i++) {
        // ######### user iDS
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
          return;
        }
      }

      setJtbdloged(story);
      setJtbdPriority(cnt);
    } catch (error) {
      window.alert("Server is not Working");
      history.push("/error");
      return;
    }
  };

*/
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
        <h3 className="content-align">{totalloged}</h3>
      </div>
      <div className="card-container">
        <p className="text-cordinate">Priority Requirements</p>
        <h3 className="content-align-p">{priority + jtbdpriority}</h3>
      </div>

      <h3>&nbsp; &nbsp; Active Project Spaces</h3>
      {/* this thing will come from map and we need to click onClick on that*/}

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
        <div
          className="box-b"
          onClick={() => {
            history.push("/welcome");
          }}
        >
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
