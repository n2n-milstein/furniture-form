import Vue from "vue";
import Router from "vue-router";
import Form from "./views/Form.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "form",
      component: Form
    },
  ]
});

export default router;