import { UserId, User, deleteUSerById, addNewUser } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  //actions

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }));
  };

  const removeUser = (id: UserId) => {
    dispatch(deleteUSerById(id));
  };
  return { removeUser, addUser };
};
