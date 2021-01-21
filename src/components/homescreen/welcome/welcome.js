import React, { useContext, useState } from "react";
import "./welcome.css";
import WelcomePersonAddIcon from "@material-ui/icons/PersonAdd";
import Modal from "@material-ui/core/Modal";
import WelcomeAddBoxIcon from "@material-ui/icons/AddBox";
import {
  SettingsApplicationsRounded,
  SettingsInputAntenna,
  SwapCalls,
} from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";
import validator from "validator";
import { UserContext } from "./../../../context/userContext/userContext";
function Welcome() {
  const [projname, setProjName] = useState("");
  const [orgname, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [input, showInput] = useState(true);
  const [checked, setChecked] = useState(false);
  //this initialises the state to contain empty array
  const [users, setUsers] = useContext(UserContext).user;
  // const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  //const [modalStyle] = useState(getModalStyle);
  const handleClick = (event) => {
    if (event.target.id == "orgname") setOrgName(event.target.value);
    else if (event.target.id == "projname") setProjName(event.target.value);
    if (event.target.id == "email") setEmail(event.target.value);
    //console.log(event.target.id+
    //orgname+""+projname);
  };
  const toggleChecked = () => {
    console.log("git push show");
    setChecked((prev) => !prev);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    showInput(true);
    setEmail("");
    setOpen(false);
  };
  const handleContinue = () => {
    //console.log(projname+" "+orgname);
    if (!projname || !orgname) console.log("input both the fields");
    else {
      console.log(orgname + " " + projname + " " + users);
      //routing to the projects space page
    }
  };
  const handleEnter = (event) => {
    if (event.key == "Enter") {
      if (validator.isEmail(email)) {
        //validate
        setUsers(users.concat(email));
        setEmail("");
        showInput(false);
        console.log("in handle Enter func " + users);
      } else {
        Swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid Email",
          icon: "warning",
        });
      }
    }
  };
  const handleAddOnMain = () => {
    if (!projname || !orgname) {
      Swal.fire({
        title: "Fill all the fields",
        text: "Please enter all entries",
        icon: "warning",
      });
    } else {
      handleOpen();
    }
  };
  const onSaveClick = () => {
    handleClose();
    console.log(orgname + " " + projname + " " + users);
  };
  const handleAddOnModal = () => {
    if (input == false) {
      showInput(true);
    } else {
      Swal.fire({
        title: "Invalid Email",
        text: "Please Fill the email above",
        icon: "warning",
      });
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 44.84,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: "#E24429",
        "& + $track": {
          backgroundColor: " black",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: " #E24429",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: "#E24429",
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  const renderInput = (
    <div className="input-container">
      <span>Input Email Id</span>
      <input
        type="text"
        name="email"
        id="email"
        onChange={handleClick}
        onKeyDown={handleEnter}
        value={email}
      />
    </div>
  );
  const body = (
    <div className="dialog-container">
      {input ? renderInput : <div></div>}
      <div className="add-container">
        <div id="addicon" onClick={handleAddOnModal}>
          <WelcomeAddBoxIcon />
        </div>
        <span className="wlc_span">Add More Members</span>
      </div>
      <h1 className="wlc_collab">Collaborators can</h1>
      <div id="switch">
        <span style={{ color: "black" }}>Add more people</span>
        {/*switch button here*/}
        <FormControlLabel
          className="btn-switch"
          control={
            <IOSSwitch
              size="Normal"
              checked={checked}
              onChange={toggleChecked}
            />
          }
        />
      </div>
      <div className="btn-save">
        <button className="save-btn" onClick={onSaveClick}>
          {" "}
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div className="wrapper">
      <header className="page-header">
        <nav>
          <h2 className="logo">ReqM!</h2>
          <ul>
            <li>Features</li>
            <li>Pricing</li>
            <li>Company</li>
            <li>Blog</li>
          </ul>
        </nav>
      </header>
      <main class="page-main">
        <div>
          <h1>Welcome Divesh!</h1>
          <h3>Add a new Project and Maintain Requirements Within</h3>
        </div>
        <form className="wlc_form" action="">
          <label className="wlc_label" for="orgname">Organisation Name</label>

          <input
            className="fieldinput"
            type="text"
            id="orgname"
            onChange={handleClick}
            name="orgname"
            placeholder="abc.org"
            value={orgname}
          />

          <label className="wlc_label" for="projname">Project Name</label>

          <input
            className="fieldinput"
            type="text"
            id="projname"
            onChange={handleClick}
            name="projectname"
            placeholder="Smart Watch Application"
            value={projname}
          />

          <section id="amu">
            {/*<p>{isDialogOpen}</p>*/}
            <WelcomePersonAddIcon onClick={handleAddOnMain} />
            <span className="amu_wlc_span">Add More Users</span>
            <Modal open={open} onClose={handleClose} style={customStyles}>
              {body}
            </Modal>
          </section>
          <button className="btn-continue" onClick={handleContinue}>
            Continue
          </button>
        </form>
      </main>
    </div>
  );
}
export default Welcome;
