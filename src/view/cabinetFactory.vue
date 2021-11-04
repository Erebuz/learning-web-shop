<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <v-form ref="form" @submit.prevent="register">
          <h4>Заполните поля для регистрации</h4>
          <v-select
            v-model="role"
            :items="roles"
            item-text="name"
            item-value="role"
            label="Роль"
            outlined
          />
          <user-register name="her" v-model="user" />
          <v-btn block type="submit">Зарегистрироваться</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserRegister from "@/components/userRegister";
export default {
  name: "cabinetFactory",
  components: { UserRegister },
  data() {
    return {
      role: 4,
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
  computed: {
    roles() {
      let temp = [];
      if (this.$auth.check("admin")) {
        temp = [
          {
            name: "Администратор",
            role: 1,
          },
          {
            name: "Владелец",
            role: 2,
          },
          {
            name: "Продавец",
            role: 3,
          },
          {
            name: "Покупатель",
            role: 4,
          },
        ];
      }
      if (this.$auth.check("owner")) {
        temp = [
          {
            name: "Администратор",
            role: 1,
          },
          {
            name: "Продавец",
            role: 3,
          },
        ];
      }
      return temp;
    },
  },
  methods: {
    register() {
      let path;
      switch (this.role) {
        case 1: {
          path = "/reg/admin";
          break;
        }
        case 2: {
          path = "/reg/owner";
          break;
        }
        case 3: {
          path = "/reg/seller";
          break;
        }
        case 4: {
          path = "/reg/user";
          break;
        }
      }
      if (this.$refs.form.validate()) {
        this.$http.post(path, this.user).then(() => this.clear_data());
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
