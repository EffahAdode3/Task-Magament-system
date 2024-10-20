
  
<template>
    <br>
    <br>
    <h1 class="archive-heading">Collaboration Platform</h1> 
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Search and Select User Section -->
        <div class="modal-header">
          <h5 class="modal-title">Chat</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="form-control"
            v-model="searchEmail"
            @input="searchUsers"
            placeholder="Search by email"
          />
          <ul class="list-group mt-2">
            <li
              class="list-group-item"
              v-for="user in searchedUsers"
              :key="user.id"
              @click="selectUser(user.email, user.id)"
            >
              <h6 class="mb-0">{{ user.userName }}</h6>
              <small class="text-muted">{{ user.email }}</small>
            </li>
          </ul>
  
       <div class="mt-1">
    <h6>Selected User: {{ chatPartner }}</h6>
    <ul class="list-group chat-box">
      <li
        v-for="(msg, index) in messages"
        :key="index"
        :class="{
          'message-left': msg.senderId !== currentUserId,
          'message-right': msg.senderId === currentUserId
        }"
        class="list-group-item message-item"
      >
        <div class="message-content">{{ msg.message }}</div>
      </li>
    </ul>
  </div>
  
          <!-- Message Input -->
          <div class="mt-3">
            <input
              type="text"
              class="form-control"
              v-model="newMessage"
              placeholder="Type a message"
            />
            <button class="btn btn-primary mt-2" @click="sendMessage">Send</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { io } from 'socket.io-client'; // Import Socket.IO client
  import { base_url } from '../constant';
  
  export default {
    data() {
      return {
        searchEmail: '',
        searchedUsers: [],
        chatPartner: '',
        chatPartnerId: null,
        newMessage: '',
        messages: [],
        currentUserId: null,
        socket: null,
      };
    },
    mounted() {
      const currentUser = this.getCurrentUser();
      this.currentUserId = currentUser.id;
  
      // Initialize Socket.IO connection
      this.socket = io(base_url);
  
      // Listen for incoming messages
      this.socket.on('receiveMessage', (data) => {
        if (data.fromEmail === this.chatPartner) {
          this.messages.push({
            senderId: this.chatPartnerId,
            message: data.message,
          });
        }
      });
  
      // Join the chat room with current user's email
      this.socket.emit('joinChat', currentUser.email);
    },
    methods: {
      getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
      },
      searchUsers() {
        const token = localStorage.getItem('token');
        axios.get(`${base_url}/getClientEmail/${this.searchEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then(response => {
          this.searchedUsers = response.data.users;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
      },
      selectUser(email, userId) {
        this.chatPartner = email;
        this.chatPartnerId = userId;
        this.searchedUsers = [];
        this.fetchMessages();
      },
      fetchMessages() {
        axios.get(`${base_url}/messages/${this.currentUserId}/${this.chatPartnerId}`)
          .then(response => {
            this.messages = response.data.messages;
          })
          .catch(error => {
            console.error('Error fetching messages:', error);
          });
      },
      sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        // Emit the message to the server
        this.socket.emit('sendMessage', {
          senderId: this.currentUserId,
          receiverId: this.chatPartnerId,
          message: this.newMessage,
          fromEmail: this.getCurrentUser().email,
        });
  
        // Add the message to the chat window
        this.messages.push({
          senderId: this.currentUserId,
          message: this.newMessage,
        });
  
        // Clear the input
        this.newMessage = '';
      },
    },
  };
  </script>
  
  
    
  <style scoped>
  .modal-dialog {
    max-width: 500px;
  }
  
  .chat-box {
    border: 1px solid #ccc;
    padding: 10px;
    height: 300px;
    overflow-y: scroll;
  }
  
  .message-input {
    margin-top: 10px;
  }
  .chat-box {
    max-height: 400px;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  .message-item {
    display: inline-block;
    margin-bottom: 10px;
    max-width: 45%; /* Restrict width to 45% of the screen */
    padding: 10px;
    border-radius: 15px;
    word-wrap: break-word;
  }
  
  .message-left {
    background-color: #f1f0f0; /* Gray background for received messages */
    align-self: flex-start; /* Align messages from the other user to the left */
    margin-right: auto;
  }
  
  .message-right {
    background-color: #d1e7dd; /* Light green background for sent messages */
    align-self: flex-end; /* Align current user's messages to the right */
    margin-left: auto;
  }
  
  .message-content {
    white-space: pre-wrap; /* Preserve whitespace */
    word-break: break-word; /* Ensure words break if too long */
  }

  .archive-heading {
  color: blue; /* Attractive tomato color */
  text-align: center; /* Center text horizontally */
  margin: 20px 0; /* Add some margin for spacing */
  padding: 10px;
  font-size: 2em; /* Increase font size for better visibility */
  font-family: 'Arial', sans-serif; /* Use a clean, sans-serif font */
  background-color: #f0f0f0; /* Light grey background for contrast */
  border-radius: 10px; /* Rounded corners for better aesthetics */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

@media (max-width: 600px) {
  .archive-heading {
    font-size: 1.5em; /* Adjust font size for smaller screens */
  }
}
  
  </style>