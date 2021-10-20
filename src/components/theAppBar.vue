<template>
  <div>
    <v-app-bar app elevation="2">
      <v-toolbar-title> Shop </v-toolbar-title>
      <v-spacer />
      <v-btn @click="logout">Выйти</v-btn>
    </v-app-bar>
    <nav>
      <router-link
        v-for="link in links"
        :key="link.path"
        :to="{ name: link.path }"
        class="ma-2"
        >{{ link.title }}</router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: "theAppBar",
  data() {
    return {
      links: [
        {
          title: "General",
          path: "general",
        },
        {
          title: "Admin",
          path: "admin",
        },
        {
          title: "User",
          path: "user",
        },
      ],
    };
  },
  methods: {
    logout() {
      this.$auth.logout({}).then();
    },
  },
};
</script>

<style scoped></style>
