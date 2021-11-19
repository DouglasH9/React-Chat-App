import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import spyicon from "../imgs/spyicon.png"



const Login = (props) => {

    const [socket] = useState( () => io(":8000") );
    const [userName, setUserName] = useState("")
    
    const history = useHistory();
    // const {userName} = props;

    const submitHandler = (e) => {
        e.preventDefault();
        // const user = {userName};
        props.login(userName);
        history.push("/chat");


    }

    return(
        <div className="loginBox">
            <div className="flexBox">
                <img className="spy" src={spyicon} alt="spy icon" />
                <h1 className="welcome">Welcome to the Dead Drop! Please enter a screen name to start messaging!</h1>
                <img className="spy" src={spyicon} alt="spy icon" />
            </div>
            <form className="loginForm" onSubmit={submitHandler}>
                <label>Name: </label>
                <input className="nameInput" type="text" onChange={(e)=> {setUserName(e.target.value)}} />
                <input className="submitBtn" type="submit" value="submit" />
            </form>
            
        </div>
    )
}

export default Login;