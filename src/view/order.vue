<template>
  <v-container> Оформление заказа {{ par }} {{ summ }} </v-container>
</template>

<script>
export default {
  name: "order",
  props: ["summ"],
  computed: {
    par() {
      return this.$route.params;
    },
  },
};
</script>

<style scoped></style>
