<template>
    <div class="blogDetail">
        <h2>博客详情</h2>
        <div>
            <h3>{{ detail.title }}</h3>
            <div>
                {{ detail.content }}
            </div>
            <div>
                <span>{{ detail.author }}</span
                >&nbsp;&nbsp;
                <span>{{ detail.createtime | dateFilter }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "blogDetail",
    props: {
        id: String
    },
    data() {
        return {
            detail: {}
        };
    },
    async mounted() {
        this.detail = await this.$http.get({
            url: `/api/blog/detail?id=${this.id}`
        });
        console.log(this.detail, " this.detail");
    }
};
</script>
<style lang="scss" scoped></style>
