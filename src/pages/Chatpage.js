import React, { useContext, useEffect, useState } from "react";
import API from "../helpers/api";
import { Apis } from "../services/apiPaths";
import { ChatContext } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/Chat/MyChats";
import Chatbox from "../components/Chat/Chatbox";

function Chatpage() {
  const { user, setUser } = useContext(ChatContext);
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        p="10px"
        h="91.5vh"
        w="100%"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default Chatpage;
