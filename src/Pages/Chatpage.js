import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chatpage = () => {
    const [chats, setChats] = useState([])
    const fetchChats= async()=>{
        const data = await axios.get('0f66-31-223-82-2.ngrok.io/api')
        console.log(data)
        setChats(data)
    }
    useEffect(()=>{
        fetchChats()
    },[])
  return (
    <div>
        {chats.map((chat)=>(
            <div key={chat._id}>{chat.chatName}</div>
        ))}
    </div>
  )
}

export default Chatpage