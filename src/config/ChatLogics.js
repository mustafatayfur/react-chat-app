import { ChatState } from "../Context/ChatProvider";

export const getSender = (allUsers) => {
  const { chatUser} = ChatState();
  console.log(chatUser)
  console.log(allUsers)
  const User = allUsers.filter((item)=> item.id === chatUser.id)
  console.log(User)
  return User.length ? User[0].name : ""
};

export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender_id &&
      messages[i].sender_id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender_id !== m.sender_id &&
        messages[i].sender_id !== userId) ||
      (i === messages.length - 1 && messages[i].sender_id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender_id !== m.sender_id ||
        messages[i + 1].sender_id === undefined) &&
      messages[i].sender_id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender_id !== userId &&
      messages[messages.length - 1].sender_id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender_id === m.sender_id;
  };
  
  
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser.user_id ? users[1] : users[0];
  };

export const URL = "https://3238-31-223-82-2.ngrok.io/api"

  