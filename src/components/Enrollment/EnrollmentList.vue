<template>
  <v-container>
    <Navbar />
    <v-row>
      <v-col class="text-center">
        <h1>Enrollment Details</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToEnrollmentForm">Enroll</v-btn>
        <v-data-table
          :headers="headers"
          :items="enrollments"
          class="elevation-1"
          item-key="enrollmentId">

          <template v-slot:item.subjects="{ item }">
            <div v-for="subject in item.subjects" :key="subject.subjectId">
              {{ subject.subjectName }}
            </div>
          </template>

          <template v-slot:item.enrollmentDate="{ item }">
            {{ formatDate(item.enrollmentDate) }}
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
  name: "EnrollmentList",
  components: {
    Navbar,
  },
  data() {
    return {
      headers: [
        { text: "Enrollment ID", value: "enrollmentId" },
        { text: "Student Name", value: "studentName" },
        { text: "Subject IDs", value: "subjects" },
        { text: "Enrollment Date", value: "enrollmentDate" }
      ],
      enrollments: [],
    };
  },
  created() {
    this.fetchEnrollments();
  },

  methods: {
    async fetchEnrollments() {
      try {
        const response = await axios.get(`${BASE_URL}/api/Enrollment/enrollmentList`);
        this.enrollments = response.data.data.enrollments;
        console.log("Enrollments Data", this.enrollments);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    },
    navigateToEnrollmentForm() {
      this.$router.push("/enroll");
    },
    formatDate(dateString) {
      return dateString.split('T')[0];
    }
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
