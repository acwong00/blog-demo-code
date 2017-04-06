<template>

<div id="app">
  <h1>Gank reading App</h1>
  <div class="container">
    <gank-list></gank-list>
    <reading-list></reading-list>
  </div>
</div>

</template>

<script>

import GankList from './GankList.vue'
import ReadingList from './ReadingList.vue'

export default {
  components: {
    GankList,
    ReadingList
  }
}

</script>

<style>

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container {
  display: flex;
  justify-content: space-between;
}

</style>
