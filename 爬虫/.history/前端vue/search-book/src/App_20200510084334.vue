<template>
  <div id="app">
    <vue-particles color="#3fac57" :particlesNumber="100" linesColor="#3fac57" class="lizi" />
    <div class="content">
      <Search />
      <FilterBook />
      <List />
    </div>
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import FilterBook from "./components/FilterBook.vue";
import List from "./components/List.vue";

export default {
  name: "App",
  components: {
    Search,
    FilterBook,
    List
  }
};
</script>

<style>
@import "./assets/css/screen.css";
@import "./assets/css/app.css";
#app {
  position: relative;
}
.content {
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  overflow: scroll;
}
.lizi {
  height: 100%;
}
</style>
