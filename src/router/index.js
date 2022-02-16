/*
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-14 10:45:41
 * @LastEditTime: 2022-02-15 17:25:08
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\router\index.js
 * @Environment: Win 10
 * @Description:
 */
import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/suspense",
    name: "Suspense",
    component: () => import("../views/Suspense.vue"),
  },
  {
    path: "/asyncComponent",
    name: "AsyncComponent",
    component: () => import("../views/AsyncComponent.vue"),
  },
  ,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
