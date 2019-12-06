const { io } = require('../server');
const {Users} = require('../classes/users');
const {createMessage} = require('../herlpers/helper');

const users = new Users();

io.on('connection', function(client){
    
    client.on("getInChat", (user, callback) => {

        if(!user.name || !user.room){
            return callback({err:true, message:"name and room are required"});
        }

        client.join(user.room);

        users.addUser(client.id, user.name, user.room);

        const usersPerRoom = users.getUsersPerRoom(user.room);

        client.broadcast.to(user.room).emit("listUsers", usersPerRoom);

        callback(usersPerRoom);

    });

    client.on("disconnect", () => {

        const userDeleted = users.deleteUser(client.id);

        client.broadcast.to(userDeleted.room).emit("createMessage", createMessage("Admin", `${userDeleted.name} left`));
        client.broadcast.to(userDeleted.room).emit("listUsers", users.getUsersPerRoom(userDeleted.room));

    });

    client.on("createMessage", (data) => {

        const user = users.getUser(client.id);

        const message = createMessage(user.name, data.message);

        client.broadcast.to(user.room).emit("createMessage", message);

    });

    client.on("messagePrivate", (data) => {

        const user = users.getUser(client.id);

        client.broadcast.to(data.to).emit('messagePrivate', {name:user.name, message:data.message});

    });

});