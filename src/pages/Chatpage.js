import React, { useEffect, useState } from "react";
import API from "../helpers/api";

function Chatpage() {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const data = await API.get("/api/");

    setChats(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{chats}</div>;
}

export default Chatpage;
