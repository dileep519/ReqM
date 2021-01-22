import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { GoDiffAdded } from "react-icons/go";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IconContext } from "react-icons";
import "bootstrap/dist/css/bootstrap.css";

import "./style.css";
import { UserContext } from "./../../context/userContext/userContext";

const ParticularPageProject = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [data, setData] = useState([]);
  const [priority, setPriority] = useState(0);
  const [assigned, setAssigned] = useState(0);
  const [loged, setLoged] = useState(0);

  //  const [assignedStory, setAssignedStory] = useState(0);
  //  const [assignedjtbd, setAssignjtbd] = useState(0);
  //  const [loged, setLoged] = useState(0);
  //  const [priority, setPriority] = useState(0);
  //  const [jtbdloged, setJtbdloged] = useState(0);
  //  const [jtbdpriority, setJtbdPriority] = useState(0);
  //  const [pri, setPri] = useState(0);
  //  const [assi, setAssi] = useState(0);

  let projectID = useParams().projectID;
  useEffect(async () => {
    //getuserStory();
    //getAssignStory();
    //getAssignjtbd();
    //getloged();
    //getjtbd();
    //// get Assin();
    //getAssin();
    getAll();
  }, [projectID]);

  const getAll = async () => {
    let email = JSON.parse(localStorage.getItem("email"));
    let len1 = 0;
    let len2 = 0;
    let p = 0;
    let tome = 0;
    let api1 =
      "http://localhost:3001/api/story/get-stories/projectId/" + `${projectID}`; // this is to get all userstory created by user
    let api2 =
      "http://localhost:3001/api/jtbd/get-jtbd/projectId/" + `${projectID}`; // this is to get all jtbd created by user

    // getting all the project stories by project ID;
    try {
      let userStorys = await axios.get(api1, {
        headers: { authtoken: `${user}` },
      });
      let userjtbds = await axios.get(api2, {
        headers: { authtoken: `${user}` },
      });

      len1 = userStorys.data.length;
      len2 = userjtbds.data.length;

      // getting all the priority and assignTome of userstorys
      for (let i = 0; i < userStorys.data.length; i++) {
        if (userStorys.data[i].storyDetails.priority === "High") p++;
        if (userStorys.data[i].storyDetails.actionAssignedTo === email) tome++;
      }
      // getting all the priority and assignTome of jtbd
      for (let i = 0; i < userjtbds.data.length; i++) {
        if (userjtbds.data[i].JobTobeDone.priority === "High") p++;
        if (userjtbds.data[i].JobTobeDone.actionAssignedTo === email) tome++;
      }

      setData(userStorys.data);
      setPriority(p);
      setAssigned(tome);
      setLoged(len1 + len2);

      //console.log(userStorys);
      //console.log(userjtbds);
    } catch (error) {
      window.alert(error);
      history.push("/");
    }
  };

  /*
  const getuserStory = async () => {
    let api =
      "http://localhost:3001/api/story/get-stories/projectId/" + `${projectID}`;
    axios
      .get(api, {
        headers: { authtoken: `${user}` },
      })
      .then((res) => {
        //console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        history.push("/error");
        window.alert("Server is not Working!!");
      });
  };
  const getloged = async () => {
    let cnt = 0;
    let story = 0;
    let apis =
      "http://localhost:3001/api/story/get-stories/projectId/" + `${projectID}`;
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
      history.push("/error");
      window.alert("Server is not Working");
    }

    //console.log(cnt);
    //console.log(story);
    setPriority(cnt);
    setLoged(story);
  };

  const getjtbd = async () => {
    let api = "http://localhost:3001/api/project/get-projects";

    let cnt = 0;
    let story = 0;

    let apis =
      "http://localhost:3001/api/jtbd/get-jtbd/projectId/" + `${projectID}`;
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
      history.push("/error");
      window.alert("Server is not Working");
    }

    setJtbdloged(story);
    setJtbdPriority(cnt);
  };

  const getAssignStory = () => {
    let email = JSON.parse(localStorage.getItem("email"));
    let API = "http://localhost:3001/api/story/get-all-assigned";
    const Cre = {
      email: email,
    };
    axios.post(API, Cre, { headers: { authtoken: `${user}` } }).then((res) => {
      //console.log(res.data);
      setAssignedStory(res.data.length);
    });
  };

  const getAssignjtbd = () => {
    let email = JSON.parse(localStorage.getItem("email"));
    let API = "http://localhost:3001/api/jtbd/get-all-assigned";
    const Cre = {
      email: email,
    };
    axios.post(API, Cre, { headers: { authtoken: `${user}` } }).then((res) => {
      // console.log(res.data);
      setAssignjtbd(res.data.length);
    });
  };

  const getAssin = async () => {
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
        if (res1.data[i].projectId === projectID) {
          // getting all the priority
          if (res1.data[i].JobTobeDone.priority === "High") p++;
          // getting all jtbd
          len1++;
        }
      }
    } catch (error) {
      window.alert(error);
      history.push("/");
      return;
    }
    try {
      let res2 = await axios.get(api2, {
        headers: { authtoken: `${user}` },
      });
      for (let i = 0; i < res2.data.length; i++) {
        if (res2.data[i].projectId === projectID) {
          // getting all the priority
          if (res2.data[i].JobTobeDone.priority === "High") p++;
          // getting all jtbd
          len2++;
        }
      }
    } catch (error) {
      window.alert(error);
      history.push("/");
      return;
    }

    setPri(p);
    setAssi(len1 + len2);
  };

  //getAssignjtbd();
  //getAssignStory();
  //getuserStory();
  const PriorityHigh = (data) => {
    let cnt = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].storyDetails.priority === "High") cnt++;
    }

    return cnt;
  };
*/
  const obj = {
    view: false,
  };
  const hStyle = { color: "grey" };

  // to redirect the route
  let history = useHistory();
  let path = history.location.pathname;
  if (path[path.length - 1] !== "/") path += "/";
  // clicking pushing the history of adduserstory
  const pushReq = () => {
    history.push(path + "addreq");
  };

  // clicking pushing the history of viewall

  const pushHistoryView = () => {
    history.push(path + "viewall");
  };
  const historyView = (id) => {
    let path = history.location.pathname;
    if (path[path.length - 1] !== "/") path += "/";
    path += "viewall/";
    history.push(path + id);
  };

  return (
    <div className="container mt-3">
      <div className="box" onClick={pushReq}>
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
          <h3 className="content-align">{/*loged + jtbdloged*/ loged}</h3>
        </div>
        <div className="card-container">
          <p className="text-cordinate">Priority Requirement</p>
          <h3 className="content-align-p">
            {/*priority + jtbdpriority*/ priority}
          </h3>
        </div>
        <div className="card-container">
          <p className="text-cordinate">Assigned To Me</p>
          <h3 className="content-align">{/*assi*/ assigned}</h3>
        </div>
      </div>
      <div className="table-data">
        <div className="box">
          <h5 className="box2">Recent Requirements</h5>
          <h6 style={hStyle} className="box1" onClick={pushHistoryView}>
            View All
          </h6>
        </div>
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
            {data.slice(0, 3).map((user, index) => (
              <tr key={index}>
                <th scope="row">Req: {index + 1}</th>
                <td
                  onClick={() => historyView(user._id)}
                  className="story__title"
                >
                  {user.storyDetails.storyTitle}
                </td>
                <td>{100}</td>
                <td className="text-danger">{user.storyDetails.priority}</td>
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

export default ParticularPageProject;
