<template>
  <div class="home">
    <div>
      <input type="button" value="Logout" @click="logout" />
    </div>
    {{ todoList }}
    <img alt="Vue logo" class="m-auto" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { Todo } from '@/model/Todo.model';
import { Counter } from '@/model/Counter.model';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    console.log('🚀 store', store);
    const t: Todo = {
      id: 12,
      desc: 'ewfwef',
      done: false,
    };
    const temp: Counter = {
      count: 12,
    };
    store.dispatch('todo/addTodo', t);
    store.dispatch('counter/addCounter', temp);
    const todoList = computed(() => store.state.todo.todos);
    const logout = () => {
      localStorage.removeItem('token');
      router.replace('/signout');
    };
    return {
      todoList,
      logout,
    };
  },
});
</script>
