import { createRouter, createWebHistory } from "vue-router";
import EmployeePage from "../view/employee/EmployeePage.vue"
import ReportPage from "../view/report/ReportPage.vue"

const routes = [{
        path: '/',
        name: 'Home',
        component: EmployeePage
    },
    {
        path: '/report',
        name: 'Report',
        component: ReportPage
    },
    {
        path: '/bank',
        name: 'Bank',
        component: ReportPage
    }
]

const router = createRouter({

    history: createWebHistory(),
    routes
})

export default router