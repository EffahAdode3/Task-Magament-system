<template>
    <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
      <!-- App title section -->
      <div class="row m-1 p-4">
        <div class="col">
          <div class="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <i class="fa fa-check bg-primary text-white rounded p-2"></i>
            <u>Add Your Todo-s</u>
          </div>
        </div>
      </div>
      <!-- Create todo section -->
      <div class="row m-1 p-3">
        <div class="col col-11 mx-auto">
          <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div class="">
              <textarea
                class="form-control"
                placeholder="Add new .."
                id="floatingTextarea2"
                v-model="newTodo"
                style="height: 100px"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="container my-4">
        <div class="row">
          <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
            <label class="Category-label">Select Categories</label>
            <select v-model="category" class="custom-select w-100">
              <option value="Personal">Personal</option>
              <option value="I.T Service">I.T Service</option>
              <option value="Networking">Networking</option>
              <option value="End User">End User</option>
              <option value="Cyber-Security">Cyber-Security</option>
            </select>
          </div>
          <div class="col-12 col-md-6 d-flex align-items-center">
            <label for="start" class="date-label">Due Date:</label>
            <input
              v-model="deadline"
              type="date"
              id="start"
              name="trip-start"
              class="date-input w-100"
            />
          </div>
        </div>
        <div class="container my-4">
          <div class="row">
            <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
              <label class="Category-label">Set Reminder</label>
              <select v-model="reminderInterval" class="custom-select w-100">
                <option value="1d">1 Day</option>
                <option value="2d">2 Days</option>
                <option value="3d">3 Days</option>
                <option value="4d">4 Days</option>
                <option value="5d">5 Days</option>
                <option value="1w">1 Week</option>
                <option value="2w">2 Weeks</option>
                <option value="1m">1 Month</option>
              </select>
            </div>
            <div class="col-12 col-md-6 d-flex align-items-center">
              <label for="fileUpload" class="file-label">Upload File:</label>
              <input
                type="file"
                class="form-control-file"
                id="fileUpload"
                @change="handleFileUpload"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-auto px-0 mx-0 mr-2 d-flex justify-content-center">
        <button @click="addTodo" :disabled="loading" type="button" class="btn btn-primary">
          <span v-if="loading">Adding...</span>
          <span v-else>Add</span>
        </button>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import { base_url } from '../constant';
import swal from 'sweetalert';
import AuthMixin from '../authMixin';
import moment from 'moment';

export default {
  mixins: [AuthMixin],
  data() {
    return {
      newTodo: '',
      category: '',
      deadline: '',
      reminderInterval: '',
      fileName: '',
      documents: null, // File data
      loading: false, // Loading state
    };
  },
  methods: {
    handleFileUpload(event) {
      this.documents = event.target.files[0];
      console.log(this.documents)
      this.fileName = event.target.files[0].name;
      console.log(this.fileName)
    },

    resetFileInput() {
      // Recreate the file input element
      const fileInput = document.getElementById('fileUpload');
      fileInput.value = ''; // Clear the value of the input
    },
    addTodo() {
    //   if (!this.category || !this.deadline || !this.newTodo || !this.reminderInterval) {
    //     swal('All Fields Are Required');
    //     return;
    //   }

      const reminderMap = {
        '1d': { unit: 'days', amount: 1 },
        '2d': { unit: 'days', amount: 2 },
        '3d': { unit: 'days', amount: 3 },
        '4d': { unit: 'days', amount: 4 },
        '5d': { unit: 'days', amount: 5 },
        '1w': { unit: 'weeks', amount: 1 },
        '2w': { unit: 'weeks', amount: 2 },
        '1m': { unit: 'months', amount: 1 },
      };

      const reminder = reminderMap[this.reminderInterval];
      if (!reminder) {
        swal('Invalid reminder interval');
        return;
      }

      const { unit, amount } = reminder ;
      const reminderTime = moment(this.deadline).subtract(amount, unit).format('YYYY-MM-DD');

      const formData = new FormData();
      formData.append('newTodo', this.newTodo);
      formData.append('category', this.category);
      formData.append('deadline', this.deadline);
      formData.append('reminderTime', reminderTime);
      formData.append('statuses', 'Pending');
      if (this.documents) {
        formData.append('documents', this.documents);
      }

      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      console.log(token);

      // Set loading to true when request starts
      this.loading = true;

      axios.post(`${base_url}/todoList`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('Todo added:', response.data);
          swal('Your To-do Task is Created');
          this.newTodo = '';
          this.category = '';
          this.deadline = '';
          this.reminderInterval = '';
          this.resetFileInput();
          this.loading = false;
        })
        .catch(error => {
          console.error('There was an error adding the todo:', error);
          this.loading = false;
        });
    },
  },
};
</script>


<style scoped>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.6;
}

.add-todo-input,
.edit-todo-input {
  outline: none;
}

.add-todo-input:focus,
.edit-todo-input:focus {
  border: none !important;
  box-shadow: none !important;
}

.view-opt-label,
.date-label {
  font-size: 0.8rem;
}
.edit-todo-input {
  font-size: 1.7rem !important;
}
.todo-actions {
  visibility: hidden !important;
}

.todo-item:hover .todo-actions {
  visibility: visible !important;
}

.todo-item.editing .todo-actions .edit-icon {
  display: none !important;
}
.custom-select {
  background-color: #f8f9fa;
  border: 2px solid blue;
  border-radius: 4px;
  color: blue;
  font-weight: bold;
}
.custom-select:focus {
  border-color: blue;
  box-shadow: none;
}

.Category-label {
  font-size: 1em;
  font-weight: bold;
  margin-right: 10px;
}
.date-label {
  font-size: 1em;
  font-weight: bold;
  margin-right: 10px;
}

.custom-select {
  font-size: 1em;
  padding: 5px;
  border: 2px solid blue;
  border-radius: 4px;
}
.date-input {
  font-size: 1em;
  padding: 5px;
  border: 2px solid blue;
  border-radius: 4px;
}
.date-input:focus {
  border-color: blue;
  box-shadow: none;
}

.file-label {
  font-size: 1em;
  font-weight: bold;
  margin-right: 10px;
}

.form-control-file {
  font-size: 0.8em;
  padding: 10px;
  border: 2px solid blue;
  border-radius: 4px;
}
</style>
