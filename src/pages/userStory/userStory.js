import React, { useState } from "react";
import "./style.css";
export default function Userstory() {
  const [formData, setFormData] = useState({
    title: "",
    role: "",
    want: "",
    soThat: "",
    assignTo: "",
    details: "",
    watchlist: "",
    providedBy: "",
    mode: "",
    priority: "",
  });
  const [story, setStory] = useState(1);
  const {
    title,
    role,
    want,
    soThat,
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
      <div className={className1}>
        <div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="container has-box">
              <div className="form-group">
                <h2>User Story role</h2>
                <b>Story Title</b>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>As a</b>
                <input
                  type="text"
                  name="role"
                  value={role}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
            </div>
            <div className="container has-box">
              <div className="form-group">
                <h2>Action to Be Done</h2>
                <b>I Want To</b>
                <input
                  type="text"
                  name="want"
                  value={want}
                  onChange={(e) => onChange(e)}
                  className="inpt-box"
                />
              </div>
              <div className="form-group">
                <b>So That</b>
                <input
                  type="text"
                  name="soThat"
                  value={soThat}
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
                  <input type="radio" name="priority" />
                  <b>High</b>
                  <input type="radio" name="priority" />
                  <b>Medium</b>
                  <input type="radio" name="priority" />
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
