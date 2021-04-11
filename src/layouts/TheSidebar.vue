<template>
  <aside ref="sidebar" class="sidebar fixed bg-white flex flex-col left-0 min-h-screen top-0 px-4 shadow-2xl z-20" :class="navExpand ? 'click-collapse' : 'items-center hover-collapse'">
    <transition name="slide">
      <div class="flex my-8 items-center cursor-pointer h-8" :class="navExpand ? 'justify-between' : 'justify-around'" @click="toggleNavbar">
        <transition name="slide">
          <img class="w-12" src="@/assets/logo/hg.png" />
        </transition>
        <img class="h-4 w-4 absolute right-0 mb-3" :class="{ 'transform rotate-180 relative': navExpand }" src="@/assets/icon/arrow-right.svg" />
      </div>
    </transition>
    <nav class="inline-flex flex-col space-y-2 bg-white">
      <a
        v-for="(link, index) in navLinks"
        :key="index"
        class="flex items-center text-gray-600 py-2 cursor-pointer hover:bg-gray-100"
        :class="[{ 'bg-indigo-100 text-indigo-500': selected == index }, [navExpand ? 'pl-2 pr-6 rounded-lg' : 'px-2 rounded-lg']]"
        @click="selected = index"
      >
        <img :src="link.icon" class="w-8 h-8 p-1" :class="{ 'mr-4': navExpand }" />
        <span v-html="link.text" class="font-medium select-none" v-if="navExpand"></span>
      </a>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TheSidebar',
  props: {
    navExpand: {
      required: true,
      type: Boolean,
    },
  },
  setup(_, { emit }) {
    const selected = ref(0);
    const navLinks = ref([
      {
        icon: require('@/assets/icon/overview.svg'),
        text: 'Overview',
      },
      {
        icon: require('@/assets/icon/briefcase.svg'),
        text: 'Portfolio',
      },
      {
        icon: require('@/assets/icon/workflow.svg'),
        text: 'Workflows',
      },
      {
        icon: require('@/assets/icon/mojometer.svg'),
        text: 'Move the needle',
      },
      {
        icon: require('@/assets/icon/book.svg'),
        text: 'Resources',
      },
      {
        icon: require('@/assets/icon/bookmark.svg'),
        text: 'Bookmarks',
      },
      {
        icon: require('@/assets/icon/add.svg'),
        text: 'Create Task',
      },
    ]);
    const toggleNavbar = () => {
      emit('toggleNavbar');
    };
    return {
      selected,
      navLinks,
      toggleNavbar,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  &.hover-collapse {
    width: 80px;
    transition: all 0.5s ease;
  }
  &.click-collapse {
    width: 250px;
    transition: all 0.5s ease;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: width 0.2s linear;
}
.slide-enter,
.slide-leave-to {
  width: 0;
}
</style>
