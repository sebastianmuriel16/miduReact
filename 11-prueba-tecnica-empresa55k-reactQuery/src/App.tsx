import { useEffect, useMemo, useRef, useState } from "react";
import { SortBy, type User } from "./types.d";
import { UsersList } from "./components/UsersList";
import "./App.css";

const getUsers = async (page: number) => {
  return await fetch(
    `https://randomuser.me/api/?results=10&seed=SebastianMuriel&page=${page}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    })
    .then((data) => data.results);
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  //useRef -> es para guardar un valor
  //que queramos compartir entre renders
  //sin que el componente se vuelva renderizar de nuevo

  useEffect(() => {
    setLoading(true);
    setError(false);
    getUsers(currentPage)
      .then((users) => {
        setUsers((prevUsers) => {
          const newUsers = prevUsers.concat(users);
          originalUsers.current = newUsers;
          return newUsers;
        });
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const toogleColors = () => setShowColors((showColors) => !showColors);
  const toogleOrderUsersByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (uuid: string) => {
    const newUsers = users.filter((user) => user.login.uuid !== uuid);
    setUsers(newUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  // const usersToSort = [...users];
  // const sortedUsers = sortByCountry // manera que funcionaria con todos los navegadores
  //   ? usersToSort.sort((a, b) =>
  //       a.location.country.localeCompare(b.location.country)
  //     )
  //   : users;

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

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

  // const sortedUsers = sortByCountry
  //   ? filteredUsers.toSorted((a, b) =>
  //       a.location.country.localeCompare(b.location.country)
  //     )
  //   : filteredUsers;

  const handleReset = () => {
    setUsers(originalUsers.current);
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
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            users={sortedUsers}
            showColors={showColors}
            deleteUser={handleDelete}
          />
        )}

        {loading && <strong>Cargando...</strong>}

        {error && <strong>Ocurrio un error</strong>}

        {!error && users.length === 0 && <strong>No hay usuarios</strong>}

        <button
          onClick={() => {
            setCurrentPage((prevState) => prevState + 1);
          }}
        >
          Cargar mas resultados
        </button>
      </main>
    </>
  );
}

export default App;
