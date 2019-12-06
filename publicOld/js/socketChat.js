var socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has("name") ||!params.has("room") ){
    window.location = "index.html";
    throw new Error("name and room are required");
}

const user = {
    name: params.get("name"),
    room: params.get("room")

}

// listen info
socket.on('connect', function(){
    console.log("connected to server");

    socket.emit("getInChat", {name: user.name, room:user.room}, function(usersConnected){

        if(usersConnected.err){
            console.log(usersConnected.message);
        }
        console.log("Users online: ", usersConnected);

    });
});

socket.on('disconnect', () => {
    console.log("lost connection with server");
});

socket.on('createMessage', function(data){
    console.log(data);
});

socket.on("listUsers", function(usersConnected){
    console.log("Users online: ", usersConnected);
});

socket.on("messagePrivate", function(data){
    console.log("Message Private:" + data.message);
});