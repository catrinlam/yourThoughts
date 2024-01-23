<template>
  <!--  <nav>-->
  <!--    <router-link to="/">Home</router-link> |-->
  <!--&lt;!&ndash;    <router-link :to="{name: 'HomeView'}">Home</router-link>&ndash;&gt;-->
  <!--&lt;!&ndash;    <router-link :to="{name: 'AboutView'}">About</router-link>&ndash;&gt;-->
  <!--    <router-link to="/about">About</router-link>-->
  <!--  </nav>-->
  <!--  <nav class="bg-teal-100 dark:bg-slate-900 px-2 sm:px-4 border-b-[3px] border-black dark:border-white text-black dark:text-white"-->
  <!--       id="nav-vue">-->
  <!--    <div class="container mx-auto flex flex-wrap items-center justify-between h-full">-->
  <!--      <span class="text-2xl font-bold">YourThoughts</span>-->

  <!--&lt;!&ndash;      <router-link to="/" class="pl-4 transition focus:ring-4 focus:outline-none focus:ring-blue-400">&ndash;&gt;-->
  <!--&lt;!&ndash;        <span class="text-2xl font-bold">YourThoughts</span>&ndash;&gt;-->
  <!--&lt;!&ndash;      </router-link>&ndash;&gt;-->
  <!--      <div class="w-auto" id="navbar-default">-->
  <!--        <ul class="flex flex-col p-4 md:space-x-8 md:mt-0 md:flex-row md:border-0 md:text-sm md:font-medium">-->
  <!--          <li>-->
  <!--            <a href="/settings/"-->
  <!--               class="transition focus:ring-4 focus:outline-none focus:ring-blue-400 block rounded py-2 pr-4 pl-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"><i-->
  <!--                class="fa fa-cog scale-150 pr-2" aria-hidden="true"></i>Settings</a>-->
  <!--          </li>-->
  <!--        </ul>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </nav>-->
  <Sidebar />
  <h1>YourThoughts</h1>
  <!--      <ul>-->
  <!--        <li>Dashboard</li>-->
  <!--        <li>Results</li>-->
  <!--        <li>Log Out</li>-->
  <!--      </ul>-->
  <router-view/>
</template>

<style lang="scss">
.app {
  display: flex;
}

//<!--#app {-->
//<!--  font-family: Avenir, Helvetica, Arial, sans-serif;-->
//<!--  -webkit-font-smoothing: antialiased;-->
//<!--  -moz-osx-font-smoothing: grayscale;-->
//<!--  text-align: center;-->
//<!--  color: #2c3e50;-->
//<!--}-->
//
//<!--nav {-->
//<!--  padding: 30px;-->
//
//<!--  a {-->
//<!--    font-weight: bold;-->
//<!--    color: #2c3e50;-->
//
//<!--    &.router-link-exact-active {-->
//<!--      color: #42b983;-->
//<!--    }-->
//<!--  }-->
//<!--}-->
</style>
<script>
import Sidebar from '@/components/sidebar/SideBar.vue'
export default {
  components: { Sidebar }
}

</script>
