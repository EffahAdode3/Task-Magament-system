<template>
    <div>
    <br>
    <br>
    <br>
 <table class="table">
  <thead>
    <tr>
      <!-- <th scope="col">#</th> -->
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
      <th scope="col">Comments</th>
      <th scope="col"> Statuses</th> 
    </tr>
  </thead>
  <tbody>
    <tr v-for="(toTolist, index) in TOListDos" :key="index">
      <td>{{ new Date(toTolist.createdAt).toDateString() }}</td>
      <td>{{toTolist. category}}</td>
      <td>{{toTolist.newTodo}}</td>
      <td>{{new Date(toTolist.deadline).toDateString()}}</td>
      <!-- <th scope="row">{{ index }}</th> -->  
    </tr>
  </tbody>
</table>
</div>
</template>
<script>                              
  import axios from "axios";
 import {base_url} from '../constant'
   export default {
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
        }
      }
    }
     </script>
<style scoped>
.card{
  position: relative;
}
</style>