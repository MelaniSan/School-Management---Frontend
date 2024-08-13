<template>
  <v-container>
    <Navbar />
    <v-row>
      <v-col class="text-center">
        <h1>Enrolled Students</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToSubjectList">Previous</v-btn>
        <v-data-table
          :headers="headers"
          :items="students"
          class="elevation-1"
          item-key="studentId"
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
  name: "EnrolledStudents",
  components: {
    Navbar,
  },
  data() {
    return {
      headers: [
        { text: "Student ID", value: "studentId" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Date Of Birth", value: "dateOfBirth" },
      ],
      students: [],
    };
  },
  created() {
    this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const subjectId = this.$route.params.id;
        console.log("Relevant SubjectId", subjectId);
        const response = await axios.get(`${BASE_URL}/api/Enrollment/${subjectId}/students`);
        this.students = response.data.data.students;
        console.log("Subject Data", this.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
    navigateToSubjectList() {
      this.$router.push("/subject");
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
