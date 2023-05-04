import React, { useEffect, useState } from "react";
import API from "../helpers/api";
import { Apis } from "../services/apiPaths";

function Chatpage() {
  const [chats, setChats] = useState([]);
  const fetchData = async () => {
    const data = await API.get(Apis.chats);

    setChats(data?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{chats}</div>;
}

export default Chatpage;
