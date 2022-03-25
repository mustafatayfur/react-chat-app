import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
// import NotificationBadge from "react-notification-badge";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false)
  const toast = useToast()
  

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const URL = "https://77ab-31-223-82-2.ngrok.io/api"

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      };

      const { data } = await axios.get(`${URL}/user?search=${search}`, config);
      console.log(data)
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
      };
      const { data } = await axios.post(`${URL}/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  return (
    <>
    <Box
    d="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
  >
    <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
      <Button variant="ghost" onClick={onOpen}>
        <i className="fas fa-search"></i>
        <Text d={{ base: "none", md: "flex" }} px={4}>
          Search User
        </Text>
      </Button>
    </Tooltip>
    <Text fontSize="2xl" fontFamily="Work sans">
      Chat-OE
    </Text>
    <div>
      <Menu>
        <MenuButton p={1}>
              {/*<NotificationBadge
            count={notification.length}
            
          />*/}
          <BellIcon fontSize="2xl" m={1} />
        </MenuButton>
        <MenuList pl={2}>
          {/*{!notification.length && "No New Messages"}
          {notification.map((notif) => (
            <MenuItem
              key={notif._id}
              onClick={() => {
                setSelectedChat(notif.chat);
                setNotification(notification.filter((n) => n !== notif));
              }}
            >
              {notif.chat.isGroupChat
                ? `New Message in ${notif.chat.chatName}`
                : `New Message from ${getSender(user, notif.chat.users)}`}
            </MenuItem>
          ))}*/}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
          <Avatar
            size="sm"
            cursor="pointer"
            name={user.name}
            src={user.pic}
          />
        </MenuButton>
        <MenuList>
          <ProfileModal user={user}>
            <MenuItem>My Profile</MenuItem>{" "}
          </ProfileModal>
          <MenuDivider />
          <MenuItem onClick={logoutHandler} >Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  </Box>
  <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
    <DrawerBody>
      <Box d="flex" pb={2}>
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
            key={user.access_token}
            user={user}
            handleFunction={() => accessChat(user.access_token)}
          />
        ))
      )}
      {loadingChat && <Spinner ml="auto" d="flex" />}
    </DrawerBody>
  </DrawerContent>
</Drawer>
    </>
  )
}

export default SideDrawer