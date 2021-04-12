<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn" @click="modalVisible = true">Open Modal</button>
    <modal
      v-if="modalVisible"
      :isVisible="modalVisible"
      @cancel="modalVisible = false"
      @confirm="modalVisible = false"
    >
      <template #title>
        <p>Modal Title Example</p>
      </template>
      <template #body>
        <p>Some text for the modal body, this will show up in the middle of the modal.</p>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '@/components/global/TheModal.vue';

export default defineComponent({
  name: 'About',
  components: {
    Modal,
  },
  setup() {
    const modalVisible = ref(false);
    return {
      modalVisible,
    };
  },
});
</script>
