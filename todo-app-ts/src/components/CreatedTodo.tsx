import { type TodoTitle } from "../types";
import { useState } from "react";
interface Props {
  saveTodo: ({ title }: TodoTitle) => void;
}

const CreatedTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveTodo({ title: inputValue });
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={inputValue}
        onChange={(Event) => {
          setInputValue(Event.target.value);
        }}
        placeholder="Que quieres hacer?"
        autoFocus
      />
    </form>
  );
};

export { CreatedTodo };
