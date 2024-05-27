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
                <div class="col">
                    <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new ..">
                </div>
                <div class="col-auto px-0 mx-0 mr-2">
                    <button type="button" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-auto d-flex align-items-center">
            <!-- <label class="text-secondary my-2 pr-2 view-opt-label">Categories</label> -->
            <select class="custom-select custom-select-sm btn my-2">
                <option selected disabled>Select Categories Applied For</option>
                <option value="personal">Personal</option>
                <option value="I.T Service">I.T Service </option>
                <option value="Networking">Networking</option>
                <option value="End User">End User</option>
                <option value="Cyber-Security ">Cyber-Security</option>
            </select>
        </div>
        <div class="col-auto d-flex align-items-center px-1 pr-3">
            <label for="start">Deadline          : </label> 
         <input type="date" id="start" name="trip-start"/>
        </div>
    <div class="p-2 mx-4 border-black-25 border-bottom"></div>
    <div class="row m-1 p-3 px-5 justify-content-end">
        <div class="col-auto d-flex align-items-center px-1 pr-3">
        </div>
    </div>
 
    <div class="row mx-1 px-5 pb-3 w-80">
        <div class="col mx-auto">
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      currentDate: this.formatDate(new Date())
    };
  },
  methods: {
    formatDate(date) {
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  }
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
</style>



