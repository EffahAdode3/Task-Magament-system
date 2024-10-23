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
        localEmail: '',
        isStreaming: false,
        localStream: null,
        remoteStream: null,
        peerConnection: null,
      };
    },
    mounted() {
      this.getCurrentUser();
      this.initSocket();
    },
    methods: {
      getCurrentUser() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email) {
          this.localEmail = user.email;
        } else {
          console.error('No user found in localStorage');
        }
      },
  
      initSocket() {
        this.socket = io(base_url);
  
        this.socket.emit('joinChat', this.localEmail);
  
        this.socket.on('receiveInvite', (data) => {
          this.streamInvite = data.fromEmail;
        });
  
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
        this.socket.emit('inviteToStream', {
          fromEmail: this.localEmail,
          toEmail: userEmail,
        });
        console.log(`Invitation sent to ${userEmail}`);
      },
  
      acceptInvite() {
        this.socket.emit('acceptInvite', {
          fromEmail: this.streamInvite,
          toEmail: this.localEmail,
        });
        console.log(`Accepted invite from ${this.streamInvite}`);
      },
  
      async startStreaming() {
        try {
          // Access the user's media devices
          this.localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
  
          // Set the local video element source
          this.$refs.localVideo.srcObject = this.localStream;
  
          // Create a new RTCPeerConnection
          this.peerConnection = new RTCPeerConnection();
  
          // Add local stream tracks to the peer connection
          this.localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, this.localStream);
          });
  
          // Handle incoming tracks from the remote peer
          this.peerConnection.ontrack = (event) => {
            this.remoteStream = event.streams[0];
            this.$refs.remoteVideo.srcObject = this.remoteStream;
          };
  
          // Create an offer and send it to the remote peer
          const offer = await this.peerConnection.createOffer();
          await this.peerConnection.setLocalDescription(offer);
  
          // Emit the offer to the invited user
          this.socket.emit('streamOffer', {
            offer: offer,
            toEmail: this.streamInvite,
            fromEmail: this.localEmail,
          });
  
          this.isStreaming = true; // Update the streaming state
        } catch (error) {
          console.error('Error starting stream:', error);
        }
      },
  
      // Handle the incoming offer from the inviter (when joining a stream)
      joinStream(offer) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        this.peerConnection.createAnswer().then(answer => {
          this.peerConnection.setLocalDescription(answer);
          this.socket.emit('streamAnswer', {
            answer: answer,
            toEmail: this.streamInvite,
            fromEmail: this.localEmail,
          });
        });
      },
    },
  };
  </script>
  
  