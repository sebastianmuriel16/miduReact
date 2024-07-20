import { useTodos } from "./Hooks/useTodos";
import { Todos } from "./components/Todos";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

const App = (): JSX.Element => {
  const {
    handleRemove,
    handleComplete,
    handleFilterChange,
    filterSelected,
    activeCount,
    completedCount,
    filteredTodos,
    handleRemoveAllCompleted,
    handleSave,
    handleUpdateTitle,
  } = useTodos();

  return (
    <div className="todoapp">
      <Header onAddTodo={handleSave} />
      <Todos
        todos={filteredTodos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleComplete}
        setTitle={handleUpdateTitle}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFiltersChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
