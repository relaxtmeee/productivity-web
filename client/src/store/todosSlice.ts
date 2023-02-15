import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "../pages/TodosPage/modules/interfaces/Category.interface";
import { getCategories } from "../pages/TodosPage/modules/services/todosAPI";


export interface ITodos {
    categories: ICategory[] | undefined
    postsLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    categories: [],
    postsLoadingStatus: 'idle'
} as ITodos

export const fetchCategories = createAsyncThunk(
    'posts/fetchCategories',
    async (userId: string, {rejectWithValue}) => {
        const response = await getCategories(userId);
        if (typeof response !== 'string') {
          return response;
        } else {
          return rejectWithValue(response);
        }
    }
)

const postsSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchCategories.pending, state => {state.postsLoadingStatus =  'pending'})
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories =  action.payload;
                state.postsLoadingStatus = 'idle';     
            })
            .addCase(fetchCategories.rejected, state => {state.postsLoadingStatus = 'failed'})
            .addDefaultCase(() => {})
    }
});


const {actions, reducer} = postsSlice;

export default reducer;
