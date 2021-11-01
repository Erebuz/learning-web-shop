<template>
  <v-container>
    <v-row class="justify-center">
      <v-col class="col-6">
        <user-register />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserRegister from "@/components/userRegister";
export default {
  name: "registration",
  components: { UserRegister },
};
</script>

<style scoped></style>
