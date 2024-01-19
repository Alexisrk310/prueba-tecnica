import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const schedulesSlice = createSlice({
    name: 'schedules',
    initialState,
    reducers: {
        addSchedules: (state, action) => {
            return action.payload;
        },
        newSchedules: (state, action) => {
            state.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSchedules, newSchedules } = schedulesSlice.actions

export default schedulesSlice.reducer