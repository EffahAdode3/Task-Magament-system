<template>
  <div>
    <br>
    <br>
    <br>
    <h1 class="archive-heading">Task Management Lists</h1> 
    <!-- Check if there are tasks -->
    <!-- <div v-if="filteredTOListDos.length === 0">
    <h3>
      <p class="text-center text-muted">No tasks are available at the moment. Please go to the sidebar and create a task.</p>
    </h3>  
    </div> -->
    <div v-if="isLoading">
      <h3>
        <p class="text-center text-muted">Loading tasks...</p>
      </h3>
    </div>

    <!-- Check if there are no tasks -->
    <div v-if="!isLoading && filteredTOListDos.length === 0">
      <h3>
        <p class="text-center text-muted">No tasks are available at the moment. Please go to the sidebar and create a task.</p>
      </h3>
    </div>
    
    <!-- Display the table if there are tasks -->
     <div v-else>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#" @click="fetchAllData()">All Category</a></li>
                <li><a class="dropdown-item" href="#" @click="fetchData('Personal')">Personal</a></li>
                <li><a class="dropdown-item" href="#" @click="fetchData('I.T Service')">I.T Service</a></li>
                <li><a class="dropdown-item" href="#" @click="fetchData('Networking')">Networking</a></li>
                <li><a class="dropdown-item" href="#" @click="fetchData('End User')">End User</a></li>
                <li><a class="dropdown-item" href="#" @click="fetchData('Cyber-Security')">Cyber-Security</a></li>
              </ul>
            </div>
          </th>
          <th scope="col">To Do Task</th>
          <th scope="col">Due Date</th>
          <th scope="col">Status</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>        
          <th scope="col">Assign</th>
          <th scope="col">Reminder</th>
          <th scope="col">Document</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="toTolist in filteredTOListDos" :key="toTolist.id">
          <td>{{ new Date(toTolist.createdAt).toDateString() }}</td>
          <td>{{ toTolist.category }}</td>  
          <td>
            <span @click="showFullText(toTolist.newTodo)"
                  :title="toTolist.newTodo"
                  class="truncate-text">
              {{truncateText(toTolist.newTodo)}}
            </span>
          </td>
          <td  :class="{'overdue': isOverdue(toTolist.deadline)}">
            {{new Date(toTolist.deadline).toDateString()}}
            <span v-if="isOverdue(toTolist.deadline)"> - Overdue!</span>
          </td>     
          <td>
            <div class="dropdown">
              <button :class="['btn dropdown-toggle', statusButtonClass(toTolist.statuses)]" type="button" id="statusDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                {{ toTolist.statuses }}
              </button>
              <ul class="dropdown-menu" aria-labelledby="statusDropdownButton">
                <li><a class="dropdown-item" href="#" @click="updateStatus(toTolist.id, 'Pending')">Pending</a></li>
                <li><a class="dropdown-item" href="#" @click="updateStatus(toTolist.id, 'Completed')">Completed</a></li>
                <li><a class="dropdown-item" href="#" @click="updateStatus(toTolist.id, 'In-Progress')">In-Progress</a></li>
              </ul>
            </div>
          </td>


          <td>
          <div v-if="canEditOrDelete(toTolist)">
            <button class="btn btn-primary btn-sm" @click="editTodo(toTolist)">Edit</button>
          </div>
          <div v-else>
            <button class="btn btn-primary btn-sm" disabled>Edit</button>
            <!-- <span class="text-muted">Not authorized</span> -->
          </div>
        </td>

          <td>
            <div>
          <!-- <div v-if="canEditOrDelete(toTolist)"> -->  
            <button class="btn btn-danger btn-sm" @click="deleteTodo(toTolist.id)">Delete</button>
          </div>
          <!-- </div> -->
          <!-- <div v-else> -->
            <!-- <button class="btn btn-danger btn-sm" disabled>Delete</button> -->
            <!-- <span class="text-muted">Not authorized</span> -->
          <!-- </div> -->
        </td>

      <td>
        <button class="btn btn-secondary btn-sm" @click="openAssignModal(toTolist.id)">Assign</button>
      </td>
      <td>
        {{ new Date(toTolist.reminderTime).toDateString() }}
      </td>
      <td>
            <!-- <a v-if="toTolist.documents" :href="`${toTolist.documents}`" download>Download</a> -->
            <a :href="`https://task-managment-system-backend-api.onrender.com/${toTolist.documents}`" target="_blank">{{toTolist.fileName}}</a>
            <!-- <a :href="`http://localhost:9878/${toTolist.documents}`" target="_blank">{{toTolist.fileName}}</a> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>

    <!-- Modal -->
    <div class="modal fade" id="todoModal" tabindex="-1" aria-labelledby="todoModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="todoModalLabel">Full To Do Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <textarea class="form-control" id="fullTodoText" v-model="newTodo" readonly style="height: 200px"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


    <!-- Edit Todo Modal -->
