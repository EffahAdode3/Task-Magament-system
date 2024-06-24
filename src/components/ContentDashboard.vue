<template>
  <div>
    <br>
    <br>
    <br>
    <!-- <table class="table">
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="toTolist in TOListDos" :key="toTolist.id">
          <td>{{ new Date(toTolist.createdAt).toDateString() }}</td>
          <td>{{ toTolist.category }}</td>     
          <td>
         <span @click="showFullText(toTolist.newTodo)"
        :title="toTolist.newTodo"
        class="truncate-text">
        {{truncateText(toTolist.newTodo)}}
        </span>
       </td>


              <td :class="{'overdue': isOverdue(toTolist.deadline)}">
            {{ new Date(toTolist.deadline).toDateString() }}
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
        </tr>
      </tbody>
    </table>  -->

    <h1 class="archive-heading">My To-Do Lists</h1>

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
          <th scope="col">Delet/Edit</th>
          <th scope="col">Assign</th>
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
        <button class="btn btn-danger btn-sm" @click="deleteTodo(toTolist.id)">Delete</button>
        <button class="btn btn-primary btn-sm" @click="editTodo(toTolist)">Edit</button>
      </td>

      <td>
        <button class="btn btn-secondary btn-sm" @click="openAssignModal(toTolist.id)">Assign</button>
      </td>


        </tr>
      </tbody>
    </table>



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
          <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</div>


<!-- Assign Modal -->
<!-- <div class="modal fade" id="assignModal" tabindex="-1" aria-labelledby="assignModalLabel" aria-hidden="true" ref="assignModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="assignModalLabel">Assign To-Do List</h5>
            <button type="button" class="btn-close" @click="closeAssignModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" class="form-control" v-model="searchEmail" @input="searchUsers" placeholder="Search by email">
            <ul class="list-group mt-2">
              <li class="list-group-item" v-for="user in searchedUsers" :key="user.id" @click="selectUser(user.email)">
                {{ user.email }}
              </li>
            </ul>
            <div class="mt-3">
              <h6>Selected Users</h6>
              <ul class="list-group">
                <li class="list-group-item" v-for="email in selectedUsers" :key="email">
                  {{ email }}
                </li>
              </ul>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeAssignModal">Close</button>
            <button type="button" class="btn btn-primary" @click="assignTodo">Assign</button>
          </div>
        </div>
      </div>
    </div> -->

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
            {{ user.email }}
          </li>
        </ul>
        <div class="mt-3">
          <h6>Selected Users</h6>
          <ul class="list-group">
            <li class="list-group-item" v-for="email in selectedUsers" :key="email">
              {{ email }}
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Close</button>
        <!-- <button type="button" class="btn btn-secondary" @click="closeAssignModal">Close</button> -->
        <button type="button" class="btn btn-primary"   @click="assignTodo">Assign</button>
      </div>
    </div>
  </div>
</div>


  </div>
</template>
<script>                              
  import axios from "axios";
 import {base_url} from '../constant';
 import AuthMixin from '../authMixin'
 import { Modal } from 'bootstrap';
   export default {
    mixins: [AuthMixin],
     data() {
       return {
        filteredTOListDos:'',
        TOListDos: [],        
        newTodo: '',
        searchEmail: '',
      searchedUsers: [],
      selectedUsers: [],
      currentTodoId: null,
        editFormData: {
        id: '',
        category: '',
        newTodo: '',
        deadline: ''
      }         
       };
     },

     mounted(){
      //   const token = localStorage.getItem('token');
      //  console.log(token)
      //    axios.get(`${base_url}/getAllToDo`, {
      //       headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      //    })
      //      .then((response) => {
      //        this.TOListDos = response.data.allToDoList;
      //        console.log(this.TOListDos);
      //        console.log(response.data);
      //      })
      //      .catch((error) => {
      //        console.error("Error fetching products:", error);
      //      });

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

mounted() {
  this.assignModalInstance = new bootstrap.Modal(this.$refs.assignModal, {
      backdrop: 'static',
      keyboard: false,
    });
  },
       methods: {
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

    // Truncate Text when To do List or New to do is more than 200
    truncateText(text, maxLength = 50) {
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
    return taskDeadline < currentDate;
  },

   // Edit todo method
   editTodo(todo) {
      this.editFormData = { ...todo };
      const modal = new bootstrap.Modal(document.getElementById('editTodoModal'));
      modal.show();
    },

    // Submit edit todo method
    submitEditTodo() {
      const token = localStorage.getItem('token');
      axios.put(`${base_url}/Updateatodo/${this.editFormData.id}`, this.editFormData, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}).then(() => {
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
  alert("Are sure you want to Logout");
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
},

openAssignModal(todoId) {
      this.currentTodoId = todoId;
      this.searchEmail = '';
      this.searchedUsers = [];
      this.selectedUsers = [];
      // this.$nextTick(() => {
      //   const assignModal = new bootstrap.Modal(this.$refs.assignModal);
      //   assignModal.show();
      // });
      console.log(this.currentTodoId, 'weqreqwrweqrkjwekfjqwehjkqwhrqkjwehrkjqwehrjkqwehkje');
      const assignModal = new Modal(this.$refs.assignModal);
      assignModal.show();
    },
    closeAssignModal() {
      if (this.assignModal) {
        this.assignModal.hide();
      }
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
    // assign
    assignTodo() {
  const token = localStorage.getItem('token');
  console.log('Selected Users:', this.selectedUsers);
  console.log('Current Todo ID:', this.currentTodoId);
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
      // Uncomment and use these lines as needed
      // console.log(this.selectedUsers, "User Emails");
      // console.log(this.currentTodoId, "Current Todo ID");
      this.closeAssignModal();
      // Refresh your to-do list data if necessary
    }
  })
  .catch(error => {
    console.error('Error assigning:', error.response ? error.response.data : error.message);
  });
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