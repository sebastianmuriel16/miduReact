import { useMemo, useState } from "react";
import "./App.css";
import { UsersList } from "./components/UsersList";
import { type User, SortBy } from "./types.d";
import { useUsers } from "./hooks/useUsers";

function App() {
  const { users, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
    useUsers();

  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  // const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [eliminatedUuids, setEliminatedUuids] = useState<string[]>([]);

  // //useRef -> es para guardar un valor
  // //que queramos compartir entre renders
  // //sin que el componente se vuelva renderizar de nuevo

  const toogleColors = () => setShowColors((showColors) => !showColors);
  const toogleOrderUsersByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  // const filteredEliminados = useMemo(() => {
  //   return typeof eliminatedUuid === "string" && eliminatedUuid.length > 0
  //     ? users.filter((user) => user.login.uuid !== eliminatedUuid)
  //     : users;
  // }, [users, eliminatedUuid]);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  // const usersToSort = [...users];
  // const sortedUsers = sortByCountry // manera que funcionaria con todos los navegadores
  //   ? usersToSort.sort((a, b) =>
  //       a.location.country.localeCompare(b.location.country)
  //     )
  //   : users;

  const handleDeleteUser = (uuid: string) => {
    setEliminatedUuids((prevState) => prevState.concat(uuid));
  };

  const eliminatedUsers = users.filter(
    (user) => !eliminatedUuids.includes(user.login.uuid)
  );

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? eliminatedUsers.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : eliminatedUsers;
  }, [eliminatedUsers, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const comparePropertys: Record<string, (user: User) => string> = {
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
      [SortBy.COUNTRY]: (user) => user.location.country,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = comparePropertys[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  // // const sortedUsers = sortByCountry
  // //   ? filteredUsers.toSorted((a, b) =>
  // //       a.location.country.localeCompare(b.location.country)
  // //     )
  // //   : filteredUsers;

  const handleReset = () => {
    // setUsers(originalUsers.current);
    // await refetch();
    setEliminatedUuids([]);
  };

  return (
    <>
      <h1>Prueba tecnica</h1>
      <header className="App-header">
        <button onClick={toogleColors}>Colorear filas</button>
        <button onClick={toogleOrderUsersByCountry}>
          {sorting === SortBy.COUNTRY
            ? "No ordenar por pais"
            : "Ordenar por pais"}
        </button>
        <button onClick={handleReset}>Restaurar el estado inicial</button>
        <input
          type="text"
          placeholder="Filtrar por pais"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>

      <main>
        {users?.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            users={sortedUsers}
            showColors={showColors}
            deleteUser={handleDeleteUser}
          />
        )}

        {isLoading && <strong>Cargando...</strong>}

        {isError && <strong>Ocurrio un error</strong>}

        {!isLoading && !isError && users.length === 0 && (
          <strong>No hay usuarios</strong>
        )}

        {!isLoading && !isError && hasNextPage && (
          <button onClick={() => fetchNextPage()}>Cargar mas resultados</button>
        )}
      </main>

      {/* <h1>Prueba tecnica</h1> */}
    </>
  );
}

export default App;
