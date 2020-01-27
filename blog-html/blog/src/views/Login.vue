<template>
    <div>
        <h2>登录</h2>
        <div class="box-input">
            <input
                type="text"
                placeholder="username"
                v-model="loginData.username"
            />
            <input
                type="password"
                placeholder="password"
                v-model="loginData.password"
            />
            <button @click="login">提交</button>
        </div>
    </div>
</template>
<script>
import { genPassword } from "../utils/cryp";
export default {
    name: "Login",
    data() {
        return {
            loginData: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        async login() {
            this.loginData.password = genPassword(this.loginData.password);
            this.data = await this.$http.post({
                url: "/api/user/login",
                data: this.loginData
            });
            if (this.data.username) {
                this.$router.push(`/`);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.box-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        margin-bottom: 20px;
        width: 80%;
    }
}
</style>
