<template>
  <v-container>
    <Navbar />
    <v-row>
      <v-col class="text-center">
        <h1>Subject Details</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToSubjectForm">Add Subject</v-btn>
        <v-data-table
          :headers="headers"
          :items="subjects"
          class="elevation-1"
          item-key="subjectId"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn color="blue" @click="navigateToEnrolledStudents(item.subjectId)" class="mr-2">View Students</v-btn>
            <v-btn color="green" @click="navigateToUpdateSubject(item.subjectId)" class="mr-2">Update</v-btn>
            <v-btn color="red" @click="deleteSubject(item.subjectId)">Delete</v-btn>
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
  name: "SubjectList",
  components: {
    Navbar,
  },
  data() {
    return {
      headers: [
        { text: "Subject ID", value: "subjectId" },
        { text: "Subject Name", value: "subjectName" },
        { text: "Credits", value: "credits" },
        { text: "Actions", value: "actions", sortable: false },
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
        const response = await axios.get(`${BASE_URL}/api/Subject/List`);
        this.subjects = response.data.data.subjects;
        console.log("Subject Data", this.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    },

    navigateToSubjectForm() {
      this.$router.push("/subject/add");
    },

    navigateToUpdateSubject(subjectId) {
      this.$router.push(`/subject/update/${subjectId}`);
    },

    navigateToEnrolledStudents(subjectId) {
      this.$router.push(`/subject/enrolledStudents/${subjectId}`);
    },

    async deleteSubject(subjectId) {
      try {
        await axios.delete(`${BASE_URL}/api/Subject/${subjectId}`);
        this.fetchSubjects(); // Refresh the list after deletion
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
