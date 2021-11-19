import "./App.css"
import {BrowserRouter, Route} from "react-router-dom";
import MessageForm from './components/MessageForm';
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserDisplay from "./components/UserDisplay";

function App() {

  const [socket] = useState( () => io(":8000") );
  const [user, setUser] = useState("")
  const [userList, setUserList] = useState([])

  // const updateList = (userName) => {
  //   console.log("updating the list...")
  //   setUserList([...userList, userName])
  //   socket.emit("list", userList);
  // }
  const login = (userName) => {
    setUser(userName)
    socket.emit("login", userName)
  }

  useEffect( () => {
    socket.on("userList", list => {
      setUserList(list);
      console.log("user list: ", list);
  });
    return () => socket.disconnect(true);
  },[socket])
  
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flexBox">
          <Route exact path="/">
            <Login userList={userList} login={login} />
          </Route>
          <Route exact path="/chat">
            <MessageForm userList={userList} user={user}/>
            <UserDisplay className="userDisplay" users={userList}/>
          </Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
