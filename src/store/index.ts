import { createStore, createLogger } from 'vuex';

import { store as todo, TodoStore, State as TodoState } from '@/store/todos';
import { store as counter, CounterStore, State as CounterState } from '@/store/counter';

export type RootState = {
  todo: TodoState;
  counter: CounterState;
};

export type Store = TodoStore<Pick<RootState, 'todo'>> & CounterStore<Pick<RootState, 'counter'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  strict: true,
  plugins,
  modules: {
    todo,
    counter,
  },
});

export function useStore(): Store {
  return store as Store;
}
