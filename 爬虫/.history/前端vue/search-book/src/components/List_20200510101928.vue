<template>
  <div class="container" v-if="listData">
    <div class="search-page">
      <div v-if="listData.bookName">
        随你搜为您找到
        <h1 class="inline">
          <span class="red sep-both05 bold">{{listData.bookName}}</span>相关的网盘资源
        </h1>
        <span class="red sep-both05 bold">{{listData.count}}</span>条
      </div>
      <div class="row" style="background-color: white;" v-for="(item,index) in listData.list" :key="index">
        <h3>
          <a @click="toDetail(item)" :title="item.title" @click.prevent="getSource(item)" class="box-title">
            <span class="highlight">{{item.title}}</span>
          </a>
        </h3>
        <p>
          <img :title="item.type" width="16" height="16" :src="item.src" />
          <span>{{item.type}}</span>
          <template v-if="queryObj.nd!=='d'">
            <span class="size">{{item.size}}</span>
            <span class="small">由{{item.author}}于{{item.date}}发布</span>
          </template>

        </p>
      </div>
      <div class="page-list" v-if="listData.bookName && listData.count">
        <button title="上一页" :disabled="currentPage==1" @click.prevent="toGetData(currentPage-1)">上一页</button>
        <span class="current">&nbsp;&nbsp;第{{currentPage}}页&nbsp;&nbsp;</span>
        <button title="下一页" :disabled="currentPage==pageCount" @click.prevent="toGetData(currentPage+1)">下一页</button>&nbsp;
        <a v-show="pageCount>1&&currentPage<pageCount" title="尾页" @click.prevent="toGetData(pageCount)">尾页</a>
        <a v-show="pageCount>1&&currentPage==pageCount" title="首页" @click.prevent="toGetData(1)">首页</a>
        <br />
        <span class="pageSkip"> 跳页&nbsp;
          <input name="custompage " class="custompage " title="输入页码，按回车快速跳转 " type="number " v-model.trim="size " @keydown.enter="toGetData(size) " :max="pageCount " :min="1 " /> &nbsp;/{{pageCount}}页&nbsp;&nbsp;
        </span>
        <span class="pcount ">共{{pageCount}}页&nbsp;&nbsp;</span>
        <span class="total ">{{listData.count}}项&nbsp;&nbsp;</span>&nbsp;&nbsp;
        <span class="pageSkip">
          <span v-if="size<1||size>pageCount" class="highlight">页码范围1-{{pageCount}}</span>
          <span v-else class="highlight">输入页码,按回车快速跳转</span>
        </span>
      </div>
      <div class="search-page" v-else>
        <div class="sep large" style="padding-top:10px">
          <b>搜索提示</b>
          <ol>
            <li>精简关键词重新搜索&nbsp;&nbsp;(小提示:关键词越短,搜索结果越多)</li>
            <li>收藏本页，一有资源收录，会立即显示</li>
          </ol>
        </div>
        <br class="bothall" />
      </div>
    </div>
    <div style="margin-top:30px"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      size: 1,
      source: null
    };
  },
  computed: {
    ...mapState(["listData", "queryObj"]),
    pageCount() {
      return Math.ceil(this.listData.count / 30);
    }
  },
  methods: {
    ...mapActions(["getListData"]),
    toGetData(index) {
      if (index < 1 || index > this.pageCount) {
        return;
      }
      this.currentPage = index;
      if (!this.listData.bookName) return;
      const query = {
        ...this.queryObj,
        n: this.listData.bookName,
        pageIndex: index,
        isFilter: false
      };
      this.getListData(query);
    },
    async toDetail(item) {
      let { url } = await this.$api.get("/getBookUrl", {
        params: {
          href: item.href
        }
      });
      var arg =
        '\u003cscript\u003elocation.replace("' + url + '")\u003c/script\u003e';
      window.open("javascript:window.name;", arg);
    }
    // cancel() {
    //   this.source.cancel("这里你可以输出一些信息，可以在catch中拿到");
    // }
  },
  watch: {
    listData(newVal, oldVal) {
      if (!newVal) return;
      const { isFilter, isSearch } = newVal;
      if (isFilter || isSearch) {
        this.currentPage = 1;
        this.size = 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.activeBtn {
  background-color: #227ad3;
  color: white;
}
.page-list {
  a {
    text-decoration: none;
    cursor: pointer;
  }
}
.custompage {
  padding-left: 5px;
  width: 50px;
  text-align: center;
}
.small {
  margin-left: 20px;
}
.box-title {
  cursor: pointer;
  width: 90%;
  display: inline-block;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap;
}
</style>