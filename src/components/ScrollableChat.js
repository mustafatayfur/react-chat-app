import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider';

const ScrollableChat = ({messages}) => {
  const { user,chatUser } = ChatState();
  console.log(user)
  console.log(chatUser)
  console.log(messages)
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i) =>(
        <div style={{display:"flex"}} key={m.id}>
          {/*
            (isSameSender(messages,m,i,user.user_id)
              || isLastMessage(messages,i,user.user_id)
            ) && 
            <Tooltip label={m.sender} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                src={m}
              />
            </Tooltip>
      */}
          <span
              style={{
                backgroundColor: `${
                  m.sender_id === user.user_id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.user_id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: "black",
              }}
            >
              {m.content}
            </span>
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat