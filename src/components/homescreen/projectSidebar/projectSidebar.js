import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";
import svgPath from "./svg";

export default function ProjectSidebar() {
  const [path, setPath] = useState("/");
  let history = useHistory();

  const courseID = useParams().projectID;
  let generalPath = "/myprojects/" + courseID + "/";

  // it will give me the pathname
  let pathname = history.location.pathname;

  if (pathname[pathname.length - 1] !== "/") pathname += "/";

  //route path will give you the pathname
  let routePath = pathname.split(generalPath)[1];
  routePath = routePath.split("/")[0];

  // if the route = '/' then we will rerender it to projects
  if (pathname === generalPath) {
    history.push(generalPath + "projects");
  }

  const handleClick = (e, paths) => {
    history.push(generalPath + paths);
    setPath(paths);
  };

  const checkClick = () => {
    // setTimeout is used because when
    setTimeout(() => {
      /*
         1. here I have collect the children of sidebar__items
         2. if the children attribute matches to the path then we will chage it to active color
         3. else to will change it to non active color
      */
      // console.log(path);
      if (path === "/") setPath(routePath);
      let header = document.getElementsByClassName("sidebar__items");
      let childs = header.item(0).children;
      for (let i = 0; i < childs.length; i++) {
        if (childs.item(i).getAttribute("path") === path) {
          childs.item(i).style.color = "#DBDCE0";
          childs.item(i).style.backgroundColor = "#565659";
        } else {
          childs.item(i).style.backgroundColor = "#363740";
          childs.item(i).style.color = "#a4a6b3";
        }
      }
    }, 0);
  };

  return (
    <div className="sidebar">
      <div className="header_img">
        <svg
          width="122"
          height="44"
          viewBox="0 0 122 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={svgPath} fill="#D1D1D6" />
        </svg>
      </div>

      <div className="sidebar__items" id="sidebar__div">
        <div
          onClick={(e) => handleClick(e, "projects")}
          className="projects items"
          path="projects"
        >
          My Projects
        </div>
        <div
          onClick={(e) => handleClick(e, "watchlist")}
          className="watchlist items"
          path="watchlist"
        >
          My Watchlist
        </div>
        <div
          onClick={(e) => handleClick(e, "assigned_req")}
          className="assigned_req items"
          path="assigned_req"
        >
          Assigned Requirements
        </div>
        <div
          onClick={(e) => handleClick(e, "project_members")}
          className="project_members items"
          path="project_members"
        >
          Project Members
        </div>
      </div>

      {checkClick()}
    </div>
  );
}
