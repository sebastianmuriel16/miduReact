import { TODO_FILTERS } from "./consts";

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type TodoId = Pick<Todo, "id">;
export type TodoTitle = Pick<Todo, "title">;
export type TodoIsCompleted = Pick<Todo, "isCompleted">;

export type ListOfTodos = Todo[];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
