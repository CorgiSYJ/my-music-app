<template>
  <ul class="switches">
    <li class="switch-item"
    v-for="(item, index) in switches"
    :key="item.id"
    :class="{'active': currentIndex === index}"
    @click="switchItem(index)">
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped>
  .switches {
    display: flex;
    align-items: center;
    width: 240px;
    margin: 0 auto;
  }
  .switch-item {
    flex: 1;
    padding: 5px;
    margin: 0 20px;
    text-align: center;
    font-size: 14px;
    color: #f1f1f1;
  }
  .switch-item.active {
    border-bottom: 2px solid #f1f1f1;
    color: #fff;
  }
</style>
