import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

import { UserContext } from "./../../context/userContext/userContext";

export default function EditJTBD() {
  let projectID = useParams().projectID;
  let storyID = useParams().storyID;
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext).user;
  const [id, setID] = useState();
  const [formData, setFormData] = useState({
    description: "",
    persona: "",
    situation: "",
    whatiwant: "",
    soican: "",
    assignTo: "",
    details: "",
    watchlist: "",
    providedBy: "",
    mode: "",
    priority: "",
  });
  const [story, setStory] = useState(1);
  const {
    description,
    persona,
    situation,
    whatiwant,
    soican,
    assignTo,
    details,
    watchlist,
    providedBy,
    mode,
    priority,
  } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let api =
      "http://localhost:3001/api/jtbd/get-jtbd/projectId/" + `${projectID}`;
    axios
      .get(api, {
        headers: { authtoken: `${user}` },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]._id === storyID) {
            //console.log(res.data[i]);
            let Details = {
              description: res.data[i].JobTobeDone.description,
              persona: res.data[i].JobTobeDone.persona,
              situation: res.data[i].JobTobeDone.situation,
              whatiwant: res.data[i].JobTobeDone.whatiwant,
              soican: res.data[i].JobTobeDone.soican,
              assignTo: res.data[i].JobTobeDone.assignTo,
              details: res.data[i].JobTobeDone.details,
              watchlist: res.data[i].JobTobeDone.watchlist,
              providedBy: res.data[i].JobTobeDone.providedBy,
              mode: res.data[i].JobTobeDone.mode,
              priority: res.data[i].JobTobeDone.priority,
            };
            // console.log(Details);
            // console.log(res.data[i].storyDetails);
            setFormData({ ...Details });
          }
        }
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let api = "http://localhost:3001/api/jtbd/update-jtbd/" + `${storyID}`;
    let story_Details = {
      description: description,
      persona: persona,
      situation: situation,
      whatiwant: whatiwant,
      soican: soican,
      assignTo: assignTo,
      details: details,
      watchlist: watchlist,
      providedBy: providedBy,
      mode: mode,
      priority: priority,
    };
    //console.log(story_Details);
    //validation
    //console.log(story_Details);
    const data = {
      project_id: projectID,
      story_details: story_Details,
    };
    try {
      let p = await axios.put(api, data, {
        headers: {
          authtoken: `${user}`,
        },
      });
      setOpen(true);
      setID(p.data.story);
      //console.log(p.data.story);
      // /console.log(message);
    } catch (e) {
      window.alert("Something went Wrong");
    }
  };
  let history = useHistory();

  //###########################     Change #######################
  const PushViewSumeery = () => {
    let path = history.location.pathname.split("edit")[0];
    //path += "/viewall/jtbd/" + id;
    history.push(path);
    //console.log(id);
  };

  let className1 = "story_1";
  let className2 = "story_2";
  //console.log(story);
  if (story === 1) {
    className1 += " " + "active";
    className2 += " " + "nonactive";
  } else {
    className1 += " nonactive";
    className2 += " active";
  }

  return (
    <div className="userStory__container">
      <Modal isOpen={open} className="viewSummery__modal">
        <div className="viewSummery">
          <p>Requirement Title has been succesfully Updated !!</p>
          <Button variant="outlined" color="primary" onClick={PushViewSumeery}>
            View Summery
          </Button>
        </div>
      </Modal>
      <div className={className1}>
        <div>
          <form className="form">
            <div className="container has-box">
              <div className="form-group">
                <h2>Base details</h2>
                <b>Description</b>
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>Persona</b>
                <input
                  type="text"
                  name="persona"
                  value={persona}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
            </div>
            <div className="container has-box">
              <div className="form-group">
                <h2>Job to Be Done</h2>
                <b>Situation</b>
                <input
                  type="text"
                  name="situation"
                  value={situation}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>What I Want</b>
                <input
                  type="text"
                  name="whatiwant"
                  value={whatiwant}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>So I can</b>
                <input
                  type="text"
                  name="soican"
                  value={soican}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
            </div>
            <div className="container">
              <div className="btn btn-primary " onClick={() => setStory(2)}>
                Next
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={className2}>
        <div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="container has-box">
              <div className="form-group">
                <b>Assign To</b>
                <input
                  type="text"
                  name="assignTo"
                  value={assignTo}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                  required
                />
              </div>
              <div className="form-group">
                <b>Additional Details</b>
                <input
                  type="text"
                  name="details"
                  value={details}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                  required
                />
              </div>
              <input type="checkbox" name="watchlist" value={watchlist} />
              <span> Add to watchlist </span>
            </div>
            <div className="container has-box">
              <div className="form-group">
                <b>Provide By</b>
                <input
                  type="text"
                  name="providedBy"
                  value={providedBy}
                  onChange={(e) => onChange(e)}
                  required
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>Mode</b>
                <input
                  type="text"
                  name="mode"
                  value={mode}
                  onChange={(e) => onChange(e)}
                  required
                  className="inpt-box"
                />
                <br></br>
                <div>
                  <b>Priority</b>
                  <input
                    type="radio"
                    name="priority"
                    onClick={() =>
                      setFormData({ ...formData, priority: "High" })
                    }
                  />
                  <b>High</b>
                  <input
                    type="radio"
                    name="priority"
                    onClick={() =>
                      setFormData({ ...formData, priority: "Medium" })
                    }
                  />
                  <b>Medium</b>
                  <input
                    type="radio"
                    name="priority"
                    onClick={() =>
                      setFormData({ ...formData, priority: "Low" })
                    }
                  />
                  <b>Low</b>
                </div>
              </div>
            </div>
            <div className="container">
              <button className="btn btn-primary" onClick={onSubmit}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
