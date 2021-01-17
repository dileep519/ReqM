import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.css";

import "./style.css";

const ViewAll = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };
  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  return (
    <div className="container mt-3">
      <div className="table-data">
        <h5>All Requirements</h5>
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
            {users.slice(0, 10).map((user, index) => (
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

export default ViewAll;
