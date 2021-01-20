import React, { useState } from "react";
import validator from "validator";
import "./signup.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import ProductSquad from "../../shared/images/Group 2004.png";
import Business from "../../shared/images/Group 2005.png";
import CustomerSupport from "../../shared/images/Group 2006.png";
import bcrypt from "bcryptjs";
import { Base64 } from "js-base64";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

const Signup = () => {
  const [name, setName] = useState(() => "");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState(() => "");
  const [verifyPassword, setVerifyPassword] = useState(() => "");
  const [selectedImg, setSelectedImg] = useState();
  const [loader, setLoader] = useState(false);

  const handleClick = (event) => {
    if (event.target.id == "name") {
      setName(event.target.value);
    } else if (event.target.id == "email") {
      setEmail(event.target.value);
    } else if (event.target.id == "password") {
      setPassword(event.target.value);
    } else {
      setVerifyPassword(event.target.value);
    }
  };

  const handleSignup = async (e) => {
    if (name && email && password && verifyPassword && selectedImg) {
      const value = validator.isEmail(email);
      if (!value) {
        Swal.fire({
          title: "Invalid Email",
          text: "Please enter a valid email",
          icon: "warning",
        });
        return;
      }

      if (password !== verifyPassword) {
        Swal.fire({
          title: "Passwords Mismatch",
          text: "Passwords didn't match. Try again.",
          icon: "warning",
        });
        return;
      }
      try {
        setLoader(true);
        let hashPwd = password;
        hashPwd = await bcrypt.hash(password, 10);
        let code;
        if (selectedImg == "business") {
          code = Base64.encode(Business);
        } else if (selectedImg == "product") {
          code = Base64.encode(ProductSquad);
        } else {
          code = Base64.encode(CustomerSupport);
        }
        axios
          .post("http://localhost:3001/api/user/register", {
            name,
            email,
            password: hashPwd,
            profilePhoto: code,
          })
          .then((res) => {
            setLoader(false);
            if (res.data && res.data.message) {
              setEmail("");
              setName("");
              setPassword("");
              setVerifyPassword("");
              setSelectedImg("");
              Swal.fire({
                title: "Success",
                text: `${res.data.message}`,
                icon: "success",
              });
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
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: `${err}`,
          icon: "error",
        });
      }
    } else {
      if (!name || !email || !password || !verifyPassword) {
        Swal.fire({
          title: "Warning",
          text: "Please Fill All the fields",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "Warning",
          text: "Please Select Avatar",
          icon: "warning",
        });
      }
    }
  };

  const handleImageClick = (e) => {
    setSelectedImg(e.target.id);
  };

  return (
    <>
      <div className="signUpPage">
        <div className="imageContainer">
          <div className="firstHalfBody">
            <span className="companyName">ReqM !</span>
            <div className="optionsConatiner">
              <span>→ Add Members</span>
              <span>→ Create Requirements</span>
              <span>→ Triage & Monitor</span>
            </div>
          </div>
          <div className="firstHalfFooter">
            <NavLink to="/about" className="link-inside-container">
              About
            </NavLink>
            <NavLink to="/privacy" className="link-inside-container">
              Privacy
            </NavLink>
            <NavLink to="/terms" className="link-inside-container">
              Terms
            </NavLink>
          </div>
        </div>
        <div className="signupContainer">
          {loader ? <LinearProgress color="primary" /> : <></>}
          <span className="signupHeading">Signup</span>
          <div className="signUpSubContainer">
            <div className="signUpInputContainer">
              <span className="inputLabel">Name</span>
              <input
                id="name"
                onChange={handleClick}
                className="signupInput"
                type="text"
                placeholder="Name"
                value={name}
              />
              <span className="inputLabel">Email</span>
              <input
                id="email"
                onChange={handleClick}
                className="signupInput"
                type="email"
                placeholder="Work EmailId"
                value={email}
              />
              <span className="inputLabel">Password</span>
              <input
                id="password"
                onChange={handleClick}
                className="signupInput"
                type="password"
                placeholder="Enter password"
                value={password}
              />
              <span className="inputLabel">Repeat Password</span>
              <input
                id="repassword"
                onChange={handleClick}
                className="signupInput"
                type="password"
                placeholder="Re-enter password"
                value={verifyPassword}
              />
            </div>
            <div className="signUpImageContainer">
              <span>Select your avatar</span>
              <div className="signupImages">
                <img
                  id="product"
                  style={
                    selectedImg == "product"
                      ? { border: "1px solid black" }
                      : {}
                  }
                  onClick={handleImageClick}
                  src={ProductSquad}
                  className="individualImage"
                />
                <img
                  id="business"
                  style={
                    selectedImg == "business"
                      ? { border: "1px solid black" }
                      : {}
                  }
                  onClick={handleImageClick}
                  src={Business}
                  className="individualImage"
                />
                <img
                  id="customer"
                  style={
                    selectedImg == "customer"
                      ? { border: "1px solid black" }
                      : {}
                  }
                  onClick={handleImageClick}
                  src={CustomerSupport}
                  className="individualImage"
                />
              </div>
            </div>
            <div className="signUpContainer">
              <button className="signUpButton" onClick={handleSignup}>
                Sing Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
