const chat = document.getElementById('chat-form')
const chatMessages = document.getElementById('chat-messages')

const socket = io()

function scr(){
    chatMessages.scrollTop = chatMessages.scrollHeight
}

function createMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    if(message.username !== 'You')
        div.innerHTML = `<p class="meta"><a href="/user/${message.username}">${message.username}</a><span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    else
        div.innerHTML = `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.getElementById('chat-messages').appendChild(div)
}

function createNotif(user, x) {
    const div = document.createElement('div')
    div.classList.add('notification')
    div.innerHTML = `<span>${user}</span>` + x;
    document.getElementById('chat-messages').appendChild(div)
}

function activeUser(userarray) {
    var userlist = document.getElementById('users')

    while (userlist.hasChildNodes()) {  
        userlist.removeChild(userlist.firstChild);
    }

    for(var i=0; i<userarray.length; i++) {
        const li = document.createElement('li')
        li.innerHTML = `<a href="/user/${userarray[i].username}"> ${userarray[i].username} </a>`
        document.getElementById('users').appendChild(li)
    }
}

chat.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.message.value
    const v = { msg, user }
    socket.emit('chat', v)

    e.target.elements.message.value = ''
    e.target.elements.message.focus
})


socket.emit('userconnect', user)

socket.on('welcome', () => {
    createNotif('', "Welcome to the Chatroom")
})

socket.on('userjoin', (user) => {
    createNotif(user.username, " has joined the chat")
    
    scr();
})

socket.on('activejoin', (user) => {
    activeUser(user.userarray)
})

socket.on('userleave', (user) => {
    activeUser(user.userarray)

    createNotif(user.username, " has left the chat")
    scr();
})

socket.on('my-message', message => {
    createMessage(message)
    scr();
})

socket.on('chat-message', message => {
    createMessage(message)
    scr();
})