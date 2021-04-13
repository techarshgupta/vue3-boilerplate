import { createStore, createLogger } from 'vuex';

import { store as todo, TodoStore, State as TodoState } from '@/store/todos';
import { store as counter, CounterStore, State as CounterState } from '@/store/counter';
import { store as app, AppStore, AppState } from '@/store/app';

export type RootState = {
  todo: TodoState;
  counter: CounterState;
  app: AppState;
};

export type Store = TodoStore<Pick<RootState, 'todo'>> &
  CounterStore<Pick<RootState, 'counter'>> &
  AppStore<Pick<RootState, 'app'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
  strict: true,
  plugins,
  modules: {
    todo,
    counter,
    app,
  },
});

export function useStore(): Store {
  return store as Store;
}
