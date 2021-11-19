<template>
  <v-container>
    <v-col cols="8" offset="2">
      <v-card>
        <v-card-title>Оформление заказа</v-card-title>
        <v-card-text
          >Вы заказали товаров на сумму: <b>{{ summ }} руб.</b> </v-card-text
        ><v-card-text
          >Введите номер телефона, чтобы наш менеджер мог с вами
          связаться</v-card-text
        >
        <v-form ref="form" @submit.prevent="send_order">
          <v-card-text>
            <v-text-field
              v-model="phone"
              style="width: 500px; margin: 0 auto"
              :rules="[required]"
              label="Номер телефона"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn type="submit" block>Заказать</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "order",
  props: ["summ"],
  data() {
    return {
      phone: "",
      required: (val) => val != "" || "Обязательно",
      error: false,
    };
  },
  created() {
    this.refresh_data();
  },
  methods: {
    refresh_data() {
      if (this.$auth.check()) {
        this.$http.get("/get_user_data").then((res) => {
          this.phone = res.data.phone_number;
        });
      }
    },
    send_order() {
      if (this.$refs.form.validate()) {
        let basket = JSON.parse(localStorage.getItem("basket"));

        let req;
        if (this.$auth.check()) {
          req = this.$http.post("/order/create_auth", { basket });
        } else {
          req = this.$http.post("/order/create", { basket, phone: this.phone });
        }

        req
          .then(() => {
            localStorage.removeItem("basket");
            this.$emit("flag");
            this.$router.push({ name: "general" });
          })
          .catch(() => this.error - true);
      }
    },
  },
};
</script>

<style scoped></style>
