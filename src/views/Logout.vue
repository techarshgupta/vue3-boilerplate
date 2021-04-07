<template>
  <input type="button" value="Go to login" @click="redirect" />
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Logout',
  setup() {
    const router = useRouter();
    const redirect = () => {
      router.replace('/login');
    };
    return {
      redirect,
    };
  },
});
</script>
