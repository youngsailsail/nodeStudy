<template>
  <div class="home">
    <h2>{{ author ? `${author}的主页` : "博客首页" }}</h2>
    <div class="box-button">
      <router-link to="/mine">我的</router-link>
      <router-link to="/login">登录</router-link>
    </div>
    <div>

    </div>
    <div
      v-for="item in list"
      :key="item.id"
    >
      <h3
        class="pointer"
        @click="gotoDetail(item)"
      >{{ item.title }}</h3>
      <div>
        <span
          class="pointer"
          @click="viewAuthor(item)"
          v-show="!author"
        >{{ item.author }}</span>&nbsp;&nbsp;
        <span>{{ item.createtime | dateFilter }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  props: {
    author: String
  },
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    this.list = await this.$http.get({
      url: `/api/blog/list${this.author ? "?author=" + this.author : ""}`
    });
  },
  watch: {
    async author(newVal) {
      this.list = await this.$http.get({
        url: `/api/blog/list${newVal ? "?author=" + newVal : ""}`
      });
    }
  },
  methods: {
    gotoDetail(item) {
      this.$router.push(`/blog/detail/${item.id}`);
    },
    viewAuthor(item) {
      this.$router.push(`/author/${item.author}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
    & > div {
        border-bottom: 1px solid #0000009c;
    }
    .box-button {
        margin: 30px 0;
        display: flex;
        justify-content: center;
        a {
            margin: 0 20px;
        }
    }
    .pointer {
        cursor: pointer;
    }
}
</style>
