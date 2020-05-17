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
export default {};
</script>
<style lang="scss" scoped>
</style>
