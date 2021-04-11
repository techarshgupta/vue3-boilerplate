import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { State } from './state';
import { Mutations } from './mutations';
import { Todo } from '@/model/Todo.model';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>;

export interface Actions {
  addTodo({ commit }: AugmentedActionContext, todo: Todo): void;
  removeTodo({ commit }: AugmentedActionContext, todo: Todo): void;
  toggleTodo({ commit }: AugmentedActionContext, todo: Todo): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  addTodo({ commit }: AugmentedActionContext, todo: Todo): void {
    commit('ADD_ITEM', todo);
  },
  removeTodo({ commit }: AugmentedActionContext, todo: Todo): void {
    commit('REMOVE_TODO', todo);
  },
  toggleTodo({ commit }: AugmentedActionContext, todo: Todo): void {
    todo = JSON.parse(JSON.stringify(todo));
    todo.done = !todo.done;
    commit('UPDATE_TODO', todo);
  },
};
