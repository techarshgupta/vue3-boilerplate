<template>
  <transition name="fade" appear>
    <!--Modal-->
    <div
      class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center z-50"
      v-if="isVisible"
    >
      <div class="modal-overlay z-50 absolute w-full h-full bg-black opacity-30"></div>

      <div
        class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
      >
        <div class="py-4 text-left px-6">
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">
              <slot name="title"></slot>
            </p>
            <div class="cursor-pointer z-50" @click="emitCancel">
              <svg
                class="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                ></path>
              </svg>
            </div>
          </div>
          <slot name="body"></slot>
          <slot name="footer">
            <div class="flex justify-end pt-2">
              <button
                class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
                @click="emitCancel"
              >
                <slot name="cancel-button">
                  <button class="btn-outline">Cancel</button>
                </slot>
              </button>
              <button
                class="px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
                @click="emitConfirm"
              >
                <slot name="confirm-button">
                  <button class="btn">Confirm</button>
                </slot>
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheModal',
  props: {
    isVisible: {
      required: true,
      type: Boolean,
    },
  },
  emits: ['cancel', 'confirm'],
  setup(_, { emit }) {
    const emitCancel = () => {
      emit('cancel');
    };

    const emitConfirm = () => {
      emit('confirm');
    };
    return {
      emitCancel,
      emitConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
