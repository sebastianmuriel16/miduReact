import { TodoTitle } from "../types";
import { CreatedTodo } from "./CreatedTodo";
interface Props {
  onAddTodo: ({ title }: TodoTitle) => void;
}

const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className="header">
      <h1>
        todo
        <img
          style={{ width: "60px", height: "auto" }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"
          alt="img_typescript"
        />
      </h1>
      <CreatedTodo saveTodo={onAddTodo} />
    </header>
  );
};

export { Header };
