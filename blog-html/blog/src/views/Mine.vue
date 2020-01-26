<template>
    <div class="mine">
        <h2>我的</h2>
        <div>
            <button @click="addOrEdit">新增</button>
        </div>
        <div class="box-item">
            <div v-for="item in list" :key="item.id">
                <h3 class="pointer" @click="gotoDetail(item)">
                    {{ item.title }}
                </h3>
                <div>
                    <span>{{ item.createtime | dateFilter }}</span>
                    <button @click="delBlog(item)" class="button-del">
                        删除
                    </button>
                    <button @click="addOrEdit(item)" class="button-del">
                        编辑
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "mine",
    data() {
        return {
            list: []
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            this.list = await this.$http.get({
                url: `/api/blog/list?isAdmin=true`
            });
        },
        gotoDetail(item) {
            this.$router.push(`/blog/detail/${item.id}`);
        },
        async delBlog(item) {
            const res = await this.$http.post({
                url: `/api/blog/del?id=${item.id}`
            });
            this.getList();
        },
        addOrEdit(item) {
            this.$router.push(
                `/blog/new-update${item.id ? "/" + item.id : ""}`
            );
        }
    }
};
</script>
<style lang="scss" scoped>
.box-item {
    & > div {
        border-bottom: 1px solid #0000009c;
    }
}
.pointer {
    cursor: pointer;
}
.button-del {
    margin-left: 20px;
}
</style>
