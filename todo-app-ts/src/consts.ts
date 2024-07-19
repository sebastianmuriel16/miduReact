const TODO_FILTERS = {
  COMPLETED: "completed",
  ALL: "all",
  ACTIVE: "active",
} as const; // el as const es para que solo sea un valor de solo lectura (esta utilidad es de typescript)

const FILTERS_BUTTONS = {
  [TODO_FILTERS.COMPLETED]: {
    literal: "completados",
    href: `/?filter=${TODO_FILTERS.COMPLETED}`,
  },
  [TODO_FILTERS.ALL]: {
    literal: "todos",
    href: `/?filter=${TODO_FILTERS.ALL}`,
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: "activos",
    href: `/?filter=${TODO_FILTERS.ACTIVE}`,
  },
} as const;

export { TODO_FILTERS, FILTERS_BUTTONS };
