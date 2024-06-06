<template>
    <div>
    <br>
    <br>
    <br>
 <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">To Do</th>
      <th scope="col">Categories</th>
      <th scope="col">Due Date</th>
      <th scope="col">Created At</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(toTolist, index) in TOListDos" :key="index">
      <th scope="row">{{ index }}</th>
      <td>{{toTolist.newTodo}}</td>
      <td>{{toTolist. category}}</td>
      <td>{{toTolist.deadline}}</td>
      <td>{{ toTolist.formattedCreatedAt }}</td>
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


            if (response.data === "Token has expired" ){
        localStorage.clear();
        this.$router.push('/login');
      }
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

<style scoped>

/* .table {
    margin: 0 auto;
    width: 50%;
    border-collapse: collapse;
} */

.card{
  position: relative;
}
</style>