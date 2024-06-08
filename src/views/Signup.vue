<template>
    <body>                
  <form @submit.prevent="signup" >
    <h2>Account Registration</h2>
    <div class="form-group fullname">
      <label for="fullname"> User Name </label>
      <input type="text" id="userName" placeholder="Enter your user Name"  v-model="formdata.userName"  @focus="clearError('userName')" required >
      <div v-if="errors.userName"  class="error">{{ errors.userName }}</div>
    </div>
    <div class="form-group email">
      <label for="email">Email Address</label>
      <input  type="email" id="email" placeholder="Enter your email address" v-model="formdata.email" @focus="clearError('email')" required >
      <div v-if="errors.email" class="error">{{ errors.email }}</div>
    </div>
    <div class="form-group password">
      <label for="password">Password</label>
      <input  type="password" id="password" placeholder="Enter your password"  v-model="formdata.password" @focus="clearError('password')" required >
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
      <i id="pass-toggle-btn" class="fa-solid fa-eye"></i>
    </div>
    <div class="form-group password">
      <label for="password"> Comfirmed Password</label>
      <input  type="password" id="cfmpassword" placeholder="Enter your Retype-password" v-model="confirmPassword" @focus="clearError('confirmPassword')" required>
      <div v-if="errors.confirmPassword"  class="error">{{ errors.confirmPassword }}</div>
      <i id="pass-toggle-btn" class="fa-solid fa-eye"></i>
    </div>
    <div class="form-group submit-btn">
      <input type="submit" value="Submit">
    </div>
    <div class="field">
    <span><a href="/Login">Already having accounts?  Click to Login</a></span>
 </div>
    
  </form>
  <!-- <div v-if="toggledisabled" class="loading-overlay">
      <img src="../assets/loading.gif" alt="Loading">
    </div> -->
</body>
</template>
<script>
import axios from 'axios'
import {base_url} from '../constant'
import swal from 'sweetalert';
export default{
   data(){
   
      return{          
        // toggledisabled:false,
          formdata:{
          userName:'',
            email:'',
            password:'',
           
        },
        confirmPassword: '',
        errors: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }

      }
  
   },
   methods:{
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validatePassword(password) {
      return password.length >= 8 && /[a-z]/i.test(password) && /\d/.test(password);
    },

    validateUserName(userName) {
    const re = /^[a-zA-Z0-9-_]{3,20}$/;
    return re.test(userName);
  },
    validateForm() {
      this.errors = { userName: '', email: '', password: '', confirmPassword: '' };
      let valid = true;

      if (!this.validateUserName(this.formdata.userName)) {
      this.errors.userName = 'Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens.';
      valid = false;
    }

      if (!this.validateEmail(this.formdata.email)) {
        this.errors.email = 'Invalid email format.';
        valid = false;
      }

      if (!this.validatePassword(this.formdata.password)) {
        this.errors.password = 'Password must be at least 8 characters long and contain both letters and numbers.';
        valid = false;
      }

      if (this.formdata.password !== this.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match.';
        valid = false;
      }

      return valid;
    },
    clearError(field) {
      this.errors[field] = '';
    },
      signup(){
        if (!this.validateForm()) {
        return;
      }
      // this.toggledisabled = true;
        axios.post(`${base_url}/createuser`, this.formdata)
  .then((res) => {
    // this.toggledisabled = false;
    console.log(res);               
    if (res.status === 201) {    
      this.$router.push('/login');
      console.log("Successfully Done");
    }        
    else if (res.status === 409) {
          console.log("Conflict detected"); // Debugging line
          swal({
            title: "Conflict",
            text: `An Account has already been created with this ${this.formdata.email}. Please login instead.`,
            icon: "error"
          });
        }
  })
  .catch((error) => {
    // this.toggledisabled = false;
    console.error("Error details:", error.response ? error.response : error);
    if (error.response && error.response.status === 500) {
      swal('Server error, please try again later.', 'error');
    } else if (error.response && error.response.status === 409) {
        console.log("Conflict detected in catch block"); // Debugging line
        swal({
          title: "Conflict",
          text: `An Account has already been created with this ${this.formdata.email}. Please login instead.`,
          icon: "error"
        });
      }
    }  
  );
   }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap');

* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Open Sans', sans-serif;
}

body {
display: flex;
align-items: center;
justify-content: center;
padding: 0 10px;
min-height: 100vh;
background-color: blue;
/* background-image: url('../assets/back.jpg'); */
background-size: cover; 
/* background-position: center; */
}
.field a {
     text-decoration: none;
}
form {
padding: 25px;
background: #fff;
max-width: 500px;
width: 100%;
border-radius: 7px;
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.05);
}

form h2 {
font-size: 27px;
text-align: center;
margin: 0px 0 30px;
}

form .form-group {
margin-bottom: 15px;
position: relative;
}

form label {
display: block;
font-size: 15px;
margin-bottom: 7px;
}

form input,
form select {
height: 45px;
padding: 10px;
width: 100%;
font-size: 15px;
outline: none;
background: #fff;
border-radius: 3px;
border: 1px solid #bfbfbf;
}

form input:focus,
form select:focus {
border-color: #9a9a9a;
}

form input.error,
form select.error {
border-color: #f91919;
background: #f9f0f1;
}

form small {
font-size: 14px;
margin-top: 5px;
display: block;
color: #f91919;
}

form .password i {
position: absolute;
right: 0px;
height: 45px;
top: 28px;
font-size: 13px;
line-height: 45px;
width: 45px;
cursor: pointer;
color: #939393;
text-align: center;
}

.submit-btn {
margin-top: 30px;
}

.submit-btn input {
color: white;
border: none;
height: auto;
font-size: 16px;
padding: 13px 0;
border-radius: 5px;
cursor: pointer;
font-weight: 500;
text-align: center;
background: #1BB295;
transition: 0.2s ease;
}

.submit-btn input:hover {
background: #179b81;
}

.error {
  color: red;
  font-size: 0.875rem;

}.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-overlay img {
  max-height: 200px;
}
</style>