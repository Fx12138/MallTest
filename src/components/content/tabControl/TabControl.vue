<template>
  <div id="tab-control">
    <div
      v-for="(item, index) in tabs"
      class="tab-item"
      :class="{ isActive: index === currentTab }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentTab: 0,
    };
  },
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemClick(index) {
      this.currentTab = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
#tab-control {
  display: flex;
  z-index: 10;
  text-align: center;
  background-color: white;
}
.tab-item {
  flex: 1;
  height: 44px;
}
.isActive {
  color: red;
}
.tab-item span {
  padding-bottom: 5px;
}
.isActive span {
  border-bottom: 2px solid red;
}
</style>
