import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer from "./users/slice"; // importas el .reducer de tu slice (usersSlice.reducer)
import { rollbackUser } from "./users/slice";
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action); // cualquier accion que se ejecute guarda en el localStorage
    localStorage.setItem("redux_state", JSON.stringify(store.getState()));
  };

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const previousState = store.getState();

    next(action);
    console.log(type, payload);

    if (type === "users/deleteUSerById") {
      const userIdToRemove = payload;
      const userToRemove = previousState.users.find(
        (user) => user.id === userIdToRemove
      );

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) toast.success("Usuario eliminado");
        })
        .catch((err) => {
          toast.error(`Error deleting user ${userIdToRemove}`);
          if (userIdToRemove) store.dispatch(rollbackUser(userToRemove));
          console.log(err);
          console.log("error");
        });
    }
    //fase 2
    console.log(store.getState());
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(persistanceLocalStorageMiddleware)
      .concat(syncWithDatabaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
