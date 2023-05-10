import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <Box display="flex" justifyContent="center">
      <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
        <Button variant="ghost">
          <i className="fas fa-search" />
          <Text display={{ base: "none", md: "flex" }} px="4">
            Search Users
          </Text>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
