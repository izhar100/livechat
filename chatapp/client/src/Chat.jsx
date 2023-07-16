import React from 'react'
import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])
    const sendMessage = () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                auther: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
        }
        setCurrentMessage("")
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])
    return (
        <>
            <Box>
                <Box position={"fixed"} bottom={"20px"} w={"100%"}>
                    <Flex w={"60%"} m={"auto"} gap={"5px"}>
                        <Input value={currentMessage} border={"1px solid black"} placeholder='Enter message...' onChange={(e) => setCurrentMessage(e.target.value)} />
                        <Button onClick={sendMessage} colorScheme='blue'>SEND</Button>
                    </Flex>

                </Box>
                <Heading textAlign={"center"}>Live Chat</Heading>
                <br />
                <Box bgColor={"#9bfff3ff"} w={"60%"} m={"auto"} borderRadius={"10px"}>
                <ScrollToBottom>
                        <Box h={"75vh"} p={"20px"}>

                            {
                                messageList?.map((el, ind) => {
                                    return (<>
                                        <Flex justifyContent={username == el.auther ? "right" : "left"}>
                                            <Box color={"white"} key={ind} w={"60%"} bgColor={username == el.auther ? "#006212" : "#2f2f2f"} p={"3px"} pl={"6px"} borderRadius={"5px"}>
                                                <Text as={"b"} color={username == el.auther ? "#fbff00" : " rgb(255, 0, 242)"}>{el.auther}</Text>
                                                <Text>{el.message}</Text>
                                                <Text textAlign={"right"} fontSize={"10px"}>{el.time}</Text>
                                            </Box>
                                        </Flex>
                                        <br />

                                    </>)
                                })
                            }

                        </Box>
                </ScrollToBottom>
                </Box>
            </Box>
        </>
    )
}

export default Chat
