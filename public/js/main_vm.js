import chatMessage from './modules/chatMessage.js';

const socket = io();

function logConnect({sID, message}){ //sID, message
    console.log(sID, message);
    vm.socketID = sID;

    var newUser = new Object();
	socket.emit('chat message', { content: "A new user has joined the chat!", object: newUser});
}

function appendMessage(message) {
    vm.messages.push(message);
}

// create Vue instance
const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: []
    },

    methods: {
        dispatchMessage() {
            // emit message event from the client side
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});

            // reset the message field
            this.message = "";

        }
    },
    components: {
        newmessage: chatMessage
    }
}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage); // this one is optional
