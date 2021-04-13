<template>
  <div class="flex justify-between select-none bg-white shadow-sm h-16">
    <div class="flex">
      <hamburger
        v-if="isMobile"
        :is-active="sidebar.opened"
        class="cursor-pointer flex items-center"
        @toggleClick="toggleSideBar"
      />
      <div class="overflow-hidden p-2 w-16">
        <img class="w-full h-full" src="@/assets/logo/hg.png" />
      </div>
    </div>
    <div class="flex justify-around items-center mx-4">
      <img class="h-6" src="@/assets/icon/settings.svg" />
      <img class="ml-8 h-6" src="@/assets/icon/notification.svg" />
      <div class="flex cursor-pointer items-center relative">
        <div
          v-if="showLogOut"
          @click="showLogOut = false"
          class="fixed inset-0 bg-black opacity-25 h-full w-full cursor-default"
        ></div>
        <span
          v-if="user"
          class="relative z-10 flex justify-center font-semibold items-center bg-black text-white w-9 h-9 ml-8 rounded-full"
          @click="showLogOut = !showLogOut"
        >
          {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
        </span>
        <span v-else class="ml-2 text-gray-dark" @click="logout">Logout</span>
        <button
          v-if="showLogOut"
          class="absolute mt-10 w-32 text-gray-700 flex items-center text-sm px-3 ring-1 ring-black ring-opacity-5 right-0 top-0 py-2 rounded-md shadow-lg bg-white hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent, onUnmounted, ref } from 'vue';
import Hamburger from './TheHamBurger.vue';

export default defineComponent({
  name: 'TheNavbar',
  components: {
    Hamburger,
  },
  setup() {
    const showLogOut = ref(false);
    const store = useStore();
    const sidebar = computed(() => store.state.app.sidebar);
    const isMobile = computed(() => store.state.app.device === 'mobile');
    const user = ref({
      firstName: 'Harsh',
      lastName: 'Gupta',
    });
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        showLogOut.value = false;
      }
    };
    document.addEventListener('keydown', handleEscape);
    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscape);
    });
    const toggleSideBar = () => {
      store.dispatch('app/toggleSideBar');
    };
    return {
      showLogOut,
      sidebar,
      isMobile,
      user,
      toggleSideBar,
    };
  },
});
</script>
