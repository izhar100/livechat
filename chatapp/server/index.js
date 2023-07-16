const express=require("express")
const app=express()
const cors=require("cors")
app.use(cors())
const http=require('http')
const {Server}=require('socket.io')
const server=http.createServer(app)
const io = new Server(server,{
    cors:{
     origin:"http://127.0.0.1:5173",
     methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`)
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with id: ${socket.id} joined Room: ${data}`)
    })
    socket.on("send_message",(data)=>{
        console.log(data.room)
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    })
})
const port=8080
server.listen(port,()=>{
    console.log("Server is runnig at port 8080")
})