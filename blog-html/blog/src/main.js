import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { get, post } from "./api/fetch";
Vue.prototype.$http = { get, post };
import custom from "./utils/filters/index";
// 全局注册
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key]);
});
Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
