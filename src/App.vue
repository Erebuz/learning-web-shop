<template>
  <v-app>
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
      <div v-if="$route.name === 'general'" class="d-flex">
        <div class="d-flex align-center mr-2">
          В корзине товаров: {{ basket_count }}
        </div>
        <v-btn :disabled="basket_count === 0" @click="go_to_bye"
          >В корзину</v-btn
        >
      </div>
      <v-btn v-else @click="$router.push({ path: '/' })"
        >Вернуться к выбору товара</v-btn
      >
      <v-spacer />
      <v-btn v-if="$auth.user()" @click="logout">Выйти</v-btn>
      <v-btn v-else @click="$router.push({ path: '/login' })">Войти</v-btn>
    </v-app-bar>
    <v-main>
      <router-view @flag="change_flag" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      flag: false,
    };
  },
  computed: {
    basket_count() {
      this.flag;

      let stor = JSON.parse(localStorage.getItem("basket"));
      if (!stor) return 0;

      let count = 0;
      let basket = JSON.parse(localStorage.getItem("basket"));
      basket.forEach((item) => {
        count += item.count;
      });

      return count;
    },
    links() {
      return [
        {
          title: "Выбор товара",
          path: "general",
        },
        {
          title: "Корзина",
          path: "basket",
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
        {
          title: "Просмотр истории клиентов",
          path: "clientsHistory",
          permissions: ["seller"],
        },
        {
          title: "Работа с товарами",
          path: "products",
          permissions: ["seller", "owner"],
        },
        {
          title: "Статистика товаров",
          path: "rating",
          permissions: ["owner"],
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
    change_flag() {
      this.flag = !this.flag;
    },
    go_to_bye() {
      this.$router.push({ name: "basket" });
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
