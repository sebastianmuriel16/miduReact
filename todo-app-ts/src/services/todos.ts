import { type ListOfTodos } from "../types";

const API_URL = "https://api.jsonbin.io/v3/b/669b1616ad19ca34f88a1bea";

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL, {
    headers: {
      "X-Master-Key": import.meta.env.VITE_API_KEY_BIN,
    },
  });
  if (!res.ok) {
    console.error("Error fetching todos");
    return [];
  }

  const data = await res.json();
  const todos = data.record.todos as ListOfTodos;
  return todos;
};

const updateTodos = async ({
  todos,
}: {
  todos: ListOfTodos;
}): Promise<boolean> => {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": import.meta.env.VITE_API_KEY_BIN,
    },
    body: JSON.stringify(todos),
  });

  return res.ok;
};

export { getTodos, updateTodos };
