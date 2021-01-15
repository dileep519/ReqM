import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import svgPath from "./svg";

export default function Mysidebar() {
  const [path, setPath] = useState("/");
  let history = useHistory();

  // it will give me the pathname
  let pathname = history.location.pathname;

  // if the route = '/' then we will rerender it to projects
  if (pathname === "/") {
    history.push("/myprojects");
    setPath("/myprojects");
  }

  const handleClick = (e, paths) => {
    history.push(paths);
    setPath(paths);
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
        <div className="items">My Projects</div>
      </div>
    </div>
  );
}
