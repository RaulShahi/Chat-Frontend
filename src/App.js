import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { ChatContext } from "./context/ChatProvider";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo?.user);
    setToken(userInfo?.token);

    if (!userInfo) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        token,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
      }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<Chatpage />} />
        </Routes>
      </div>
    </ChatContext.Provider>
  );
}

export default App;
