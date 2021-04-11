<template>
  <div class="flex justify-between select-none bg-white shadow-sm h-16">
    <div class="overflow-hidden p-2 w-16">
      <img class="w-full h-full" src="@/assets/logo/hg.png" />
    </div>
    <div class="flex justify-around items-center mx-4">
      <img class="h-6" src="@/assets/icon/settings.svg" />
      <img class="ml-8 h-6" src="@/assets/icon/notification.svg" />
      <div class="flex cursor-pointer items-center relative">
        <span v-if="user" class="flex justify-center font-semibold items-center bg-black text-white w-9 h-9 ml-8 rounded-full" @click="showLogOut = !showLogOut"
          >{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</span
        >
        <span v-else class="ml-2 text-gray-dark" @click="logout">Logout</span>
        <span
          v-if="showLogOut"
          class="absolute mt-10 w-32 text-gray-700 flex items-center text-sm px-3 ring-1 ring-black ring-opacity-5 right-0 top-0 py-2 rounded-md shadow-lg bg-white hover:bg-gray-100"
        >
          Logout
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TheNavbar',
  setup() {
    const showLogOut = ref(false);
    const user = ref({
      firstName: 'Harsh',
      lastName: 'Gupta',
    });
    return {
      showLogOut,
      user,
    };
  },
});
</script>
