import Layout from "@/layout/index.vue";
import type { RouteRecordRaw } from "vue-router";
import Cashier from '@/views/cashier/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Cashier" },
    children: [
      {
        path: "cashier",
        name: "Cashier",
        component: Cashier,
        meta: {
          title: "收银台"
        }
      },
    ]
  }
];

export default routes;
