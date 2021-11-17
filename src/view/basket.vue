<template>
  <div>
    <v-btn @click="$router.push({ name: 'order' })">
      Перейти к оформлению</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "basket",
};
</script>

<style scoped></style>
