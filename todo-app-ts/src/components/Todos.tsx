import { type TodoId, type ListOfTodos, type Todo as TodoType } from "../types";
import { useState } from "react";
import { Todo } from "./Todo";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: (id: TodoId) => void;
  onToggleCompleteTodo: ({
    id,
    isCompleted,
  }: Pick<TodoType, "id" | "isCompleted">) => void;
  setTitle: (params: Omit<TodoType, "isCompleted">) => void;
}

const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo,
  setTitle,
}) => {
  const [isEditing, setIsEditing] = useState("");
  const [parent] = useAutoAnimate();

  return (
    <ul className="todo-list" ref={parent}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => setIsEditing(todo.id)}
          className={`${todo.isCompleted ? "completed" : ""}
          ${isEditing === todo.id ? "editing" : ""}`}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isCompleted={todo.isCompleted}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            setTitle={setTitle}
          />
        </li>
      ))}
    </ul>
  );
};

export { Todos };
