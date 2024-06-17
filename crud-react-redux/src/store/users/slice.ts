import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

const DEFAULT_STATE = [
  { id: "1", name: "midudev", email: "midudev@example.com", github: "midudev" },
  { id: "2", name: "María", email: "maria@example.com", github: "defunkt" },
  { id: "3", name: "Ana", email: "ana@example.com", github: "atmos" },
  {
    id: "7",
    name: "Leanne Graham",
    email: "Sincere@april.biz",
    github: "Bret",
  },
];

const initialState: UserWithId[] = (() => {
  const persistance = localStorage.getItem("redux_state");
  if (persistance) return JSON.parse(persistance).users;
  return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    //actions
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      state.push({ id, ...action.payload }); //se puede mutar el estado con redux toolkit debido a que usa immer
      // return [...state, { id, ...action.payload }];
    },
    deleteUSerById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      );
      if (!isUserAlreadyDefined) state.push(action.payload);
    },
  },
});

export default usersSlice.reducer;
export const { deleteUSerById, addNewUser, rollbackUser } = usersSlice.actions;
