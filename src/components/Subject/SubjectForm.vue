<template>
  <v-container>
    <Navbar />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">{{ isUpdateMode ? 'Update Subject' : 'Add Subject' }}</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToSubjectList">Previous</v-btn>
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
              v-model="subjectName"
              label="Subject Name"
              :rules="[rules.required]"
              outlined>
            </v-text-field>
            <v-text-field
              v-model="credits"
              label="Credits"
              :rules="[rules.required]"
              outlined>
            </v-text-field>

            <v-row justify-content="flex-end" class="mt-4">
              <v-btn color="blue" class="mr-4" @click="saveSubject">{{ isUpdateMode ? 'Update' : 'Save' }}</v-btn>
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
import { BASE_URL } from "../../config";

export default {
  name: "SubjectForm",
  components: {
    Navbar,
  },
  data() {
    return {
      subjectId: null,
      subjectName: "",
      credits: "",
      valid: true,
      showAlert: false,
      isUpdateMode: false,
      rules: {
        required: value => !!value || "Required.",
      },
    };
  },

  created() {
    this.subjectId = this.$route.params.id;

    if (this.subjectId) {
      this.isUpdateMode = true;
      this.fetchSubjectData();
      console.log("Need to update");
    }
  },

  methods: {
    async fetchSubjectData() {
      try {
        const response = await axios.get(`${BASE_URL}/api/Subject/${this.subjectId}`);
        const subject = response.data.data.subject;
        console.log("Subject Data", subject);

        // Populate form fields with the fetched data
        this.subjectName = subject.subjectName;
        this.credits = subject.credits;
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    },

    async saveSubject() {
      if (this.$refs.form.validate()) {
        try {
          const subjectData = {
            subjectName: this.subjectName,
            credits: this.credits,
          };

          if (this.isUpdateMode) {
            // Update existing student
            await axios.put(`${BASE_URL}/api/Subject/${this.subjectId}`, subjectData);
          } else {
            // Create new student
            await axios.post(`${BASE_URL}/api/Subject/Save`, subjectData);
          }

          this.clearForm();
          this.showAlert = true;
          this.$refs.form.reset();
        } catch (error) {
          console.error("Error saving subject:", error);
        }
      }
    },

    clearForm() {
      this.subjectName = "";
      this.credits = "";
    },

    navigateToSubjectList() {
      this.$router.push("/subject");
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
