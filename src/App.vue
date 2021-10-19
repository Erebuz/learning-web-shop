<template>
  <v-app>
    <the-app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TheAppBar from "@/components/theAppBar";
export default {
  name: "App",
  components: { TheAppBar },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
