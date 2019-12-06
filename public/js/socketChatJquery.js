// function to render users
const params = new URLSearchParams(window.location.search);

const userName = params.get("name");
const room = params.get("room");

// ref jquery
let divUsers = $('#divUsers');
let formSend = $("#formSend");
let txtMessage = $("#txtMessage");
let divChatbox = $("#divChatbox");


function renderUsers(users){

    let html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span>'+params.get('room')+'</span></a>';
    html += '</li>';

    for(let i=0; i< users.length; i++){

        html += '<li>';
        html += '<a data-id='+users[i].id +' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+users[i].name+'<small class="text-success">online</small></span></a>';
        html += '</li>';

    }

    divUsers.html(html);
   

}

function renderMessage(message, me = false){

    let html = '';
    let date = new Date(message.date);
    let hour = date.getHours() + ':' + date.getMinutes();

    if(me){

        html += `<li class="reverse">`
        html += `<div class="chat-content">`
        html += `<h5>${message.name}</h5>`
        html += `<div class="box bg-light-inverse">${message.message}</div>`
        html += `</div>`
        html += `<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>`
        html += `<div class="chat-time">${hour}</div>`
        html += `</li>`
    }else{

        let classAdmin = (message.name === "Admin")?"danger":"info";

        html += '<li class="animated fadeIn">';
        if(classAdmin === "info"){
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '<div class="chat-content">';
        html += `<h5>${message.name}</h5>`;
        html += `<div class="box bg-light-${classAdmin}">${message.message}</div>`;
        html += '</div>';
        html += `<div class="chat-time">${hour}</div>`;
        html += '</li>';
    }

    divChatbox.append(html);

}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}





// listeners
divUsers.on('click', 'a', function(){

    const id = $(this).data('id');
    if(id){
        console.log(id);
    }

});

formSend.on("submit", function(event){

    event.preventDefault();

    if(txtMessage.val().trim().length === 0){
        return;
    }


    // socket
    socket.emit("createMessage", {
        name: userName,
        message: txtMessage.val()
    }, function(message){
        txtMessage.val('').focus();
        renderMessage(message, true);
        scrollBottom();
    });

});
