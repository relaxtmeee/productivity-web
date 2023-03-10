import { configureStore } from '@reduxjs/toolkit';
import posts from './postsSlice';
import user from './userSlice';
import todos from './todosSlice';
import habits from './habitsSlice';

const stringMiddleware = () => (next:any) => (action:any) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: { user, posts, todos, habits },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;