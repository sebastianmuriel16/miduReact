import { useReducer, useEffect } from "react";
import { TODO_FILTERS } from "../consts";
import { getTodos, updateTodos } from "../services/todos";
import { type ListOfTodos, type FilterValue } from "../types";

const initialState = {
  sync: false,
  todos: [],
  filterSelected: () => {
    //read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter") as FilterValue | null;
    if (filter === null) return TODO_FILTERS.ALL;

    return Object.values(TODO_FILTERS).includes(filter)
      ? filter
      : TODO_FILTERS.ALL;
  },
};

type Action =
  | { type: "INIT_TODOS"; payload: { todos: ListOfTodos } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "COMPLETED"; payload: { id: string; isCompleted: boolean } }
  | { type: "FILTER_CHANGE"; payload: { filter: FilterValue } }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "SAVE"; payload: { title: string } }
  | { type: "UPDATE_TITLE"; payload: { id: string; title: string } };

interface State {
  sync: boolean;
  todos: ListOfTodos;
  filterSelected: FilterValue;
}

const reducer = (state: State, action: Action): State => {
  if (action.type === "INIT_TODOS") {
    const { todos } = action.payload;
    return {
      ...state,
      sync: true,
      todos,
    };
  }

  if (action.type === "CLEAR_COMPLETED") {
    const newTodos = state.todos.filter((todo) => !todo.isCompleted);
    return {
      ...state,
      sync: true,
      todos: newTodos,
    };
  }

  if (action.type === "COMPLETED") {
    const { id, isCompleted } = action.payload;
    const newTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted,
        };
      }
      return todo;
    });

    return {
      ...state,
      sync: true,
      todos: newTodos,
    };
  }

  if (action.type === "FILTER_CHANGE") {
    const { filter } = action.payload;
    return {
      ...state,
      filterSelected: filter,
    };
  }

  if (action.type === "REMOVE") {
    const { id } = action.payload;
    const newTodos = state.todos.filter((todo) => todo.id !== id);
    return {
      ...state,
      sync: true,
      todos: newTodos,
    };
  }

  if (action.type === "SAVE") {
    const { title } = action.payload;
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    };
    const newTodos = [...state.todos, newTodo];
    return {
      ...state,
      sync: true,
      todos: newTodos,
    };
  }

  if (action.type === "UPDATE_TITLE") {
    const { id, title } = action.payload;
    const newTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }
      return todo;
    });
    return {
      ...state,
      sync: true,
      todos: newTodos,
    };
  }
  return state;
};
