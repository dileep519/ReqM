import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "./../../context/userContext/userContext";

import "./style.css";

const ViewAll = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [data, setData] = useState([]);
  const [datajtbd, setDatajtbd] = useState([]);
  let history = useHistory();
  let projectID = useParams().projectID;
  useEffect(() => {
    getuserStory();
    getjtbd();
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

  const getjtbd = async () => {
    let api =
      "http://localhost:3001/api/jtbd/get-jtbd/projectId/" + `${projectID}`;
    axios
      .get(api, {
        headers: { authtoken: `${user}` },
      })
      .then((res) => {
        console.log(res.data);
        setDatajtbd(res.data);
      });
  };
  const historyView = (id, name) => {
    let path = history.location.pathname;
    if (path[path.length - 1] !== "/") path += "/";

    path += name;
    history.push(path + id);
  };

  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  return (
    <div className="container mt-3">
      <div className="table-data">
        <h5>All Requirements</h5>
        <table className="table border shadow center mt-0">
          <thead className="thead-light">
            <tr>
              <th scope="col">Requirement</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Priority</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, data.length).map((user, index) => (
              <tr key={index}>
                <th scope="row">Req: {index + 1}</th>
                <td
                  className="story__title"
                  onClick={() => historyView(user._id, "")}
                >
                  {user.storyDetails.storyTitle}
                </td>
                <td>{user.storyDetails.date}</td>
                <td className="text-danger">{user.storyDetails.priority}</td>
                <td>
                  <Link className=" mr-2" to={`/users/${user.id}`}>
                    <BiDotsVerticalRounded />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

          <tbody>
            {datajtbd.slice(0, datajtbd.length).map((user, index) => (
              <tr key={index}>
                <th scope="row">JTBD: {index + 1}</th>
                <td
                  className="story__title"
                  onClick={() => historyView(user._id, "jtbd/")}
                >
                  {user.JobTobeDone.description}
                </td>
                <td>{100}</td>
                <td className="text-danger">{user.JobTobeDone.priority}</td>
                <td>
                  <Link className=" mr-2" to={`/users/${user.id}`}>
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

export default ViewAll;
