class Users {

    constructor(){
        this.users = [];
    }

    addUser(id, name, room){

        const user = {id, name, room};

        this.users.push(user);

        return this.users;

    }

    getUser(id){
        const user = this.users.filter( (user) => user.id === id)[0];
        return user;
    }

    getUsers(){
        return this.users;
    }

    getUsersPerRoom(room){
        const users = this.users.filter( (user) => user.room === room);
        return users;
    }

    deleteUser(id){
        const userDeleted = this.getUser(id);
        this.users = this.users.filter( (user) => user.id !== id);
        return userDeleted;
    }

}

module.exports = {
    Users
}