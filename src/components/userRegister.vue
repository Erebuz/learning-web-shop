<template>
  <div>
    <v-text-field
      v-model="user.mail"
      label="E-mail"
      placeholder="Обязательно"
      :rules="[rules.required, rules.is_mail]"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.login"
      label="Логин"
      placeholder="Обязательно"
      :rules="[rules.required]"
      outlined
      @change="refresh"
    >
    </v-text-field>
    <v-text-field
      v-model="user.password"
      type="password"
      autocomplete="new-password"
      label="Пароль"
      placeholder="Обязательно"
      :rules="isEdit ? [] : [rules.required]"
      outlined
      @change="refresh"
    />
    <v-text-field
      value=""
      type="password"
      autocomplete="new-password"
      label="Подтверждение пароля"
      placeholder="Обязательно"
      :rules="[rules.password_confirm]"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.firstname"
      label="Имя"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.lastname"
      label="Фамилия"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.phone_number"
      label="Телефон"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.address.city"
      label="Город"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.address.street"
      label="Улица"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.address.build"
      label="Строение"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.address.apartment"
      label="Квартира"
      outlined
      @change="refresh"
    />
    <v-text-field
      v-model="user.birth_date"
      label="День рождения"
      outlined
      @change="refresh"
    />
  </div>
</template>

<script>
export default {
  name: "userRegister",
  props: ["value", "isEdit"],
  data() {
    return {
      user: this.value,
      rules: {
        required: (val) => val !== "" || "Обязательное поле",
        is_mail: (val) =>
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val) ||
          "Неверный формат",
        password_confirm: (val) =>
          val == this.user.password || "Пароли не совпадают",
      },
    };
  },
  watch: {
    value() {
      this.user = this.value;
    },
  },
  methods: {
    refresh() {
      this.$emit("input", this.user);
    },
  },
};
</script>

<style scoped></style>
