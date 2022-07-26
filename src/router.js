import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/surveys",
    alias: "/surveys",
    name: "tutorials",
    component: () => import("./views/TutorialsList.vue")
  },
  {
    path: "/",
    name: "home",
    component: () => import("./views/home.vue")
  },
  {
    path: "/edit",
    name: "edit",
    component: () => import("./views/EditTutorial.vue"),
    props: true
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./views/AddTutorial.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/about.vue")
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("./views/privacy.vue")
  },
  {
    path: "/view",
    name: "view",
    component: () => import("./views/ViewTutorial.vue"),
    props: true
  },
  {
    path: "/response",
    name: "response",
    component: () => import("./views/participantAns.vue"),
    props: true
  },
  {
    path: "/addLesson",
    name: "addLesson",
    component: () => import("./views/AddLesson.vue"),
    props: true
  },
  {
    path: "/surveyForm",
    name: "surveyForm",
    component: () => import("./views/surveyForm.vue"),
    props: true
  },
  {
    path: "/editLesson",
    name: "editLesson",
    component: () => import("./views/EditLesson.vue"),
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/login.vue"),
    props: true
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue"),
    props: true
  },
  {
    path: "/secure",
    name: "Secure",
    component: () => import("./views/secure.vue"),
    props: true
  },

];

const router = createRouter({
  base: process.env.NODE_ENV === 'development' ? '/' : '/tutorial-frontend-1/',
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
