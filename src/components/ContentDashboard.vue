<!-- <template>
    <div>
    <br>
    <br>
    <br>
 <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Date</th>
      <th scope="col">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
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

      <th scope="col"> Statuse</th> 
        
    </tr>
  </thead>
  <tbody>
    <tr v-for="toTolist in TOListDos" :key="toTolist.id">
    <td>{{ toTolist.id }}</td>
      <td>{{ new Date(toTolist.createdAt).toDateString() }}</td>
      <td>{{toTolist. category}}</td>
      <td>{{toTolist.newTodo}}</td>
      <td>{{new Date(toTolist.deadline).toDateString()}}</td>

      <td>
            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="statusDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
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
       methods: {
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
    }
  },
      }
    
     </script>

<style scoped>
.card{
  position: relative;
}

</style> -->


<template>
  <div>
    <br>
    <br>
    <br>
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Date</th>
          <th scope="col">
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
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
          <td>{{ toTolist.id }}</td>
          <td>{{ new Date(toTolist.createdAt).toDateString() }}</td>
          <td>{{ toTolist.category }}</td>
          <td>{{ toTolist.newTodo }}</td>
          <td>{{ new Date(toTolist.deadline).toDateString() }}</td>
          <td>
            <div class="dropdown">
              <button :class="getStatusButtonClass(toTolist.statuses)" type="button" id="statusDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
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
  </div>
</template>

<script>
import axios from "axios";
import { base_url } from '../constant';
import AuthMixin from '../authMixin';
export default {
  mixins: [AuthMixin],
  data() {
    return {
      TOListDos: [],
    };
  },
  created() {
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
  methods: {
    fetchData(category) {
      const token = localStorage.getItem('token');
      console.log("Selected Category:", category);
      axios.get(`${base_url}/getTOdoByCategory/${category}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
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
    getStatusButtonClass(status) {
      switch (status) {
        case 'Pending':
          return 'btn btn-danger dropdown-toggle'; // Red for Pending
        case 'Completed':
          return 'btn btn-warning dropdown-toggle'; // Yellow for Completed
        case 'In-Progress':
          return 'btn btn-primary dropdown-toggle'; // Blue for In-Progress
        default:
          return 'btn btn-secondary dropdown-toggle'; // Default color
      }
    }
  }
};
</script>

<style scoped>
.card {
  position: relative;
}
</style>
