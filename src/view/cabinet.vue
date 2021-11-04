<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <v-form ref="form" @submit.prevent="change_data">
          <h4>Тут вы можете изменить свои регистрационные данные</h4>
          <user-register name="me" v-model="user"></user-register>
          <v-btn block type="submit">Изменить данные</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserRegister from "@/components/userRegister";
export default {
  name: "cabinet",
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
  created() {
    this.refresh_data();
  },
  methods: {
    refresh_data() {},
    change_data() {
      if (this.$refs.form.validate()) {
        console.log("SET CHANGE");
      }
    },
  },
};
</script>

<style scoped></style>
