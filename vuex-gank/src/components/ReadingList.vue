<template>
<div class="reading-list">
  <h2>阅读列表</h2>
  <select v-model="selected">
    <option value="all">all</option>
    <option v-for="category in categories">
      {{ category }}
    </option>
  </select>
  <div v-if="readingListOfCategory.length === 0">
    还没有阅读条目
  </div>
  <ul v-else>
    <li v-for="item in readingListOfCategory">
      <a :href="item.url" target="_blank">{{ item.desc }}</a>
      <a href="javascript:void(0);" @click="deleteItem(item._id)">移除</a>
    </li>
  </ul>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      selected: 'all'
    }
  },
  
  computed: Object.assign({
    readingListOfCategory() {
      if (this.selected === 'all') {
        return this.readingList
      } else {
        return this.readingList.filter(item => item.type === this.selected)
      }
    }
  }, mapState({
    readingList: state => state.readingList.readingList,
    categories: state => state.categories
  })),

  methods: mapActions({
    deleteItem: 'deleteItem'
  })
}
</script>
<style>
  .reading-list li {
    display: flex;
  }
  .reading-list li a {
    padding-right: 20px;
  }
</style>