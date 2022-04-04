import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import { getSenderFull, URL } from '../config/ChatLogics'
import { ArrowBackIcon } from '@chakra-ui/icons';
import ScrollableChat from './ScrollableChat'
import UpdateGroupChatModal from '../components/miscellaneous/UpdateGroupChatModal'
import ProfileModal from './miscellaneous/ProfileModal';
import './styles.css'


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState()
  const toast = useToast();

  const { selectedChat, setSelectedChat, user, chatUser, notification, setNotification } =
  ChatState();
  
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          "Content-type" : "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
      };
      const { data } = await axios.get(`${URL}/chat?userId=${selectedChat[0].id}`,config);
      console.log(data)
      setMessages([messages, ...data])
      // console.log(messages)

      // setChats([data, ...chats]);
      // setSelectedChat(data);
      
    } catch (error) {
      toast({
        title: "Error fetching the chat APİ",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    console.log(messages)
  };


  const sendMessage = async (event) => {
  if (event.key === "Enter" && newMessage){
    try {
      const config = {
        headers: {
          "Content-type" : "application/json",
          "Authorization": `Bearer ${user.access_token}`,
        },
      };
  
      setLoading(true);
      setNewMessage("")
      const { data } = await axios.post(`${URL}/chat`, {sender: user.user_id, receiver: selectedChat[0].id , content:newMessage},config);
      setNewMessage(data);
      setLoading(false);
      console.log("messages:", newMessage)
  
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
};

useEffect(() => {
  fetchMessages();
  // eslint-disable-next-line
}, [selectedChat]);

const typingHandler = (e) => {
  setNewMessage(e.target.value)
}
  return (
    <>
      {
        selectedChat ? (
          <>
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              pb={3}
              px={2}
              w="100%"
              fontFamily="Work sans"
              d="flex"
              justifyContent={{ base: "space-between" }}
              alignItems="center"
            >
              <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
              {messages &&
                selectedChat[0].name.toUpperCase()}
                <ProfileModal user = {selectedChat[0]}/>
                  
                             
            </Text>
            <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E6E6FF"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              
              <Input
                variant="filled"
                bg="#FFFFFF"
                placeholder="Enter a message..."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
          </>
        ) : (
          <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
        )
      }
    </>
  )
}

export default SingleChat