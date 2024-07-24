import { type User, SortBy } from "../types.d";
import "./usersList.css";
interface Props {
  users: User[];
  showColors: boolean;
  deleteUser: (uuid: string) => void;
  changeSorting: (sort: SortBy) => void;
}
export function UsersList({
  users,
  showColors,
  deleteUser,
  changeSorting,
}: Props) {
  return (
    <table width={"100%"}>
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>
            Apellido
          </th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>
            Pais
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={showColors ? "table-show-colors" : "table-hide-colors"}>
        {users.map((user) => {
          return (
            <tr key={user.login.uuid}>
              <td>
                <img src={user.picture.thumbnail} alt="user.name.first" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.login.uuid)}>
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//table => la tabla entera
//thead => encabezado
//tbody => cuerpo
//tr => row
//td => cell
