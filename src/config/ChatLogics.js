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
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
  export const isSameSender = (messages, m, i, userId) => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== m.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
  };
  
  export const isLastMessage = (messages, i, userId) => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].sender._id !== userId &&
      messages[messages.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
  };
  
  
  
  export const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser.user_id ? users[1] : users[0];
  };

export const URL = "https://f237-31-223-82-2.ngrok.io/api"

  