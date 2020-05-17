<template>
    <div class="iframe">
        <div>
            <div class="recommend">推荐你听</div>
            <iframe height="230" width="260" :src="recommend" frameborder=0 allowfullscreen></iframe>
        </div>
        <div class="reward">
            <div class="recommend">打赏作者(￣.￣)</div>
            <div>
                <img src="@/assets/img/wx.jpeg" alt="">
                <img src="@/assets/img/zfb.jpeg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      recommend:
        "https://www.ximalaya.com/thirdparty/player/album/player.html?id=34013148&type=red"
    };
  },
  beforeCreate() {}
};
</script>
<style lang="scss" scoped>
.iframe {
  position: fixed;
  width: 260px;
  right: 10px;
  top: 60px;
  text-align: center;
  .recommend {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .reward {
    img {
      width: 180px;
      margin-bottom: 5px;
    }
  }
}
</style>
