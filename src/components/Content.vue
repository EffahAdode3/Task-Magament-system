<template>   
    <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
    <!-- App title section -->
    <div class="row m-1 p-4">
        <div class="col">
            <div class="p-1 h1 text-primary text-center mx-auto display-inline-block">
                <i class="fa fa-check bg-primary text-white rounded p-2"></i>
                <u>My Todo-s</u>
            </div>
        </div>
    </div>
    <!-- Create todo section -->
    <div class="row m-1 p-3">
        <div class="col col-11 mx-auto">
            <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                <div class="">
  <textarea class="form-control" placeholder="Add new .." id="floatingTextarea2" v-model="newTodo"  style="height: 100px"></textarea>
  <!-- <label for="floatingTextarea2">Comments</label> -->
</div>
                <!-- <div class="col">
                    <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" v-model="newTodo"  placeholder="Add new ..">
                </div> -->
                <!-- <div class="col-auto px-0 mx-0 mr-2">
                    <button @click="addTodo" type="button" class="btn btn-primary">Add</button>
                </div> -->
            </div>
        </div>
    </div>
    <div class="container my-4">
        <div class="row">
            <div class="col-12 col-md-6 d-flex align-items-center mb-3 mb-md-0">
                <label class="Category-label">Select Categories</label>
                <select v-model="category"   class="custom-select  w-100" >
                    <option value="Personal">Personal</option>
                    <option value="I.T Service">I.T Service</option>
                    <option value="Networking">Networking</option>
                    <option value="End User">End User</option>
                    <option value="Cyber-Security">Cyber-Security</option>
                </select>
            </div>
            <div class="col-12 col-md-6 d-flex align-items-center">
                <label for="start" class="date-label">Due Date:</label>
                <input v-model="deadline" type="date" id="start" name="trip-start" class="date-input w-100"/>
            </div>
        </div>
    </div>
    <div class="col-auto px-0 mx-0 mr-2 d-flex justify-content-center">
    <button @click="addTodo" type="button" class="btn btn-primary">Add</button>
</div>

    <!-- <div class="p-2 mx-4 border-black-25 border-bottom"></div>
    <div class="row m-1 p-3 px-5 justify-content-end">
        <div class="col-auto d-flex align-items-center px-1 pr-3">
        </div>
    </div>  -->
    <!-- <div class="row mx-1 px-5 pb-3 w-80">
        <div class="col mx-auto">
        </div>
    </div> -->
</div>
</template>
<script>
import axios from 'axios';
import {base_url} from '../constant'
import swal from 'sweetalert';
export default {
  data() {
    return {
      newTodo: '',
      category: '',
      deadline: '',
    };
  },
  
methods: {
    addTodo() {
       
        if (!this.category || !this.deadline || !this.newTodo) {
            swal('All Fields Are Required');
            return;
        }
        const todoData = {
            newTodo: this.newTodo,
            category: this.category,
            deadline: this.deadline,
        };

        console.log(this.newTodo);
        console.log(this.category);
        console.log(this.deadline);

        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        console.log(token);

        axios.post(`${base_url}/todoList`, todoData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Todo added:', response.data);
                swal('Your To-do Task is Created');
                this.newTodo = '';
                this.category = '';
                this.deadline = '';
            })
            .catch(error => {
                console.error('There was an error adding the todo:', error);
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
            border: 2px solid #6c757d;
            border-radius: 4px;
            color: #343a40;
            font-weight: bold;
        }
        .custom-select:focus {
            border-color: #343a40;
            box-shadow: none;
        }

        .Category-label{
            font-size: 1em;
            font-weight: bold;
            margin-right: 10px;
        }
        .date-label {
            font-size: 1em;
            font-weight: bold;
            margin-right: 10px;
        }

        .custom-select{
            font-size: 1em;
            padding: 5px;
            border: 2px solid #6c757d;
            border-radius: 4px;
        }
        .date-input {
            font-size: 1em;
            padding: 5px;
            border: 2px solid #6c757d;
            border-radius: 4px;
        }
        .date-input:focus {
            border-color: #343a40;
            box-shadow: none;
        }
</style>



