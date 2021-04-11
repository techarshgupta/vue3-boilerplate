import { Todo } from '@/model/Todo.model';

export interface State {
  todos: Todo[];
}

export const state: State = {
  todos: [],
};
