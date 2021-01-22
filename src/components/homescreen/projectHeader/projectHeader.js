import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
// this logo will come from user
import logo from "./logo.png";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "./../../../context/userContext/userContext";

export default function ProjectHeader() {
  const [user, setUser] = useContext(UserContext).user;
  const [title, setTitle] = useState("My Projects");
  let history = useHistory();
  let projectID = useParams().projectID;
  useEffect(() => {
    getTitle();
  }, []);

  const getTitle = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    axios
      .get(api, { headers: { authtoken: `${user}` } })
      .then((res) => {
        let data = res.data;

        for (let i = 0; i < data.length; i++) {
          if (data[i]._id === projectID) {
            setTitle(data[i].projectName);
          }
        }
      })
      .catch((e) => {
        window.alert(e);
        history.push("/");
      });
  };

  let user_Name = JSON.parse(localStorage.getItem("Name"));
  return (
    <div className="header">
      <div className="header__title">{title}</div>
      <div className="user__info">
        <img className="img" src={logo} alt={logo} />

        <div className="user__name"> {user_Name}</div>
      </div>
    </div>
  );
}
