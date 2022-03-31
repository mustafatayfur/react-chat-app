import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getSender } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import ChatLoading from './ChatLoading';
import GroupChatModal from './miscellaneous/GroupChatModal';
import { URL } from '../config/ChatLogics'

const MyChats = ({ fetchAgain }) => {

  const [loggedUser, setLoggedUser] = useState([]);
  console.log("loggedUser:",loggedUser)

  const { selectedChat, setSelectedChat, user, chats,setAllUsers, allUsers} = ChatState();
  console.log("Mychats-chats:",chats)
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          "Content-type" : "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
      };
      // const { data } = await axios.get(`${URL}/chat`, config);
      const { data } = await axios.get(`${URL}/chat/${1}`,config);
      console.log(data)
    } catch (error) {
      toast({
        title: "Error Occured! mychats",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const fetchUsers = async() => {
    const config = {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  };

  const { data } = await axios.get(`${URL}/user`, config);
  console.log("Users: ",data)
  setAllUsers(data)
  }
  

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    // fetchChats();
    fetchUsers()
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon/>}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
      {chats ? (
        <Stack overflowY="scroll">
          {chats.map((chat,key) => (
          
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={key}
            >
            
              <Text>
              { getSender(allUsers) }
              </Text>
          
            </Box>
          ))}
        </Stack>
      ) : (
        <ChatLoading />
      )}
      </Box>
      
      
    </Box>
    
  );
}

export default MyChats