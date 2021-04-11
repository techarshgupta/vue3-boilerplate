import { MutationTree } from 'vuex';
import { Todo } from '@/model/Todo.model';
import { State } from './state';

export type Mutations<S = State> = {
  ADD_ITEM(state: S, todo: Todo): void;
  REMOVE_TODO(state: S, todo: Todo): void;
  TOGGLE_TODO(state: S, todo: Todo): void;
  UPDATE_TODO(state: S, todo: Todo): void;
};

export const mutations: MutationTree<State> & Mutations = {
  ADD_ITEM(state: State, todo: Todo) {
    state.todos.push(todo);
  },
  REMOVE_TODO(state: State, todo: Todo) {
    const index = state.todos.findIndex((item: Todo) => item.id === todo.id);
    state.todos.splice(index, 1);
  },
  TOGGLE_TODO(state: State, todo: Todo) {
    const index = state.todos.findIndex((item: Todo) => item.id === todo.id);
    todo.done = !todo.done;

    state.todos.splice(index, 1, todo);
  },
  UPDATE_TODO(state: State, todo: Todo) {
    const index = state.todos.findIndex((item: Todo) => item.id === todo.id);
    state.todos.splice(index, 1, todo);
  },
};
