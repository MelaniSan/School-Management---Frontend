import { createRouter, createWebHistory } from 'vue-router';
import EnrollmentList from '../src/components/Enrollment/EnrollmentList.vue';
import StudentList from '../src/components/Student/StudentList.vue';
import SubjectList from '../src/components/Subject/SubjectList.vue';
import EnrollmentForm from '../src/components/Enrollment/EnrollmentForm.vue';
import StudentForm from '../src/components/Student/StudentForm.vue';
import SubjectForm from '../src/components/Subject/SubjectForm.vue';
import EnrolledStudents from '../src/components/Subject/EnrolledStudents.vue';
import EnrolledSubjects from '../src/components/Student/EnrolledSubjects.vue';

const routes = [
  { path: '/', component: EnrollmentList },
  { path: '/enroll', component: EnrollmentForm },

  { path: '/student', component: StudentList },
  { path: '/student/add', component: StudentForm },
  { path: '/student/update/:id', component: StudentForm },
  { path: '/student/enrolledSubjects/:id', component: EnrolledSubjects },

  { path: '/subject', component: SubjectList },
  { path: '/subject/add', component: SubjectForm },
  { path: '/subject/update/:id', component: SubjectForm },
  { path: '/subject/enrolledStudents/:id', component: EnrolledStudents },

];

/*
const routes =  [
    {
        path: "/",
        name: "Users",
        component: () => import("./components/Users"),
    },
    {
        path: "/user/:id",
        name: "User",
        component: () => import("./components/User"),
    },
];
*/

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;







