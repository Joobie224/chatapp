import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

function App() {
  // I want to connect to the socket.io server

  // this sends a connection request to your socket io server
  // but your backend is not listening to any connection requests yet
  const socket = io("https://chatappbackend-zra5.onrender.com");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("allMessages", (data) => {
      setMessages(data);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    // emit an event to the socket server
    // emit takes 2 args:
    // 1. the event name
    // 2. the data you want to pass through
    socket.emit("sendMessage", message);
    setMessage("");
  };

  // terms for socket:
  // 1. emit - send message
  // 2. ON - listening to message
  // you can use these anywhere

  return (
    <>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button>Send Message</button>
      </form>
    </>
  );
}

export default App;
