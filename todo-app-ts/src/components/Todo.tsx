import { useEffect, useRef, useState } from "react";
import { type TodoId, type Todo as TodoType } from "../types";

interface Props extends TodoType {
  onRemoveTodo: (id: TodoId) => void;
  onToggleCompleteTodo: ({
    id,
    isCompleted,
  }: Pick<TodoType, "id" | "isCompleted">) => void;
  setTitle: (params: { id: string; title: string }) => void;
  isEditing: string;
  setIsEditing: (isCompleted: string) => void;
}

const Todo: React.FC<Props> = ({
  id,
  title,
  isCompleted,
  onRemoveTodo,
  onToggleCompleteTodo,
  setTitle,
  isEditing,
  setIsEditing,
}) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const inputEditTitle = useRef<HTMLInputElement>(null);
  const handleCHangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleteTodo({ id, isCompleted: event.target.checked });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    Event
  ) => {
    if (Event.key === "Enter") {
      setIsEditing(editedTitle.trim());

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle });
      }

      if (editedTitle === "") onRemoveTodo({ id });

      setIsEditing("");
    }
    if (Event.key === "Escape") {
      setEditedTitle(title);
      setIsEditing("");
    }
  };

  useEffect(() => {
    inputEditTitle.current?.focus();
  }, [isEditing]);

  return (
    <>
      <div>
        <input
          className="toggle"
          type="checkbox"
          checked={isCompleted}
          onChange={handleCHangeCheckBox}
        />
        <label>{title}</label>
        <button className="destroy" onClick={() => onRemoveTodo({ id })} />
      </div>

      <input
        className="edit"
        value={editedTitle}
        onChange={(event) => setEditedTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setIsEditing("")}
        ref={inputEditTitle}
      />
    </>
  );
};

export { Todo };
