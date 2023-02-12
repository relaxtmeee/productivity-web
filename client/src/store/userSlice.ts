import { createSlice } from "@reduxjs/toolkit";


export interface IUser {
    user: { email: string, exp?: number; iat?: number, id: string, role: string } | undefined;
    auth: boolean,
    userLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
    user: {},
    auth: false,
    userLoadingStatus: 'idle'
} as IUser;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchingUser: state  => {state.userLoadingStatus = 'pending'},
        fetchUser: (state, action)  => {
            state.userLoadingStatus = 'idle';
            state.auth = action.payload.auth;
            state.user = action.payload.user;
        },
        fetchedUser: state => {state.userLoadingStatus = 'idle'},
    }
})

const { actions, reducer } = userSlice;

export const { fetchingUser, fetchUser, fetchedUser } = actions;

export default reducer;