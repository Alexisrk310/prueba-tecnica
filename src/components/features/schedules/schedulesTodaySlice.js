import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const SchedulesToday = createSlice({
    name: 'schedulesToday',
    initialState,
    reducers: {
        addSchedulesToday: (state, action) => {
            return action.payload;
        },
        newSchedulesToday: (state, action) => {
            state.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSchedulesToday, newSchedulesToday } = SchedulesToday.actions

export default SchedulesToday.reducer