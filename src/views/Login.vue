<template>
  <input type="button" value="Please login" @click="login" />
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const router = useRouter();
    const login = () => {
      const path = '/#jwtToken/ekwekvbkwebvkwevke';
      localStorage.setItem('token', 'tokenstring');
      router.replace(path);
    };
    return {
      login,
    };
  },
});
</script>
