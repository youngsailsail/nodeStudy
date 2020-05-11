<template>
  <div class="top-fix-nav">
    <div class="container no-c-border">
      <span class="name">
        <img src="/logo.png" alt="" class="logo">
        <a href="/">
          随你搜
        </a>
      </span>
      <form @submit.prevent="submit" class="form">
        <input placeholder="输入关键词搜索资源" autocomplete="off" maxlength="255" type="text" class="title" name="n" v-model.trim="searchTxt" />
        <input type="submit" class="s_btn" value="搜资源" />
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      searchTxt: ""
    };
  },
  methods: {
    ...mapActions(["getListData"]),
    submit(e) {
      if (!this.searchTxt) {
        alert("请先输入资源名称");
        return;
      }
      const query = {
        n: this.searchTxt,
        isSearch: true
      };
      this.getListData(query);
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  flex: 1;
  display: flex;
  align-items: center;
}
.name {
  display: flex;
  align-items: center;
}
.logo {
  height: 100%;
}
</style>

