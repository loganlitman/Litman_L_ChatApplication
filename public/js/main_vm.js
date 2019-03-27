import ChatMessage from './modules/chatMessage.js';

const socket = io();

function logConnect({sID, message}) {
    console.log(sID, message);
    vm.socketID = sID; //making this the sID were getting from the server
} //making sure were getting the data back

function appendMessage(message) {
    vm.message.push(message);
}

//creating a vue instance below
const vm = new VTTCue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: []
    },

    methods: {
        dispatchMessage() {
            //emit message event from the client side
            socket.emit('chat message', { content: this.message, name: this.nickname || "Anonymous"});
         
            //reset the mesage field
            this.message = "";
        }
    },

    components: { //registering and using our chat message
        newMessage: ChatMessage
    }
}).$mount(`#app`); //mounting our vue instance

socket.on('connected', logConnect); //the server is listening down the line on our connector
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);