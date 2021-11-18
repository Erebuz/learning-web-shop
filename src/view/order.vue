<template>
  <v-container>
    <v-col cols="8" offset="2">
      <v-card>
        <v-card-title>Оформление заказа</v-card-title>
        <v-card-text
          >Вы заказали товаров на сумму: <b>{{ summ }} руб.</b> <br />Введите
          номер телефона, чтобы наш менеджер мог с вами связаться</v-card-text
        >
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "order",
  props: ["summ"],
};
</script>

<style scoped></style>
