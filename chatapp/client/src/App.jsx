import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
const socket = io.connect("http://localhost:8080")

function App() {
  const [name,setName]=useState("")
  const [room,setRoom]=useState("")
  const [chatStart,setChatStart]=useState(false)
  const joinRoom=()=>{
    if(!name=="" && !room==""){
      socket.emit("join_room",room)
      setChatStart(true)
    }
  }

  return (
    <>
    <br />
    {
     !chatStart
     ?
     <Box w={"40%"} m={"auto"}>
      <Heading textAlign={"center"}>Chat Room</Heading>
      <br />
      <Input border={"1px solid #0037ff"} type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name'/>
      <br />
      <br />
      <Input border={"1px solid #001aff"} type='text' value={room} onChange={(e)=>setRoom(e.target.value)} placeholder='Enter Room id'/>
      <br />
      <br />
      <Button colorScheme='blue' w={"100%"} onClick={joinRoom}>Join Chat Room</Button>
    </Box>
    :
      <Chat socket={socket} username={name} room={room}/>
    }
    
    </>
  )
}

export default App
