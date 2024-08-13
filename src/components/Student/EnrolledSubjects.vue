<template>
  <v-container>
    <Navbar />
    <v-row>
      <v-col class="text-center">
        <h1>Subjects Enrolled By Student</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToStudentList">Previous</v-btn>
        <v-data-table
          :headers="headers"
          :items="subjects"
          class="elevation-1"
          item-key="subjectId"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
import { BASE_URL } from "../../config";

export default {
  name: "EnrolledSubjects",
  components: {
    Navbar,
  },
  data() {
    return {
      headers: [
        { text: "Subject ID", value: "subjectId" },
        { text: "Subject Name", value: "subjectName" },
        { text: "Credits", value: "credits" },
      ],
      subjects: [],
    };
  },
  created() {
    this.fetchSubjects();
  },
  methods: {
    async fetchSubjects() {
      try {
        const studentId = this.$route.params.id;
        console.log("Relevant studentId", studentId);
        const response = await axios.get(`${BASE_URL}/api/Enrollment/${studentId}/subjects`);
        this.subjects = response.data.data.subjects;
        console.log("Subject Data", this.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    },
    navigateToStudentList() {
      this.$router.push("/student");
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 32px;
  margin-bottom: 20px;
}

.align-left {
  float: left;
}
</style>
