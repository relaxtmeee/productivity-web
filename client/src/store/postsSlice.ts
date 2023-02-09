import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../pages/PostsPage/modules/interfaces/Posts.interface";
import { getPost } from "../pages/PostsPage/modules/services/http.posts";


export interface IPosts {
    posts: IPost[] | undefined
    postsLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    posts: [],
    postsLoadingStatus: 'idle'
} as IPosts

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (userId: number | undefined) => {
        return await getPost(userId);
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchPosts.pending, state => {state.postsLoadingStatus =  'pending'})
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts =  action.payload;
                state.postsLoadingStatus = 'idle';     
            })
            .addCase(fetchPosts.rejected, state => {state.postsLoadingStatus = 'failed'})
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = postsSlice;

export default reducer;
