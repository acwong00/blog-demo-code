<template>
<div class="gank-list">
  <h2>分类 {{ selected }}</h2>
  <select v-model="selected" @change="changeCategory(selected)">
    <option v-for="category in categories">
      {{ category }}
    </option>
  </select>
  <div v-if="isFetching">
    获取中...
  </div>
  <ul v-else>
    <li v-for="gank in ganks">
      <a href="javascript:void(0);" @click="add(gank._id, $event)">加入阅读列表</a>
      <span>{{ gank.desc }}</span>
    </li>
  </ul>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      selected: null
    }
  },

  computed: Object.assign(
    mapGetters({
      ids: 'ids'
    }), 
    mapState({
      isFetching: state => state.gankList.isFetching,
      ganks: state => state.gankList.ganks,
      categories: state => state.categories
    })
  ),

  methods: {
    changeCategory(selected) {
      this.$store.dispatch('getGanks', selected)
    },
    add(id, event) {
      if (this.ids.indexOf(id) < 0) {
        this.$store.dispatch('addToReadingList', id)
      }
    }
  },

  created () {
    this.$data.selected = this.categories[0]
    this.$store.dispatch('getGanks', this.$data.selected)
  }
}


</script>

<style>
  .gank-list ul {
    width: 500px;
  }
  .gank-list li {
    display: flex;
  }
  .gank-list li a {
    width: 100px;
    margin-right: 20px;
    flex: none;
  }
</style>