import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IHabit } from "../pages/HabitsPage/modules/interfaces/Habits.interfaces";
import { getHabits } from "../pages/HabitsPage/modules/services/habitAPI";

export interface IHabits {
    habits: IHabit[] | undefined
    habitsLoadingStatus: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
    habits: [],
    habitsLoadingStatus: 'idle'
} as IHabits

export const fetchHabits = createAsyncThunk(
    'posts/fetchHabits',
    async (userId: string, {rejectWithValue}) => {
        const response = await getHabits(userId);
        if (typeof response !== 'string') {
          return response;
        } else {
          return rejectWithValue(response);
        }
    }
)

const habitsSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (state, action) => {state.habits?.push(action.payload)},
        updateDatesHabit: (state, action) => {state.habits?.map(habit => habit.id === action.payload.id ? action.payload : habit)}
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchHabits.pending, state => {state.habitsLoadingStatus =  'pending'})
            .addCase(fetchHabits.fulfilled, (state, action) => {
                state.habits =  action.payload;
                state.habitsLoadingStatus = 'idle';     
            })
            .addCase(fetchHabits.rejected, state => {state.habitsLoadingStatus = 'failed'})

            .addDefaultCase(() => {})
    }
});


const {actions, reducer} = habitsSlice;

export const { addHabit, updateDatesHabit } = actions;

export default reducer;
