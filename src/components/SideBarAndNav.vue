<template>
  <div class="indexZindex">
    <nav :class="{ open: isNavOpen }">
      <div class="logo">
        <i class="bx bx-menu menu-icon" @click="toggleNav"></i>
        <span class="logo-name">MY Task Management</span>
      </div>
      <div class="sidebar">
        <div class="logo">
          <i class="bx bx-menu menu-icon" @click="toggleNav"></i>
          <span class="logo-name">MY Task Management</span>
        </div>
        <div class="sidebar-content">
          <ul class="lists">
            <li class="list">
              <router-link to="/" class="nav-link" active-class="active">
                <i class="bx bx-home-alt icon"></i>
                <span class="link">Dashboard</span>
              </router-link>
            </li>
            <li class="list">
              <router-link to="/addTask" class="nav-link" active-class="active">
                <i class="bx bx-bar-chart-alt-2 icon"></i>
                <span class="link">Add Task</span>
              </router-link>
            </li>
            <li class="list">
              <router-link to="/archive" class="nav-link" active-class="active">
                <i class="bx bx-archive icon"></i>
                <span class="link">Archive</span>
              </router-link>
            </li>

            <!-- Chat Route with Notification Badge -->
            <li class="list">
              <router-link to="/chat" class="nav-link" active-class="active" @click="clearNotification">
                <i class="bx bx-message-rounded icon"></i>
                <span class="link">
                  Chat
                  <span v-if="messageCount > 0" class="notification-badge">{{ messageCount }}</span>
                </span>
              </router-link>
            </li>    
          </ul>

          <div class="bottom-content">
            <li class="list">
              <button @click="logout" class="nav-link">
                <i class="bx bx-log-out icon"></i>
                <span class="link">Logout</span>
              </button>
            </li>
          </div>
        </div>
      </div>
    </nav>
    <section class="overlay" @click="closeNav"></section>
  </div>
</template>

<script>
import io from 'socket.io-client';
const socket = io('https://task-managment-system-backend-api.onrender.com'); // Replace with your actual backend server URL

export default {
  data() {
    return {
      isNavOpen: false,
      messageCount: 0, // Track new message notifications
    };
  },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    closeNav() {
      this.isNavOpen = false;
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
    clearNotification() {
      this.messageCount = 0; // Reset message count when user opens the chat
      localStorage.setItem('messageCount', 0); // Update localStorage
    },
    incrementNotification() {
      this.messageCount++;
      localStorage.setItem('messageCount', this.messageCount); // Save notification count in localStorage
    }
  },
  created() {
    // Get the persisted notification count from localStorage
    const storedCount = localStorage.getItem('messageCount');
    if (storedCount) {
      this.messageCount = parseInt(storedCount, 10); // Set the message count from localStorage
    }



    socket.on('receiveMessage', (data) => {
  // Check if the logged-in user is the receiver
  const loggedInEmail = localStorage.getItem('userEmail'); // Assuming you have saved the user's email
  if (loggedInEmail === data.fromEmail) {
    console.log('This message is from the current user, no notification.');
    return;
  }

  // If the user is the receiver, show the notification
  console.log('New message received for the current user:', data.message);
  this.incrementNotification();
});

  }
};
</script>
<style  scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.indexZindex{
  z-index: 100;
  position: absolute;

}

.notification-badge {
  background-color: red;
  color: white;
  padding: 2px 8px;
  border-radius: 50%;
  margin-left: 8px;
  font-size: 12px;
}
body {
  min-height: 100%;
  background: #e3f2fd;
}
nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
}
nav .logo {
  display: flex;
  align-items: center;
  margin: 0 24px;
}
.logo .menu-icon {
  color: #333;
  font-size: 24px;
  margin-right: 14px;
  cursor: pointer;
}
.logo .logo-name {
  color: #333;
  font-size: 22px;
  font-weight: 500;
}
nav .sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  height: 100%;
  width: 260px;
  padding: 20px 0;
  background-color: #fff;
  box-shadow: 0 5px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}
nav.open .sidebar {
  left: 0;
}
.sidebar .sidebar-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 16px;
}
.sidebar-content .list {
  list-style: none;
}
.list .nav-link {
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 14px 12px;
  border-radius: 8px;
  text-decoration: none;
}
.lists .nav-link:hover {
  background-color: #4070f4;
}
.nav-link .icon {
  margin-right: 14px;
  font-size: 20px;
  color: #707070;
}
.nav-link .link {
  font-size: 16px;
  color: #707070;
  font-weight: 400;
}
.lists .nav-link:hover .icon,
.lists .nav-link:hover .link {
  color: #fff;
}
.overlay {
  position: fixed;
  top: 0;
  left: -100%;
  height: 1000vh;
  width: 200%;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
  background: rgba(0, 0, 0, 0.3);
}
nav.open ~ .overlay {
  opacity: 1;
  left: 260px;
  pointer-events: auto;
}
.nav-link.active {
  background-color: #4070f4;
  color: #fff;
}
.nav-link.active .icon {
  color: #fff;
}
</style>