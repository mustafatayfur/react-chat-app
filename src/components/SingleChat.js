import React from 'react'
import { ChatState } from '../Context/ChatProvider';

const SingleChat = () => {

    const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();
  return (
    <>SingleChat</>
  )
}

export default SingleChat