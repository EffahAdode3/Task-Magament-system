<template>
    <div>
      <br>
      <br>
      <br>

  
      <h1 class="archive-heading">MY Archives</h1>
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
            <td>
              {{ new Date(toTolist.deadline).toDateString() }}
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
    </div>
  </template>

  <script>                              
    import axios from "axios";
   import {base_url} from '../constant';
   import AuthMixin from '../authMixin'
     export default {
      mixins: [AuthMixin],
       data() {
         return {
          TOListDos: [],        
          newTodo: '', // To hold the full text            
         };
       },
  
       created(){
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
  
            /// filtering To check if the to do Due date is pass and Statues === Completed 
  
            computed: {
                filteredTOListDos() {
  const currentDate = new Date();
  return this.TOListDos.filter(todo => {
    const dueDate = new Date(todo.deadline);
    return todo.statuses === 'Completed' && currentDate > dueDate;
  });
},
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
      
  
    //   isOverdue(deadline) {
    //   const currentDate = new Date();
    //   const taskDeadline = new Date(deadline);
    //   return taskDeadline < currentDate;
    // },

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
  color: #ff6347; /* Attractive tomato color */
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