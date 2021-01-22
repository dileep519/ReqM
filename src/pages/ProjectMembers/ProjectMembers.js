import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.css";
import { UserContext } from "./../../context/userContext/userContext";

import "./style.css";

const ProjectMembers = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [data, setData] = useState([]);
  let history = useHistory();
  let projectID = useParams().projectID;

  useEffect(() => {
    getNames();
  }, []);

  const getNames = async () => {
    let api = "http://localhost:3001/api/project/get-all-projects";
    let NAMES = [];
    try {
      let res = await axios.get(api, { headers: { authtoken: `${user}` } });
      // iterating over all projects
      for (let i = 0; i < res.data.length; i++) {
        if (projectID === res.data[i]._id) {
          let useAsso = res.data[i].usersAssociated;
          //  console.log(useAsso);
          try {
            let allusers = await axios.get(
              "http://localhost:3001/api/user/get-all-users",
              {
                headers: { authtoken: `${user}` },
              }
            );
            // console.log(allusers);
            for (let j = 0; j < useAsso.length; j++) {
              for (let k = 0; k < allusers.data.length; k++) {
                if (useAsso[j] == allusers.data[k].email) {
                  NAMES.push(allusers.data[k].name);
                  break;
                }
              }
            }
          } catch (error) {
            window.alert(error);
            history.push("/");
          }
        }
      }
      console.log(NAMES);
      setData(NAMES);
    } catch (error) {
      window.alert(error);
      history.push("/");
    }

    /* 
      .then((res) => {
        //console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (projectID === res.data[i]._id){
            setData(res.data[i].usersAssociated);
          }
        }
      })
      .catch((e) => {
        window.alert(e);
        history.push("/");
      });
      */
  };
  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  return (
    <div className="container mt-3">
      <div className="table-data">
        <h5>All Members</h5>
        <table className="table border shadow center mt-0">
          <thead className="thead-light">
            <tr>
              <th scope="col">Names</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, data.length).map((user, index) => (
              <tr key={index}>
                <th scope="row">{user}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectMembers;
