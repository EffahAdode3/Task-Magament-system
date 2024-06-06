<template>
  <div class="indexZindex">
    <nav :class="{ open: isNavOpen }">
      <div class="logo">
        <i class="bx bx-menu menu-icon" @click="toggleNav"></i>
        <span class="logo-name">My Todo-s</span>
      </div>
      <div class="sidebar">
        <div class="logo">
          <i class="bx bx-menu menu-icon" @click="toggleNav"></i>
          <span class="logo-name">My Todo-s</span>
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
            <!-- <li class="list">
              <a href="#" class="nav-link">
                <i class="bx bx-bell icon"></i>
                <span class="link">Notifications</span>
              </a>
            </li>
            <li class="list">
              <a href="#" class="nav-link">
                <i class="bx bx-message-rounded icon"></i>
                <span class="link">Messages</span>
              </a>
            </li>
            <li class="list">
              <a href="#" class="nav-link">
                <i class="bx bx-pie-chart-alt-2 icon"></i>
                <span class="link">Analytics</span>
              </a>
            </li>
            <li class="list">
              <a href="#" class="nav-link">
                <i class="bx bx-heart icon"></i>
                <span class="link">Likes</span>
              </a>
            </li> -->
            <li class="list">
              <router-link to="/files" class="nav-link" active-class="active">
                <i class="bx bx-folder-open icon"></i>
                <span class="link">Files</span>
              </router-link>
            </li>
          </ul>

          <div class="bottom-content">
            <li class="list">
              <router-link to="/settings" class="nav-link" active-class="active">
                <i class="bx bx-cog icon"></i>
                <span class="link">Settings</span>
              </router-link>
            </li>
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
export default {
  data() {
    return {
      isNavOpen: false
    };
  },


  mounted(){
      var token = localStorage.getItem("token");
      console.log(token);
      if( token === null){
        this.$router.push('/login');
      }
     
      
    },
  methods: {
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    closeNav() {
      this.isNavOpen = false;
    },
    logout(){
        // alert("Are sure you want to Logout");
        localStorage.clear();
        this.$router.push('/login');
      }
  }
};
</script>
<style  scoped>
/* Google Fonts - Poppins */
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