<template>
  <main :class="classObj">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="fixed inset-0 bg-black opacity-25 h-full w-full z-50"
      @click="handleClickOutside"
    />
    <sidebar :navExpand="navExpand" @toggleNavbar="navExpand = !navExpand" />
    <div class="wrapper" :class="navExpand ? 'click-collapse' : 'hover-collapse'">
      <div
        class="header fixed z-40 w-full"
        :class="navExpand ? 'click-collapse' : 'hover-collapse'"
      >
        <navbar />
      </div>
      <div
        class="body pt-16 px-4"
        :class="device === 'mobile' && sidebar.opened ? 'fixed overflow-hidden' : ''"
      >
        <div @click="toggleSidebar">open</div>
        <dashboard />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';

import Sidebar from './TheSidebar.vue';
import Dashboard from './Dashboard.vue';
import Navbar from './TheNavbar.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'TheLayout',
  components: {
    Sidebar,
    Dashboard,
    Navbar,
  },
  setup() {
    const store = useStore();
    const { body } = document;
    const WIDTH = 992;
    const navExpand = ref(false);
    const isMobile = (): boolean => {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    };
    const resizeHandler = (): void => {
      if (!document.hidden) {
        const isMob: boolean = isMobile();
        store.dispatch('app/toggleDevice', isMob ? 'mobile' : 'desktop');
        if (isMob) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true });
        }
      }
    };
    onBeforeMount(() => {
      window.addEventListener('resize', resizeHandler);
    });
    onMounted(() => {
      const isMob = isMobile();
      if (isMob) {
        store.dispatch('app/toggleDevice', 'mobile');
        store.dispatch('app/closeSideBar', { withoutAnimation: true });
      }
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler);
    });
    const sidebar = computed(() => store.state.app.sidebar);
    const device = computed(() => store.state.app.device);
    const classObj = computed(() => {
      return {
        'hide-sidebar': !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile',
      };
    });
    /* check device type on load */
    if (device.value === 'mobile' && sidebar.value.opened) {
      store.dispatch('app/closeSideBar', { withoutAnimation: false });
    }
    const toggleSidebar = () => {
      store.dispatch('app/toggleSideBar');
    };
    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false });
    };
    return {
      classObj,
      navExpand,
      toggleSidebar,
      sidebar,
      device,
      handleClickOutside,
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
.mobile {
  .wrapper,
  .header {
    width: 100%;
    margin-left: 0;
  }

  .sidebar {
    z-index: 50;
    width: 250px;
    transition: transform 1s;
  }

  &.hide-sidebar {
    .sidebar {
      pointer-events: none;
      transition-duration: 1s;
      transform: translate3d(-250px, 0, 0);
    }
  }
  &.withoutAnimation {
    .wrapper,
    .sidebar,
    .header {
      transition: none;
    }
  }
}
</style>
