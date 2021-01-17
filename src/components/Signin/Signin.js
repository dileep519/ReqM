import React,{useState} from 'react';
import validator  from 'validator';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import './signin.css';


const Signin=()=>{

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleInput=(e)=>{
        if(e.target.id=="email"){
            setEmail(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }

    const handleSignIn=async ()=>{
        if(validator.isEmail(email)){
            let hashPwd=password;
            hashPwd=await bcrypt.hash(password,10);
            console.log(password);
        }else{
            Swal.fire({
                title:"Email Invalid",
                text:"Please Enter Valid Email",
                icon:'warning'
            })
        }
    }

    return(
        <div className="parentConatiner">
            <div className="headerContainerSignIn" >

                <span className="signinOptions">About</span>
                <span  className="signinOptions">Privacy</span>
                <span  className="signinOptions">Terms</span>
            </div>
            <div className="signinBody">
                <span className="companyName signinReqm">ReqM !</span>
                <div className="signinBox">
                    <div className="signInContent">
                        <span className="signInHeading">SignIn</span>
                        <span className="singinMessage">Welcome we miss you</span>
                        <input type="email" className="signupInput" onChange={handleInput} id="email" placeholder="Email" value={email}/>
                        <input style={{marginTop:'10px'}} type="password" className="signupInput" onChange={handleInput}  id="password" placeholder="password" value={password}/>
                        <div className="rememberAndPassword">
                            <span>Remember me</span>
                            <span>Forgot Password</span>
                        </div>
                        <button className="singinButton" onClick={handleSignIn}>Singin</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;