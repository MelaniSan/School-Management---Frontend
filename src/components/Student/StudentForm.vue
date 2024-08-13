<template>
  <v-container>
    <Navbar />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">{{ isUpdateMode ? 'Update Student' : 'Add Student' }}</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToStudentList">Previous</v-btn>
        <v-card class="pa-6">
          <v-form ref="form" v-model="valid">
            <v-alert
              v-if="showAlert"
              type="success"
              closable
              @input="showAlert = false">
              {{ isUpdateMode ? 'Successfully updated' : 'Successfully created' }}
            </v-alert>

            <v-text-field
              v-model="firstName"
              label="First Name"
              :rules="[rules.required]"
              outlined>
            </v-text-field>

            <v-text-field
              v-model="lastName"
              label="Last Name"
              :rules="[rules.required]"
              outlined>
            </v-text-field>

            <v-row justify-content="flex-end" class="mt-4">
              <v-btn color="blue" class="mr-4" @click="saveStudent">{{ isUpdateMode ? 'Update' : 'Save' }}</v-btn>
              <v-btn color="red" @click="clearForm">Clear</v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Navbar from "../Navbar.vue";
//import { BASE_URL } from '@/config';
import { BASE_URL } from "../../config";


export default {
  name: "StudentForm",
  components: {
    Navbar,
  },
  data() {
    return {
      studentId: null,
      firstName: "",
      lastName: "",
      valid: true,
      showAlert: false,
      isUpdateMode: false,
      rules: {
        required: value => !!value || "Required.",
      },
    };
  },

  created() {
    this.studentId = this.$route.params.id;

    if (this.studentId) {
      this.isUpdateMode = true;
      this.fetchStudentData();
      //console.log("Need to update");
    }
  },

  methods: {
    async fetchStudentData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/Student/${this.studentId}`);
        const student = response.data.data.student;
        console.log("Student Data", student);

        // Populate form fields with the fetched data
        this.firstName = student.firstName;
        this.lastName = student.lastName;
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    },

    async saveStudent() {
      if (this.$refs.form.validate()) {
        try {
          const studentData = {
            firstName: this.firstName ? this.firstName: "",
            lastName: this.lastName ? this.lastName: "",
          };

          if (this.isUpdateMode) {
            // Update existing student
            await axios.put(`${BASE_URL}/api/Student/${this.studentId}`, studentData);
          } else {
            // Create new student
            await axios.post(`${BASE_URL}/api/Student/Save`, studentData);
          }

          this.showAlert = true;
          this.clearForm();
          this.$refs.form.reset();

        } catch (error) {
          console.error("Error saving student:", error);
        }
      }
    },
    clearForm() {
      this.firstName = "";
      this.lastName = "";
    },

    navigateToStudentList() {
      this.$router.push("/student");
    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.pa-6 {
  background-color: #262626;
}
</style>
