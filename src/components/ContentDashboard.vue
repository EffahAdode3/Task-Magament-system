<template>
    <div>
    <br>
    <br>
    <br>
 <!-- <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">To Do</th>
      <th scope="col">Categories</th>
      <th scope="col">Deadline</th>
      <th scope="col">Created At</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(toTolist, index) in TOListDos" :key="index">
      <th scope="row">{{ index }}</th>
      <td>{{toTolist.newTodo}}</td>
      <td>{{toTolist. category}}</td>
      <td>{{toTolist.deadline}}</td>
      <td>{{ toTolist.createdAt }}</td>
    </tr>

    
  </tbody>
</table> -->
<div class="card" v-for="(toTolist, index) in TOListDos" :key="index" >
  <h5 class="card-header">{{ toTolist.createdAt }}</h5>
  <div class="card-body">
    <h5 class="card-title">{{toTolist. category}}</h5>
    <p class="card-text">{{toTolist.newTodo}}</p>
    <a href="#" class="btn btn-secondary">{{toTolist.deadline}}</a>
  </div>
  <br>
  <br>
  <br>
</div>
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
       }

    }

       

     </script>

<!-- <style scoped>

.table {
    margin: 0 auto;
    width: 50%;
    border-collapse: collapse;
}
</style> -->