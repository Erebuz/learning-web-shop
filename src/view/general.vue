<template>
  <div>
    <div>{{ user }}</div>
    <v-btn @click="test">Click</v-btn>
  </div>
</template>

<script>
export default {
  name: "general",
  data() {
    return {};
  },
  created() {
    console.log(this.$auth);
  },
  computed: {
    user() {
      return this.$auth.user();
    },
  },
  methods: {
    test() {
      this.$http.get("/").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped></style>