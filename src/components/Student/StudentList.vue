<template>
  <v-container>
    <Navbar />
    <v-row>
      <v-col class="text-center">
        <h1>Student Details</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToStudentForm">Add Student</v-btn>
        <v-data-table
          :headers="headers"
          :items="students"
          class="elevation-1"
          item-key="studentId"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="blue" @click="navigateToEnrolledSubjects(item.studentId)" class="mr-2">View Subjects</v-btn>
            <v-btn color="green" @click="navigateToUpdateStudent(item.studentId)" class="mr-2">Update</v-btn>
            <v-btn color="red" @click="deleteStudent(item.studentId)">Delete</v-btn>
          </template>
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
  name: "StudentList",
  components: {
    Navbar,
  },
  data() {
    return {
      headers: [
        { text: "Student ID", value: "studentId" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Date of Birth", value: "dateOfBirth" },
        { text: "Actions", value: "actions", sortable: false },
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
        const response = await axios.get(`${BASE_URL}/api/Student/List`);
        this.students = response.data.data.students;
        console.log("Student Data", this.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
    navigateToStudentForm() {
      this.$router.push("/student/add");
    },
    navigateToEnrolledSubjects(studentId) {
      this.$router.push(`/student/enrolledSubjects/${studentId}`);
    },
    navigateToUpdateStudent(studentId) {
      this.$router.push(`/student/update/${studentId}`);
    },
    async deleteStudent(studentId) {
      try {
        await axios.delete(`${BASE_URL}/api/Student/${studentId}`);
        this.fetchStudents(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting student:", error);
      }
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
