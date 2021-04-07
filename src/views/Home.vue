<template>
  <div class="home">
    <div>
      <input type="button" value="Logout" @click="logout" />
    </div>
    <img alt="Vue logo" class="m-auto" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const router = useRouter();
    const logout = () => {
      localStorage.removeItem('token');
      router.replace('/signout');
    };
    return {
      logout,
    };
  },
});
</script>
