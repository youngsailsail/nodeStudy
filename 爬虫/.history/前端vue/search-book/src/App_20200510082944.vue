<template>
  <div id="app">
    <vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="60" shapeType="circle" :particleSize="4" linesColor="#fff" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="2" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" class="lizi">
    </vue-particles>
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
