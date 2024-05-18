var express = require("express")
const { Socket } = require("socket.io")
var app = express()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"public/index.html");
})

app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+"public/admin.html");
})


io.on("connection",(socket)=>{
    console.log("new connection established");

    socket.on("disconnected",()=>{
        console.log("disconnected");
    });

    socket.on("message",(msg)=>{
        console.log(msg);
        io.emit("board",msg);
    });

})

http.listen(3000,()=>{
    console.log('connected to server');
})