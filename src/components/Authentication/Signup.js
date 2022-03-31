import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { URL } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'
const Signup = () => {

    const [show, setShow]= useState(false)
    const [name, setName]= useState()
    const [email,setEmail] = useState()
    const [confirmpassword, setConfirmpassword] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory()
    
    const handleClick = ()=> setShow(!show)
    const submitHandler = async() => {
      setLoading(true)
      if(!name || !email || !password || !confirmpassword){
        toast({
          title:"Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        return
      }
      try {
        const config = {
          headers:{
            "Content-type" : "application/json",
          },
        }
        const {data} = await axios.post(`${URL}/auth/register`, {name,email, password}, config)
        console.log(data)
        toast({
          title:"Registiration Successful. Please Login!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
        setLoading(false)
        history.push("/")
      } catch (error) {
        toast({
          title:"Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
        setLoading(false)
      }
    }

  return (
    <VStack spacing="5px">
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input 
                placeholder='Enter Your Name'
                onChange={(e)=>setName(e.target.value)}
                />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
                placeholder='Enter Your Email'
                onChange={(e)=>setEmail(e.target.value)}
                />
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <Input
            type={show ? "text" : "password"}
            placeholder='Enter your password'
            onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            </InputGroup>
            
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
            <Input
            type={show ? "text" : "password"}
            placeholder='Confirm password'
            onChange={(e)=>setConfirmpassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
          colorScheme="purple"
          width="100%"
          style={{marginTop:15}}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
    </VStack>
  )
}

export default Signup