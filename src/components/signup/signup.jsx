import React, { useState } from 'react';
import validator  from 'validator';
import alert from 'alert';
import './signup.css';

const Signup=()=>{

    const [name,setName]=useState(()=>"");
    const [email,setEmail]=useState();
    const [password,setPassword]=useState(()=>"")

    const handleClick=(event)=>{
        if(event.target.id=='name'){
            setName(event.target.value);
        }else if(event.target.id=='email'){
            
            setEmail(event.target.value);
        }else{
            setPassword(event.target.value);
        }
    }

    const handleSignup=(e)=>{
        const value=validator.isEmail(email);
        if(!value){
            alert('Please enter valid email');
        }
        console.log("Out put after clicking signup is....",name);
        console.log("Password",password);
        console.log("email",email);
    }

    return(
        <div className="signUpPage">
                <span className="signUpProdName">ReqM !</span>
                <div className="signUpSubContainer">
                    <div className="signUpInputContainer" >
                        <span className="signUpInfo">Create New Account</span>
                        <input id="name" onChange={handleClick} className="signupInput" type="text" placeholder="Name"  value={name}/>
                        <input id="email" onChange={handleClick} className="signupInput" type="email" placeholder="Work EmailId" value={email}/>
                        <input id="password" onChange={handleClick} className="signupInput" type="password" placeholder="Password" value={password}/>
                    </div>
                    <div>
                        <span>Select your avatar</span>
                    </div>
                    <button className="signUpButton" onClick={handleSignup}>Sing Up</button>
                </div>
        </div>
    );
}

export default Signup;