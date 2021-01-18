import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
//import "bootstrap/dist/css/bootstrap.css";

import { UserContext } from "./../../context/userContext/userContext";

import "./style.css";

const AllProjectSummary = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [data, setData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    axios.get(api, { headers: { authtoken: `${user}` } }).then((res) => {
      //console.log(res.data);
      setData(res.data);
    });
  };
  const pushHistory = (id) => {
    let path = history.location.pathname;
    if (path[path.length - 1] !== "/") path += "/";
    history.push(path + id);
  };
  //  const loadUsers = async () => {
  //    // const result = await axios.get("http://localhost:3003/users");
  //    // setUser(result.data.reverse());
  //  };

  const deleteUser = async (id) => {
    // await axios.delete(`http://localhost:3003/users/${id}`);
    // loadUsers();
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
        <h3 className="content-align">02</h3>
      </div>
      <div className="card-container">
        <p className="text-cordinate">Requirement Logded</p>
        <h3 className="content-align">15</h3>
      </div>
      <div className="card-container">
        <p className="text-cordinate">Priority Requirements</p>
        <h3 className="content-align-p">2</h3>
      </div>

      <h3>&nbsp; &nbsp; Active Project Spaces</h3>
      {/* this thing will come from map and we need to click onClick on that*/}
      {}
      {data.slice(0, data.length).map((item, index) => (
        <div
          className="card-container box-p1"
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

export default AllProjectSummary;