<div class="modal fade" id="editTodoModal" tabindex="-1" aria-labelledby="editTodoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editTodoModalLabel">Edit To-Do</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitEditTodo">
          <div class="mb-3">
  <label for="editTodoCategory" class="form-label">Category</label>
  <select class="form-select" id="editTodoCategory" v-model="editFormData.category">
    <option value="Personal">Personal</option>
    <option value="I.T Service">I.T Service</option>
    <option value="Networking">Networking</option>
    <option value="End User">End User</option>
    <option value="Cyber-Security">Cyber-Security</option>
  </select>
</div>
          <div class="mb-3">
            <label for="editTodoTask" class="form-label">To Do Task</label>
            <div class="modal-body">
            <textarea class="form-control" id="editTodoTask" v-model="editFormData.newTodo" style="height: 200px"></textarea>
          </div>
            <!-- <input type="text" class="form-control" id="editTodoTask" v-model="editFormData.newTodo"> -->
          </div>
          <div class="mb-3">
            <label for="editTodoDueDate" class="form-label">Due Date</label>
            <input type="date" class="form-control" id="editTodoDueDate" v-model="editFormData.deadline">
          </div>
          <div class="mb-3">
            <label for="editReminderInterval" class="form-label">Set Reminder</label>
            <select class="form-select" id="editReminderInterval" v-model="editFormData.reminderInterval">
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
          <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</div>
    <div class="modal fade" id="assignModal" tabindex="-1" aria-labelledby="assignModalLabel" aria-hidden="true" ref="assignModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="assignModalLabel">Assign To-Do List</h5>
        <!-- <button type="button" class="btn-close" @click="closeAssignModal" aria-label="Close"></button> -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" v-model="searchEmail" @input="searchUsers" placeholder="Search by email">
        <ul class="list-group mt-2">
          <li class="list-group-item" v-for="user in searchedUsers" :key="user.id" @click="selectUser(user.email)">
            <div>
        <h6 class="mb-0">{{ user.userName }}</h6>
        <small class="text-muted">{{ user.email }}</small>
      </div>
          </li>
        </ul>
        <div class="mt-3">
          <h6>Selected Users</h6>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="email in selectedUsers" :key="email">
              {{ email }}
              <button type="button" class="btn btn-danger btn-sm" @click="removeUser(email)">Remove</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
        <!-- <button type="button" class="btn btn-secondary" @click="closeAssignModal">Close</button> -->
        <button type="button" class="btn btn-primary"   @click="assignTodo" :disabled="loading">
          <span v-if="loading">Assigning...</span>
          <span v-else>Assign</span>
        </button>
      </div>
    </div>
  </div>
</div> 
</div>

