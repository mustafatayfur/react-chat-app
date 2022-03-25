import { Box } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ChatBox from '../components/ChatBox'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import { ChatState } from '../Context/ChatProvider'

const Chatpage = () => {
    const { user } = ChatState()
    const [chats, setChats] = useState([])
    const fetchChats= async()=>{
        const data = await axios.get('https://77ab-31-223-82-2.ngrok.io/api')
        console.log(data)
        setChats(data)
    }
    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div style={{width:"100%"}}>
        {user && <SideDrawer/>}
        <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px"
        >
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </Box>
    </div>
  )
}

export default Chatpage