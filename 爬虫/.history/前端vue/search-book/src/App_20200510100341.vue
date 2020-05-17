<template>
  <div id="app">
    <vue-particles color="#3fac57" :particlesNumber="100" linesColor="#3fac57" class="lizi" />
    <Search />
    <Recomend/>
    <div class="content">
      <FilterBook />
      <List />
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
import Recomend from "@/components/Recomend";
import FilterBook from "@/components/FilterBook";
import List from "@/components/List";

export default {
  name: "App",
  components: {
    Search,
    Recomend,
    FilterBook,
    List
  }
};
</script>

<style>
@import "./assets/css/screen.css";
@import "./assets/css/app.css";
@import "./assets/css/rem.css";
#app {
  position: relative;
  height: 100%;
}
.content {
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  overflow: scroll;
  padding: 0 30%;
}
.lizi {
  height: 100%;
}
</style>
