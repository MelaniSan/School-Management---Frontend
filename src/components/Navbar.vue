<template>
  <v-app-bar app color="grey lighten-3" dark>
    <v-toolbar-title class="green--text">School Management System</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Enrollment</v-btn>
    <v-btn text to="/student">Students</v-btn>
    <v-btn text to="/subject">Subjects</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.v-toolbar-title {
  font-weight: bold;
  font-size: 24px;
}
</style>
