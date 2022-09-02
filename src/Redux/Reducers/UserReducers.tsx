import { User } from "../../Models/user"

const initialState = {
    user: new User()
}
export const userReducer = (state = initialState, action: { type: string, user: User }) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user }
        default:
            return initialState
    }
}