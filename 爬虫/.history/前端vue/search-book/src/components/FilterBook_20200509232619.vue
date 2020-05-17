<template>
  <div class="container sep15-">
    <div class="iframe">
      <div>
        <div class="recommend">推荐你听</div>
        <iframe height="230" width="260" :src="recommend" frameborder=0 allowfullscreen></iframe>
      </div>
      <div>
        <div class="recommend">打赏作者</div>
      </div>
    </div>
    <div class="search-toolbox">
      <div class="sep sep1">
        <b>类型：</b>
        <a class="on sep1 isAll" rel="nofollow" data="f-">全部</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="f-f4" title="搜索文件类型：mp4 mkv rmvb avi flv vob mpg">视频</a>
        <a rel="nofollow" data="f-f2" title="搜索文件类型：txt pdf chm rtf epub mobi azw azw3 kfx">书/小说</a>
        <a rel="nofollow" data="f-f5" title="搜索文件类型：torrent">种子</a>
        <a rel="nofollow" data="f-f3" title="搜索文件类型：mp3 flac ape wav">音乐</a>
        <a rel="nofollow" data="f-f1" title="搜索文件类型：doc docx xls xlsx ppt pptx wps">office文档</a>
        <a rel="nofollow" data="f-f6" title="搜索文件类型：jpg jpeg png gif bmp">图片</a>
        <a rel="nofollow" data="f-f7" title="搜索文件类型：doc docx">word文档</a>
        <a rel="nofollow" data="f-f8" title="搜索文件类型：xls xlsx">excel文档</a>
        <a rel="nofollow" data="f-f9" title="搜索文件类型：ppt pptx">ppt文档</a>
        <a rel="nofollow" data="f-f10" title="搜索文件类型：mobi azw azw3 kfx">kindle电子书</a>
        <a rel="nofollow" data="f-f11" title="搜索文件类型：ipa">苹果App</a>
        <a rel="nofollow" data="f-f12" title="搜索文件类型：apk">安卓App</a>
        <a rel="nofollow" data="f-f13" title="搜索文件类型：zip rar 7z gzip tar gz bz2">压缩包</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="f-txt">txt</a>
        <a rel="nofollow" data="f-pdf">pdf</a>
        <a rel="nofollow" data="f-chm">chm</a>
        <a rel="nofollow" data="f-epub">epub</a>
        <a rel="nofollow" data="f-mobi">mobi</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="f-mp3">mp3</a>
        <a rel="nofollow" data="f-flac">flac</a>
        <a rel="nofollow" data="f-ape">ape</a>
        <a rel="nofollow" data="f-wav">wav</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="f-mp4">mp4</a>
        <a rel="nofollow" data="f-mkv">mkv</a>
        <a rel="nofollow" data="f-rmvb">rmvb</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="f-jpg">jpg</a>
        <a rel="nofollow" data="f-png">png</a>
        <a rel="nofollow" data="f-gif">gif</a>
        <a rel="nofollow" data="f-psd">psd</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="f-rar">rar</a>
        <a rel="nofollow" data="f-zip">zip</a>
        <a rel="nofollow" data="f-7z">7z</a>
      </div>
      <div class="sep sep2">
        <b>筛选：</b>
        <a class="on sep2 isAll" rel="nofollow" data="nd-">全部</a>
        <a rel="nofollow" data="nd-d">只看目录，去除文件</a>
        <a rel="nofollow" data="nd-f">只看文件，去除目录</a>
      </div>
      <div class="sep sep3">
        <b>年份：</b>
        <a class="on sep3 isAll" rel="nofollow" data="y-" title="只看全部年分享的资源">全部</a>
        <a rel="nofollow" data="y-2020" title="只看2020年分享的资源">2020</a>
        <a rel="nofollow" data="y-2019" title="只看2019年分享的资源">2019</a>
        <a rel="nofollow" data="y-2018" title="只看2018年分享的资源">2018</a>
        <a rel="nofollow" data="y-2017" title="只看2017年分享的资源">2017</a>
        <a rel="nofollow" data="y-2016" title="只看2016年分享的资源">2016</a>
        <a rel="nofollow" data="y-2015" title="只看2015年分享的资源">2015</a>
        <a rel="nofollow" data="y-2014" title="只看2014年分享的资源">2014</a>
        <a rel="nofollow" data="y-2013" title="只看2013年分享的资源">2013</a>
        <a rel="nofollow" data="y-2012" title="只看2012年分享的资源">2012</a>
      </div>
      <div class="sep sep4">
        <b>排序：</b>
        <a class="on sep4 isAll" rel="nofollow" data="s-" isAll>默认</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="s-size1">文件从大到小</a>
        <a rel="nofollow" data="s-size2">文件从小到大</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="s-feedtime1">发布时间从新到旧</a>
        <a rel="nofollow" data="s-feedtime2">发布时间从旧到新</a>
        <span class="sep">|</span>
        <a rel="nofollow" data="s-vcnt1">访问量从高到低</a>
        <a rel="nofollow" data="s-vcnt2">访问量从低到高</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      queryObj: {},
      recommend:
        "https://www.ximalaya.com/thirdparty/player/album/player.html?id=34013148&type=red"
    };
  },
  computed: {
    ...mapState(["listData"])
  },
  mounted() {
    let that = this;
    document.querySelectorAll(".search-toolbox a").forEach(element => {
      element.addEventListener("click", function() {
        let parentClass = this.parentNode.classList[1];
        let selectClass = `.on.${parentClass}`;
        if (document.querySelector(selectClass)) {
          document
            .querySelector(selectClass)
            .classList.remove("on", parentClass);
        }
        this.classList.add("on", parentClass);
        let [key, val] = this.getAttribute("data").split("-");
        that.queryObj = {
          ...that.queryObj,
          [key]: val
        };
        that.getData();
      });
    });
  },
  async beforeCreate() {
    let { url } = await this.$api.get("/recommend");
    if (url) {
      this.recommend = url;
    }
  },
  watch: {
    listData(newVal, oldVal) {
      if (!newVal) return;
      const { isSearch } = newVal;
      if (isSearch) {
        this.queryObj = {};
        this.setQueryObj({});
        this.$forceUpdate();
        document.querySelectorAll("a.on").forEach(element => {
          let parentClass = element.parentNode.classList[1];
          element.classList.remove("on", parentClass);
        });
        document.querySelectorAll("a.isAll").forEach(element => {
          let parentClass = element.parentNode.classList[1];
          element.classList.add("on", parentClass);
        });
      }
    }
  },
  methods: {
    ...mapActions(["getListData"]),
    ...mapMutations(["setQueryObj"]),
    getData() {
      let query = {
        n: this.listData.bookName,
        isFilter: true,
        ...this.queryObj
      };
      this.setQueryObj(query);
      if (!this.listData.bookName) return;
      this.getListData(query);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
}
.iframe {
  position: fixed;
  right: 10px;
  top: 60px;
  text-align: center;
  .recommend {
    font-size: 20px;
    margin-bottom: 5px;
  }
}
.container {
  padding-top: 51px;
}
.search-toolbox a {
  cursor: pointer;
  text-decoration: none;
}
</style>
