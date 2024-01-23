<!--<template>-->
<!--  <div class="home">-->
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent } from 'vue'-->
<!--import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src-->

<!--export default defineComponent({-->
<!--  name: 'HomeView',-->
<!--  components: {-->
<!--    HelloWorld-->
<!--  }-->
<!--})-->
<!--</script>-->
<template>
  <div id="home">
    <div class="main-content">
      <div class="module-selection">
        <select>
          <option>Module</option>
          <!-- Add your module options here -->
        </select>
        <button>Fill the form</button>
      </div>
      <div class="filled-modules">
        <h2>Hi! You have filled out these:</h2>
        <ul>
          <li>Software Engineering and Professional Practice</li>
          <li>Operating Systems and Systems Programming</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
  // Add your Vue.js data and methods here
}
</script>

<style scoped>
#app {
  display: flex;
}
.sidebar {
  width: 20%;
  /* Add your styles for the sidebar here */
}
.main-content {
  width: 80%;
  /* Add your styles for the main content here */
}
</style>
