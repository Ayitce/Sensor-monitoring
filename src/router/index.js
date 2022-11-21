import { createRouter, createWebHistory } from "vue-router";
//import TemparetureChartView from "../views/TemparetureChartView.vue";
//import GStore from "@/store";
//import tempChartService from "@/tempChartService";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/humidity",
    name: "humidity",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HumidityView.vue"),
  },
  {
    path: "/lux",
    name: "lux",
    component: () => import("../views/LuxView.vue"),
  },
  {
    path: "/temperature",
    name: "temperature",
    component: () => import("../views/TemperatureView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
