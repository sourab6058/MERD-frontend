import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import NavTwo from "../NavTwo";
import ContactUs from "./pages/contactus";
import Login from "./pages/login";

import "../../css/WebChat.css";

function App() {
  const [state, setState] = useState({ message: "", name: "", room:"" });
  const [chat, setChat] = useState([]);
  const [chatClicked, setChatClicked] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const socketRef = useRef();

  let serverLink = "http://3.108.159.143:4000";
  serverLink = "http://localhost:4000";

  useEffect(() => {
    socketRef.current = io.connect(serverLink, {
      reconnect: true,
    });
    socketRef.current.on("message", (chats) => {
      console.log(chats)
      setChat(chats);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const { name, message } = state;
    socketRef.current.emit("message", state.message);
    socketRef.current.emit("joinRoom", {username: state.name, room:state.room});
    console.log(state)
    setState({ message: "", name, room:"" });
  };

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  function handleChatClicked(){
    setChatClicked(true);
  }

  function handleLoginClicked(){
    setOpenLogin(true);
  }

  const chatForm=(<div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <div>
          <TextField
            name="room"
            onChange={(e) => onTextChange(e)}
            value={state.room}
            id="outlined-multiline-static"
            variant="outlined"
            label="Room"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>)

  return (
    <>
    <NavTwo/>
    {openLogin&&<Login/>}
    {chatClicked && !openLogin?chatForm:(<ContactUs handleLoginClicked={handleLoginClicked}/>)}
    </>
  );
}

export default App;
