<template>
  <v-app>
    <v-app-bar app elevation="2">
      <v-app-bar-nav-icon v-if="$auth.user()" @click="drawer = true"
        ><v-icon large>mdi-menu</v-icon></v-app-bar-nav-icon
      >
      <v-toolbar-title
        @click="$router.push({ path: '/' })"
        style="cursor: pointer"
      >
        Shop
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="$auth.user()" @click="logout">Выйти</v-btn>
      <v-btn
        v-else-if="$route.name != 'login'"
        @click="$router.push({ path: '/login' })"
        >Войти</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list-item>
        <v-list-item-content>
          <template v-for="link of links">
            <router-link
              v-show="show_link(link.permissions)"
              :key="link.path"
              :to="{ name: link.path }"
              class="link"
              active-class="selected"
              exact
              >{{ link.title }}</router-link
            >
          </template>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    links() {
      return [
        {
          title: "Выбор товара",
          path: "general",
        },
        {
          title: "Личный кабинет",
          path: "cabinet",
        },
        {
          title: "История заказов",
          path: "history",
          permissions: ["client"],
        },
        {
          title: "Создание личных кабинетов",
          path: "cabinetFactory",
          permissions: ["admin", "owner"],
        },
      ];
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("refresh_token");
      this.$auth.logout({}).then();
    },
    show_link(permissions) {
      if (permissions === undefined) return true;

      for (let permission of permissions) {
        if (this.$auth.check(permission)) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.link {
  text-decoration: none;
  color: black !important;

  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;

  & div {
    padding-left: 20px;
  }

  &:hover {
    background-color: #e4e4e4;
  }

  &.selected {
    background-color: #d4d4d4;
  }
}
</style>
