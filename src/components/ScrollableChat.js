import { Avatar, Tooltip } from '@chakra-ui/react';
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider';

const ScrollableChat = ({messages}) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages && messages.map((m,i) =>(
        <div style={{display:"flex"}} key={m.id}>
          {
            (isSameSender(messages,m,i,user.user_id)
              || isLastMessage(messages,i,user.user_id)
            ) && 
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.pic}
              />
            </Tooltip>
          }
        </div>
      ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat