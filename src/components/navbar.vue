<template>
    <div id="app">

      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
          <a class="navbar-brand" href="#">Staff Managment System</a>
          
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav  justify-content-end">
              <li class="nav-item active">
                  <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
              </li>
              <li class="nav-item">
                  <router-link class="nav-link" to="/add">Add Staffs</router-link>
              </li>
            </ul>
          </div>
      </nav>


    </div>
</template>


<script>
export default {
    
}
</script>