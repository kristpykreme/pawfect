import { createContext, Dispatch, SetStateAction } from "react";
import { Navigate, Outlet } from "react-router-dom";

export interface IUserDetails {
    username: string;
    email: string;
}
export interface IUser {
    user: IUserDetails
    setUser: Dispatch<SetStateAction<IUserDetails>>;
  }

const initial = {
    username: "",
    email: "",
}

export const userContext = createContext<IUser>({
    user: initial,
    setUser: () => {}
});
