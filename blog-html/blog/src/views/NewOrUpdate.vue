<template>
    <div>
        <input type="text" placeholder="title" v-model="data.title" />
        <div>
            <textarea
                placeholder="content"
                cols="30"
                rows="10"
                v-model="data.content"
            ></textarea>
        </div>
        <button @click="save">保存</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: { title: "", content: "" }
        };
    },
    props: {
        id: String
    },
    methods: {
        async save() {
            let res;
            if (this.id) {
                res = await this.$http.post({
                    url: `/api/blog/update?id=${this.id}`,
                    data: this.data
                });
            } else {
                res = await this.$http.post({
                    url: "/api/blog/new",
                    data: this.data
                });
            }
            alert("成功");
        }
    }
};
</script>
