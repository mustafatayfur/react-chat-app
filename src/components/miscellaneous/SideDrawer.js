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
import { URL } from '../../config/ChatLogics'

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
    setChatUser    
  } = ChatState();
  console.log("SideDrawwer-chats",chats)
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const accessChat = async (result) => {
    const selectedChats = []
    setLoadingChat(true);
    selectedChats.push(result)
    console.log(selectedChats)
    setChats([selectedChats, ...chats])
    setLoadingChat(false);
    onClose();
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
        searchResult?.map((result) => (
           <UserListItem
            key={result.id}
            result={result}
            handleFunction={() => accessChat(result)}
            onClick={setChatUser(result)}
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