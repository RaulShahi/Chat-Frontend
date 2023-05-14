import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import AXIOS from "../../helpers/api";
import { Apis } from "../../services/apiPaths";
import ChatLoading from "../Chat/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();

  const { user, token, setSelectedChat, chats, setChats } =
    useContext(ChatContext);

  const config = {
    headers: {
      Authorization: `Bear ${token}`,
    },
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/", { replace: true });
  };

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);

      const searchedUsers = await AXIOS.get(
        `${Apis.users}?search=${search}`,
        config
      );

      setLoading(false);
      setSearchResult(searchedUsers?.data);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Erro Occured!",
        description: "Failed to Load the Search Results",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  const accessChat = async (userId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoadingChat(true);
      const { data } = await AXIOS.post(`${Apis.chats}`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      setLoadingChat(false);
      toast({
        title: "Erro Fetching the Chat!",
        description: error.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search" />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work Sans">
          Talk-A-Tive
        </Text>
        <div style={{ display: "flex" }}>
          <Menu>
            <MenuButton>
              <BellIcon fontSize="2xl/" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  clickHandler={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
