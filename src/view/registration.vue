<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <v-form ref="form" @submit.prevent="register">
          <h4>Заполните поля для регистрации</h4>
          <user-register v-model="user" />
          <v-btn block type="submit">Зарегистрироваться</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserRegister from "@/components/userRegister";
export default {
  name: "registration",
  components: { UserRegister },
  data() {
    return {
      user: {
        mail: "",
        login: "",
        password: "",
        firstname: "",
        lastname: "",
        phone_number: "",
        address: {
          city: "",
          street: "",
          build: "",
          apartment: "",
        },
        birth_date: "",
      },
    };
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.$http
          .post("/reg/user", this.user)
          .then(() => this.clear_data())
          .then(() => this.$router.push({ path: "/login" }));
      }
    },
    clear_data() {
      this.user = {
        mail: "",
        login: "",
        password: "",
        firstname: "",
        lastname: "",
        phone_number: "",
        address: {
          city: "",
          street: "",
          build: "",
          apartment: "",
        },
        birth_date: "",
      };
    },
  },
};
</script>

<style scoped></style>