</template>
<script>                              
  import axios from "axios";
 import {base_url} from '../constant';
 import AuthMixin from '../authMixin';
 import moment from 'moment';

   export default {
    mixins: [AuthMixin],
     data() {
       return {
        isLoading: true, 
        filteredTOListDos:'',
        TOListDos: [],        
        newTodo: '',
        searchEmail: '',
      searchedUsers: [],
      selectedUsers: [],
      // fileName:'',
      currentTodoId: null,
        editFormData: {
        id: '',
        category: '',
        newTodo: '',
        deadline: '',
        reminderInterval: '',    
        isLoading: true,  
      }         
       };
     },
     created(){
    this.fetchAllData();          
          },
/// filtering To check if the to do Due date is pass and Statues === Completed 
   computed: {
  filteredTOListDos() {
    console.log(this.TOListDos, "561345678899");
    const currentDate = new Date();
    console.log(currentDate)
    return this.TOListDos.filter(todo => {
      const dueDate = new Date(todo.deadline);
      console.log(dueDate, 'qwerrtyuiiuytrew');
      return !(todo.statuses === 'Completed' && currentDate > dueDate);
    });
  }
},
   methods: {

    // handleFileUpload(event) {
    //   // this.documents = event.target.files[0];
    //   // console.log(this.documents)
    //   this.fileName = event.target.files[0].name;
    //   console.log(this.fileName)
    // },

        // fetch Data using the Category
     fetchAllData(){
       const token = localStorage.getItem('token');
       console.log(token)
         axios.get(`${base_url}/getAllToDo`, {
            headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
         })
           .then((response) => {
             this.TOListDos = response.data.allToDoList;
             this.isLoading = false;
             console.log(this.TOListDos);
             console.log(response.data);
           })
           .catch((error) => {
             console.error("Error fetching products:", error);
           });
            
          },
        // fetching data using category
        fetchData(category) {
          const token = localStorage.getItem('token');
          console.log("Selected Category:", category);
          axios.get(`${base_url}/getTOdoByCategory/${category}`, {
            headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }})
            .then(response => {
              console.log("Fetched Data:", response.data);
              this.TOListDos = response.data.tasks;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },

 // update Status
        updateStatus(id, status) {
      const token = localStorage.getItem('token');
      axios.put(`${base_url}/updateStatus/${id}`, { status }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log("Status Updated:", response.data);
          // Update the status in the local state
          const item = this.TOListDos.find(todo => todo.id === id);
          if (item) {
            item.statuses = status;
          }
        })
        .catch(error => {
          console.error('Error updating status:', error);
        });
    },


 truncateText(text, maxLength = 50) {
  if (typeof text !== 'string') {
    return '';
  }
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  
  return text;
},

    // show full Text Code
    showFullText(text) {
      this.newTodo = text;
      var myModal = new bootstrap.Modal(document.getElementById('todoModal'));
      myModal.show();
    },
    
    // over  Date due
    isOverdue(deadline) {
    const currentDate = new Date();
    const taskDeadline = new Date(deadline);
    // return taskDeadline < currentDate;
    return currentDate > taskDeadline ;
  },

   // Edit todo method
   editTodo(todo) {
      this.editFormData = { ...todo };
      const modal = new bootstrap.Modal(document.getElementById('editTodoModal'));
      modal.show();
    },
 
    calculateReminderTime(deadline, reminderInterval) {
      const reminderMap = {
        '1d': { unit: 'days', amount: 1 },
        '2d': { unit: 'days', amount: 2 },
        '3d': { unit: 'days', amount: 3 },
        '4d': { unit: 'days', amount: 4 },
        '5d': { unit: 'days', amount: 5 },
        '1w': { unit: 'weeks', amount: 1 },
        '2w': { unit: 'weeks', amount: 2 },
        '1m': { unit: 'months', amount: 1 }
      };
      const { unit, amount } = reminderMap[reminderInterval];
      return moment(deadline).subtract(amount, unit).format('YYYY-MM-DD HH:mm:ss');
    },

    submitEditTodo() {
      let updatedTodoData = { ...this.editFormData };
      if (this.editFormData.reminderInterval) {
        const reminderTime = this.calculateReminderTime(this.editFormData.deadline, this.editFormData.reminderInterval);
        updatedTodoData = { ...updatedTodoData, reminderTime };
      }

      const token = localStorage.getItem('token');
      axios.put(`${base_url}/Updateatodo/${this.editFormData.id}`, updatedTodoData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        this.fetchAllData(); // Refresh data
        const modal = bootstrap.Modal.getInstance(document.getElementById('editTodoModal'));
        modal.hide();
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
    },

// delete to do 
deleteTodo(todoId) {
  if(window.confirm("Are you sure you want to delete this?")) {
  const token = localStorage.getItem('token');
  axios.delete(`${base_url}/deleteTodo/${todoId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log(response.data);
    // Update the local todos array by filtering out the deleted todo
    this.TOListDos = this.TOListDos.filter(todo => todo.id !== todoId);
  })
  .catch(error => {
    console.error('There was an error deleting the todo:', error);
    // Handle the error, e.g., show an error message
  });
}
},

openAssignModal(todoId) {
      this.currentTodoId = todoId;
      this.searchEmail = '';
      this.searchedUsers = [];
      this.selectedUsers = [];
      console.log(this.currentTodoId, 'weqreqwrweqrkjwekfjqwehjkqwhrqkjwehrkjqwehrjkqwehkje');
      const modal = new bootstrap.Modal(document.getElementById('assignModal'));
      modal.show();
},

    searchUsers() {
  const token = localStorage.getItem('token');
  axios.get(`${base_url}/getClientEmail/${this.searchEmail}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    this.searchedUsers = response.data.users;
  })
  .catch(error => {
    console.error('Error fetching search Users:', error);
  });
},


    selectUser(email) {
      if (!this.selectedUsers.includes(email)) {
        this.selectedUsers.push(email);
      }
    },

    // remove seleted email 
    removeUser(email) {
    this.selectedUsers = this.selectedUsers.filter(userEmail => userEmail !== email);
  },
    // assign
    assignTodo() {
  const token = localStorage.getItem('token');
  console.log('Selected Users:', this.selectedUsers);
  console.log('Current Todo ID:', this.currentTodoId);
  this.loading = true;
  axios.post(`${base_url}/assign/${this.currentTodoId}`, 
    { emails: this.selectedUsers },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
  .then(response => {
    if (response.status === 201) {
      console.log("Response data:", response.data);
      const modal = bootstrap.Modal.getInstance(document.getElementById('assignModal'));
      modal.hide();
      this.loading = false;
      // Refresh your to-do list data if necessary
    }
  })
  .catch(error => {
    console.error('Error assigning:', error.response ? error.response.data : error.message);
  });
},
/// canEditor not
canEditOrDelete(todo) {
    const currentUser = this.getCurrentUser();
    return todo.client_Id_As_Foreignkey === currentUser.id 
  },
  getCurrentUser() {
    // Fetch the current user details (you might be storing user details in localStorage or Vuex store)
    return JSON.parse(localStorage.getItem('user'));
  },

    // Color Change when is Pending, Completed and In-Progress
    statusButtonClass(status) {
      if (status === 'Pending') {
        return 'btn-danger';
      } else if (status === 'Completed') {
        return 'btn-success';
      } else if (status === 'In-Progress') {
        return 'btn-warning';
      }
      return 'btn-primary';
    }
  }
}
     </script>

<style scoped>

.card{
  position: relative;
}

.btn-danger {
  background-color: red;
  color: white;
}
.btn-success {
  background-color: green;
  color: white;
}
.btn-warning {
  background-color: orange;
  color: white;
}

.truncate-text {
  display: inline-block;
  max-width: 200px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.3s ease, color 0.3s ease; 
}

.truncate-text:hover {
  opacity: 0.7; 
  color: blue !important; 
}

.overdue {
  color: red;
  font-weight: bold;
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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