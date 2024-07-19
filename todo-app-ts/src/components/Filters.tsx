import { FILTERS_BUTTONS } from "../consts";
import { type FilterValue } from "../types";
interface Props {
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  const handleClick = (filter: FilterValue) => {
    onFilterChange(filter);
  };
  return (
    <ul className="filters">
      {Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => {
        const isSelected = filterSelected === key;
        const className = isSelected ? "selected" : "";
        return (
          <li key={key}>
            <a
              href={href}
              className={className}
              onClick={(event) => {
                event.preventDefault();
                onFilterChange(key as FilterValue);
              }}
            >
              {literal}{" "}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export { Filters };
