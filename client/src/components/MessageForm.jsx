
import React, {useState, useEffect} from "react";
import io from "socket.io-client";

function MessageForm(props) {
  // connection to backend server
    const [socket] = useState( () => io(":8000") );
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    // const [updated, setUpdated] = useState(false);



    useEffect(() => {
        console.log("Is this on?")
        socket.on("send chat", inputMessage => {
            setMessages(prevMessages => {return [...prevMessages, inputMessage]});
        })
        // optional space for extra components
        },[]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        socket.emit("chat", {user:props.user, message:input});
        // setUpdated(!updated);
        setInput("");
    }

    const onChangeHandler = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    }

    return (
    <div className="messageFormDiv">
            {
                messages.slice(0).reverse().map((msg, i) => {
                return <div className="messageBox" key={i}><h3 ><span className="userSpan">{msg.user}: </span>{msg.message}</h3></div>
            })
                }
        <form className="fixedForm" onSubmit={onSubmitHandler}>
            <input className="nameInput" type="text" name="message" autoComplete="off" value={input} onChange={onChangeHandler}/>
            <input className="submitBtn" type="submit" value="submit"/>
        </form>
    </div>
    );
}

export default MessageForm;