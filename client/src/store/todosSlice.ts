import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "../pages/TodosPage/modules/interfaces/Category.interface";
import { IProject } from "../pages/TodosPage/modules/interfaces/Project.interface";
import { getCategories, getCategoryProjects } from "../pages/TodosPage/modules/services/todosAPI";


export interface ITodos {
    categories: ICategory[] | undefined
    currentCategory: string 
    todosLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
    curentCategoryProjects: IProject[] | undefined
    curentCategoryLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    categories: [],
    todosLoadingStatus: 'idle',
    currentCategory: '',
    curentCategoryProjects: [],
    curentCategoryLoadingStatus: 'idle'
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

export const fetchCategoryProjects = createAsyncThunk(
    'posts/fetchCategoryProjects',
    async (categoryId: string , {rejectWithValue}) => {
        const response = await getCategoryProjects(categoryId);
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
    reducers: {
        addCategory: (state, action) => {state.categories?.push(action.payload)},
        setCurrentCategory: (state, action) => {state.currentCategory = action.payload},
        addProject: (state, action) => {state.curentCategoryProjects?.push(action.payload)}
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchCategories.pending, state => {state.todosLoadingStatus =  'pending'})
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories =  action.payload;
                state.todosLoadingStatus = 'idle';     
            })
            .addCase(fetchCategories.rejected, state => {state.todosLoadingStatus = 'failed'})

            .addCase(fetchCategoryProjects.pending, state => {state.curentCategoryLoadingStatus =  'pending'})
            .addCase(fetchCategoryProjects.fulfilled, (state, action) => {
                state.curentCategoryProjects =  action.payload;
                state.curentCategoryLoadingStatus = 'idle';     
            })
            .addCase(fetchCategoryProjects.rejected, state => {state.curentCategoryLoadingStatus = 'failed'})
            .addDefaultCase(() => {})
    }
});


const { actions, reducer } = postsSlice;

export const { addCategory, setCurrentCategory, addProject } = actions;

export default reducer;
