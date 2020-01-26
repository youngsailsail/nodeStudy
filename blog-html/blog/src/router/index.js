import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import BlogDetail from "../views/BlogDetail";
import Login from "../views/Login";
import Mine from "../views/Mine";
import NewOrUpdate from "../views/NewOrUpdate";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/mine",
        name: "mine",
        component: Mine
    },
    {
        path: "/blog/detail/:id",
        name: "blogDetail",
        component: BlogDetail,
        props: true
    },
    {
        path: "/author/:author",
        name: "author",
        component: Home,
        props: true
    },
    {
        path: "/blog/new-update/:id?",
        name: "newOrUpdate",
        component: NewOrUpdate,
        props: true
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
