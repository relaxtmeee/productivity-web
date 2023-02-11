import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOnePost } from "../pages/PostPage/modules/services/postAPI";
import { IPost } from "../pages/PostsPage/modules/interfaces/Posts.interface";
import { getPost } from "../pages/PostsPage/modules/services/http.posts";


export interface IPosts {
    posts: IPost[] | undefined
    post: IPost | undefined
    postsLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export interface IPostRequest {
    postId: string
    userId: string
}

const initialState = {
    posts: [],
    post: undefined,
    postsLoadingStatus: 'idle'
} as IPosts

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (userId: string | undefined, {rejectWithValue}) => {
        const response = await getPost(userId);
        if (typeof response !== 'string') {
          return response;
        } else {
          return rejectWithValue(response);
        }
    }
)

export const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async ({postId, userId}: IPostRequest) => {
        return await getOnePost(postId, userId);
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {state.posts = action.payload},
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchPosts.pending, state => {state.postsLoadingStatus =  'pending'})
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts =  action.payload;
                state.postsLoadingStatus = 'idle';     
            })
            .addCase(fetchPosts.rejected, state => {state.postsLoadingStatus = 'failed'})

            .addCase(fetchPost.pending, state => {state.postsLoadingStatus =  'pending'})
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.post=  action.payload;
                state.postsLoadingStatus = 'idle';     
            })
            .addCase(fetchPost.rejected, state => {state.postsLoadingStatus = 'failed'})
            .addDefaultCase(() => {})
    }
});


const {actions, reducer} = postsSlice;

export default reducer;
