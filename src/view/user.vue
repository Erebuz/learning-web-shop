<template>
  <div>
    <div>User {{ user }}</div>
    <v-btn @click="test">Click</v-btn>
  </div>
</template>

<script>
export default {
  name: "user",
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
      this.$http.get("/user").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped></style>
