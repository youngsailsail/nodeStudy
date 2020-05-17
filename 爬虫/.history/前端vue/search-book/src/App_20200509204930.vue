<template>
  <div id="app">
    <Search />
    <FilterBook />
    <List />
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
</style>
