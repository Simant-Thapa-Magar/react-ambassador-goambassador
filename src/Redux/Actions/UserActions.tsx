import { User } from "../../Models/user";

export const SET_USER = (user: User) => ({
    type: "SET_USER",
    user
})