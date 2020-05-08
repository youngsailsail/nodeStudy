<template>
  <div class="top-fix-nav">
    <div class="container no-c-border">
      <span class="name">
        <a href="http://www.rufengso.net/">如风搜</a>
      </span>
      <form
        name="s"
        style="display:inline"
        onsubmit="return SearchInput.before_submit($(this));"
        method="get"
        action="http://www.rufengso.net/s/name/s"
      >
        <input
          id="k"
          name="k"
          placeholder="输入关键词搜索资源"
          autocomplete="off"
          maxlength="255"
          type="text"
          class="title"
          value="明朝那些事"
          onfocus="InputTip.clear($(this));"
          onblur="InputTip.show($(this));"
        />
        <input type="submit" class="s_btn" value="找资源" />
        <input type="checkbox" id="close_sug" class="sep-left1" checked="checked" />
        <span class="white small2">关闭搜索提示</span>
      </form>
    </div>
  </div>
</template>
