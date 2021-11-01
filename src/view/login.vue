<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <div style="height: 80px">
          <v-alert v-if="error" type="error" @click="error = false"
            >Неверный логин или пароль</v-alert
          >
        </div>
        <v-card class="pa-2">
          <v-form @submit="login">
            <v-text-field
              type="text"
              id="login"
              v-model="username"
              solo
              dense
              placeholder="Логин"
            />
            <v-text-field
              type="password"
              id="current-password"
              v-model="password"
              solo
              dense
              placeholder="Пароль"
            />
            <v-btn block type="submit">Логин</v-btn>
          </v-form>
          <v-btn
            block
            class="mt-4"
            @click="$router.push({ path: 'registration' })"
            >Регистрация</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      error: false,
    };
  },
  created() {
    this.$auth
      .fetch()
      .then(() => {
        console.log(this.$auth.user());
        this.$router.push("/");
      })
      .catch(() => {
        this.$auth.logout({
          redirect: "/login",
        });
      });
  },
  methods: {
    login() {
      this.$auth
        .login({
          data: {
            username: this.username,
            password: this.password,
          },
          redirect: "/",
          fetchUser: true,
        })
        .then()
        .catch((err) => {
          if (err.response.status === 401) {
            this.error = true;
          }
          if (err.response.status === 500) {
            this.error = true;
          }
        });
    },
  },
};
</script>

<style scoped></style>
