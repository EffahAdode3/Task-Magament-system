import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from 'socket.io-client';
import { base_url } from '../constant';

export const useChatStore = defineStore('chat', {
  state: () => ({
    searchEmail: '',
    searchedUsers: [],
    chatPartner: '',
    chatPartnerName: '',
    chatPartnerId: null,
    newMessage: '',
    messages: [],
    currentUserId: null,
    socket: null,
  }),
  actions: {
    // Initialize the store with current user and socket connection
    initializeStore() {
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

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    },

    // Search for users based on email
    searchUsers() {
        const token = localStorage.getItem('token');
        if (!this.searchEmail) {
          console.error('No email entered to search');
          return;
        }
        axios
          .get(`${base_url}/getClientEmail`, {
            params: {
              email: this.searchEmail,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            this.searchedUsers = response.data.users;
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      },
      

   

    // Select a chat partner and fetch their messages
    selectUser(email, userId, userName) {
      this.chatPartner = email;
      this.chatPartnerId = userId;
      this.chatPartnerName = userName;
      this.searchedUsers = [];
      this.fetchMessages();
    },

    // Fetch the chat messages between the current user and the chat partner
    fetchMessages() {
      axios
        .get(`${base_url}/messages/${this.currentUserId}/${this.chatPartnerId}`)
        .then((response) => {
          this.messages = response.data.messages;
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    },

    // Send a new message
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

    // Handle 'Enter' key press in the textarea
    handleKeyDown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent default "Enter" behavior (new line)
        this.sendMessage(); // Call the sendMessage action
      }
    },
  },
});
