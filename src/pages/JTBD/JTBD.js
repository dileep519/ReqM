import React, { useState } from "react";
import "./style.css";
import Modal from "react-modal";
import Button from "@material-ui/core/Button";

export default function JTBD() {
  const [open, setOpen] = useState(false);
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
    priority: "low",
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

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  let className1 = "story_1";
  let className2 = "story_2";
  console.log(story);
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
          <p>Requirement Title has been succesfully captured !!</p>
          <Button variant="outlined" color="primary">
            View Summery
          </Button>
        </div>
      </Modal>
      <div className={className1}>
        <div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="container has-box">
              <div className="form-group">
                <h2> Base Details</h2>
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
                <h2>Job To Be Done</h2>
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
                <b>What I want</b>
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
      {/* Form-2*/}
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
                    value="high"
                    onChange={(e) => onChange(e)}
                  />
                  <b>High</b>
                  <input
                    type="radio"
                    name="priority"
                    value="medium"
                    onChange={(e) => onChange(e)}
                  />
                  <b>Medium</b>
                  <input
                    type="radio"
                    name="priority"
                    value="low"
                    onChange={(e) => onChange(e)}
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
