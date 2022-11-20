const socket = io('http://localhost:8000');
let form = document.getElementById('sendContainer');
let messageInp = document.getElementById('messageInput');
let messageContainer = document.querySelector('#messageContainer');
var audio = new Audio('ting.mp3')

form.addEventListener('submit', e => {
    e.preventDefault(); //To prevent reloading of browser page

    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInp.value = '';

    $("#messageContainer").css("border", "4px solid rgb(9, 128, 76)");
    setTimeout(function(){
         $("#messageContainer").css("border", "2px solid rgba(0, 162, 187, 0.565)");
    }, 200);

})

const append = (message, position) => {
    const messageElement = document.createElement('div');

    if (position == 'center') {
        messageElement.innerHTML = `<strong> ${message}</strong>`;
    }
    else
        messageElement.innerText = message;

    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }

}
const nam = prompt('Enter your name to join the chat');

socket.emit('new-user-joined', nam);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center')
})
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('user-left', name => {
    append(`${name} left the chat`, 'center')
})



