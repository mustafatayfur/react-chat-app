import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider';

const MyChats = () => {

  const [loggedUser, setLoggedUser] = useState()
  const {
    setSelectedChat,
    user,
    chats,
    setChats,
  } = ChatState();
  const toast = useToast()

  return (
    <div>MyChats</div>
  )
}

export default MyChats