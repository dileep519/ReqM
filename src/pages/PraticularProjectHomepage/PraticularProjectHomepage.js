import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.css";

import "./style.css";

const ParticularPageProject = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };
  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  // to redirect the route
  let history = useHistory();

  // clicking pushing the history of adduserstory
  const pushHistory = () => {
    history.push("/myprojects/:projectID/projects/addreq");
  };

  // clicking pushing the history of viewall

  const pushHistoryView = () => {
    history.push("/myprojects/:projectID/projects/viewall");
  };

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
          <h3 className="content-align">20</h3>
        </div>
        <div className="card-container">
          <p className="text-cordinate">Priority Requirement</p>
          <h3 className="content-align-p">2</h3>
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
            {users.slice(0, 3).map((user, index) => (
              <tr>
                <th scope="row">Req: {index + 1}</th>
                <td>{user.title}</td>
                <td>{user.date}</td>
                <td className="text-danger">{user.priority}</td>
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
