import { FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  activeCount: number;
  completedCount: number;
  filterSelected: FilterValue;
  onClearCompleted: () => void;
  handleFiltersChange: (filter: FilterValue) => void;
}

const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  onClearCompleted,
  handleFiltersChange,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount} tareas pendientes</strong>
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFiltersChange}
      />

      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          borrar completados
        </button>
      )}
    </footer>
  );
};

export { Footer };
