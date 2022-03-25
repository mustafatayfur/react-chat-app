import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({children}) => {
 
 const [selectedChat, setSelectedChat] = useState()
 const [chats, setChats] = useState()
 const [user,setUser] = useState()
 const history = useHistory()

useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  console.log(userInfo)
  setUser(userInfo)

  if(null){
      history.push("/")
    }
},[history])


    return <ChatContext.Provider value={{user,setUser,selectedChat, setSelectedChat,chats, setChats}}>
        {children}
    </ChatContext.Provider>
}

export const ChatState=() => {
    return useContext(ChatContext)
}
export default ChatProvider;
