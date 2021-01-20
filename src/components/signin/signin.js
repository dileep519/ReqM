import React, { useContext, useState } from "react";
import validator from "validator";
import Swal from "sweetalert2";
import "./signin.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserContext } from "./../../context/userContext/userContext";

const Signin = () => {
  const [user, setUser] = useContext(UserContext).user;
  var history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    if (e.target.id == "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSignIn = async () => {
    if (validator.isEmail(email)) {
      // console.log(password);
      axios
        .post("http://localhost:3001/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data && res.data.message) {
            localStorage.setItem(
              "auth_token",
              JSON.stringify(res.data.auth_token)
            );
            localStorage.setItem("Name", JSON.stringify(res.data.Name));
            localStorage.setItem("email", JSON.stringify(res.data.email));
            //console.log(res.data);
            setUser(res.data.auth_token);
            //console.log(res.data);
            setEmail("");
            setPassword("");
            history.push("/");
          } else {
            Swal.fire({
              title: "Error",
              text: `${res.data.error}`,
              icon: "error",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: `${err}`,
            icon: "error",
          });
        });
    } else {
      Swal.fire({
        title: "Email Invalid",
        text: "Please Enter Valid Email",
        icon: "warning",
      });
    }
    // let hashPwd=password;
    // hashPwd=await bcrypt.hash(password,10);
  };

  return (
    <div className="parentConatiner">
      <div className="headerContainerSignIn">
        <span className="signinOptions">About</span>
        <span className="signinOptions">Privacy</span>
        <span className="signinOptions">Terms</span>
      </div>
      <div className="signinBody">
        <span className="companyName signinReqm">ReqM !</span>
        <div className="signinBox">
          <div className="signInContent">
            <span className="signInHeading">SignIn</span>
            <span className="singinMessage">Welcome we miss you</span>
            <input
              type="email"
              className="signupInput"
              onChange={handleInput}
              id="email"
              placeholder="Email"
              value={email}
            />
            <input
              style={{ marginTop: "10px" }}
              type="password"
              className="signupInput"
              onChange={handleInput}
              id="password"
              placeholder="password"
              value={password}
            />
            <div className="rememberAndPassword">
              <span>Remember me</span>
              <span>Forgot Password</span>
            </div>
            <button className="singinButton" onClick={handleSignIn}>
              SignIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
