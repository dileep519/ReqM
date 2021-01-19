import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
// this logo will come from user
import logo from "./logo192.png";
import { useParams } from "react-router-dom";
import { UserContext } from "./../../../context/userContext/userContext";

export default function ProjectHeader() {
  const [user, setUser] = useContext(UserContext).user;
  const [title, setTitle] = useState("My Projects");
  let projectID = useParams().projectID;
  useEffect(() => {
    getTitle();
  }, [projectID]);

  const getTitle = async () => {
    let api = "http://localhost:3001/api/project/get-projects";
    axios.get(api, { headers: { authtoken: `${user}` } }).then((res) => {});
  };

  return (
    <div className="header">
      <div className="header__title">{title}</div>
      <div className="user__info">
        <img className="img" src={logo} alt={logo} />

        <div className="user__name"> Devjoyti</div>
      </div>
    </div>
  );
}
