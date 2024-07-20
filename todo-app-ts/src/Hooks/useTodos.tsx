import { useState } from "react";
import {
  type TodoId,
  type Todo as TodoType,
  type FilterValue,
  TodoTitle,
} from "../types";

import { TODO_FILTERS } from "../consts";

const mockTodos = [
  {
    id: "1",
    title: "ver el curso de react en Udemy",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Aprender typescript",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Ver el curso de react native de midu",
    isCompleted: false,
  },
];

const useTodos = () => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  const handleRemove = ({ id }: TodoId): void => {
    const newToods = todos.filter((todo) => todo.id !== id);
    setTodos(newToods);
  };

  const handleComplete = ({
    id,
    isCompleted,
  }: Pick<TodoType, "id" | "isCompleted">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo) => !todo.isCompleted).length;
  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.isCompleted;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.isCompleted;
    return todo;
  });

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  };

  const handleSave = ({ title }: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const handleUpdateTitle = ({
    id,
    title,
  }: {
    id: string;
    title: string;
  }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return {
    todos,
    handleRemove,
    handleComplete,
    filterSelected,
    handleFilterChange,
    activeCount,
    completedCount,
    filteredTodos,
    handleRemoveAllCompleted,
    handleSave,
    handleUpdateTitle,
  };
};

export { useTodos };
