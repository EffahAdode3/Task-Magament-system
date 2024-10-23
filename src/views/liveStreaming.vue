<template>
    <div>
      <input v-model="searchEmail" placeholder="Search by email" />
      <button @click="searchUsers">Search User</button>
  
      <div v-if="searchedUsers.length">
        <p>Found Users:</p>
        <ul>
          <li v-for="user in searchedUsers" :key="user.id">
            {{ user.email }}
            <button @click="inviteToStream(user.email)">Invite to Stream</button>
          </li>
        </ul>
      </div>
  
      <p v-if="streamInvite">You have been invited by {{ streamInvite }} to join a live stream</p>
      <button v-if="streamInvite" @click="acceptInvite">Join Stream</button>
      <div>
    <video ref="localVideo" autoplay playsinline></video>
    <video ref="remoteVideo" autoplay playsinline></video>

    <!-- Streamer starts the stream -->
    <button v-if="!isStreaming" @click="startStreaming">Start Streaming</button>

    <!-- Viewer sees available stream -->
    <div v-if="streamAvailable && !isStreaming">
      <p>Live stream available from {{ streamingUser }}!</p>
      <button @click="joinStream">Join Live Stream</button>
    </div>
  </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { io } from "socket.io-client";
  import { base_url } from "../constant";
  
  export default {
    data() {
      return {
        searchEmail: '',
        searchedUsers: [],
        streamInvite: null,
        socket: null,
        localEmail: '', // Will be dynamically set from localStorage
      };
    },
    mounted() {
      this.getCurrentUser(); // Fetch user details from localStorage
      this.initSocket();      // Initialize socket connection
    },
    methods: {
      getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
          this.localEmail = user.email; // Set the localEmail from the user object
        } else {
          console.error('No user found in localStorage');
        }
      },
  
      initSocket() {
        this.socket = io(base_url);
  
        // Join the chat with the current user's email
        this.socket.emit('joinChat', this.localEmail);
  
        // Listen for live stream invitations
        this.socket.on('receiveInvite', (data) => {
          this.streamInvite = data.fromEmail; // Store the email of the inviter
        });
  
        // Listen for invite acceptance
        this.socket.on('inviteAccepted', (data) => {
          console.log(`${data.toEmail} has accepted your live stream invitation.`);
          this.startStreaming(); // Start streaming when invite is accepted
        });
      },
  
      searchUsers() {
        const token = localStorage.getItem('token');
        axios
          .get(`${base_url}/getClientEmail/${this.searchEmail}`, {
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
  
      inviteToStream(userEmail) {
        // Emit socket event to invite the selected user to join the live stream
        this.socket.emit('inviteToStream', {
          fromEmail: this.localEmail,
          toEmail: userEmail,
        });
        console.log(`Invitation sent to ${userEmail}`);
      },
  
      acceptInvite() {
        // Emit socket event to accept the live stream invitation
        this.socket.emit('acceptInvite', {
          fromEmail: this.streamInvite,
          toEmail: this.localEmail,
        });
        console.log(`Accepted invite from ${this.streamInvite}`);
      },
  
      startStreaming() {
        // Call your startStreaming function here when the invitation is accepted
        console.log("Starting live stream...");
        // Implement WebRTC or other streaming logic here...
      },
    },
  };
  </script>
  