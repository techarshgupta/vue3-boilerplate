<template>
  <main>
    <sidebar :navExpand="navExpand" @toggleNavbar="navExpand = !navExpand" />
    <div class="wrapper" :class="navExpand ? 'click-collapse' : 'hover-collapse'">
      <div class="header fixed z-50 w-full" :class="navExpand ? 'click-collapse' : 'hover-collapse'">
        <navbar />
      </div>
      <div class="body pt-16 px-4">
        <dashboard />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Sidebar from './TheSidebar.vue';
import Dashboard from './Dashboard.vue';
import Navbar from './TheNavbar.vue';

export default defineComponent({
  name: 'TheLayout',
  components: {
    Sidebar,
    Dashboard,
    Navbar,
  },
  setup() {
    const navExpand = ref(false);
    return {
      navExpand,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  &.hover-collapse {
    width: calc(100% - 80px);
    margin-left: 80px;
    transition: all 1s ease;
  }
  &.click-collapse {
    width: calc(100% - 250px);
    margin-left: 250px;
    transition: all 0.5s ease;
  }
}
.header {
  &.hover-collapse {
    width: calc(100% - 80px);
    transition: all 1s ease;
  }
  &.click-collapse {
    width: calc(100% - 250px);
    transition: all 0.5s ease;
  }
}
</style>
