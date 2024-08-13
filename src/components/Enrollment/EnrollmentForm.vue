<template>
  <v-container>
    <Navbar />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-center">Enrollment Form</h1>
        <v-btn color="green" class="mb-4 align-left" @click="navigateToEnrollmentList">Previous</v-btn>
        <v-card class="pa-6">
          <v-form ref="form" v-model="valid">
            <v-alert
              v-if="showAlert"
              type="success"
              closable
              @input="showAlert = false">
              Successfully enrolled
            </v-alert>

            <v-text-field
              v-model="studentId"
              label="Student ID"
              :rules="[rules.required]"
              outlined>
            </v-text-field>

            <v-select
              v-model="selectedSubjectIds"
              :items="subjects"
              label="Select Subjects"
              item-title="subjectLabel"
              item-value="subjectId"
              multiple
              chips
              outlined>
            </v-select>


            <v-row>
              <v-col cols="12" sm="6" md="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
<!--                    <v-text-field-->
<!--                      v-model="enrollmentDate"-->
<!--                      label="Select Date"-->
<!--                      prepend-icon="mdi-calendar"-->
<!--                      readonly-->
<!--                      v-bind="attrs"-->
<!--                      v-on="on"-->
<!--                    ></v-text-field>-->
                    <v-date-picker v-model="enrollmentDate"
                                   :max="maxDate"
                                   style="max-width: 250px; width: 100%;"></v-date-picker>
                  </template>

                </v-menu>
              </v-col>
            </v-row>

            <v-row justify-content="flex-end" class="mt-4">
              <v-btn color="blue" class="mr-4" @click="enroll">Enroll</v-btn>
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
  name: "EnrollmentForm",
  components: {
    Navbar,
  },
  data() {
    return {
      studentId: null,
      selectedSubjectIds: [],
      enrollmentDate: new Date(),
      menu: false,
      valid: true,
      showAlert: false,
      subjects: [],
      maxDate: new Date().toISOString().split('T')[0],
      rules: {
        required: value => !!value || "Required.",
      },
    };
  },

  created() {
    this.fetchSubjects();
  },

  methods: {

    async fetchSubjects() {
      try {
        const response = await axios.get(`${BASE_URL}/api/Subject/List`);
        this.subjects = response.data.data.subjects.map(subject => ({
          subjectId: subject.subjectId,
          subjectLabel: `${subject.subjectId} - ${subject.subjectName}`
        }));
        console.log("Fetched subjects", this.subjects);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    },

    async enroll() {
      if (this.$refs.form.validate()) {
        try {
          //const formattedDate = this.enrollmentDate.toLocaleDateString('en-CA');
          const localDate = new Date(this.enrollmentDate.getTime() - this.enrollmentDate.getTimezoneOffset() * 60000);
          const formattedDate = localDate.toISOString().split('T')[0];
          const enrollmentData = {
            studentId: this.studentId ? this.studentId : null,
            subjectIds: this.selectedSubjectIds.length > 0 ? this.selectedSubjectIds : [],
            enrollmentDate:formattedDate,
          };
          console.log("this is enrollment data",enrollmentData);

          await axios.post(`${BASE_URL}/api/Enrollment/enroll`, enrollmentData);
          this.showAlert = true;
          this.clearForm();
          this.$refs.form.reset();
        } catch (error) {
          console.error("Error in enrolling:", error);
        }
      }
    },
    clearForm() {
      this.studentId = null;
      this.subjectIds = [];
      this.enrollmentDate = new Date();
    },

    navigateToEnrollmentList() {
      this.$router.push("/");
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
