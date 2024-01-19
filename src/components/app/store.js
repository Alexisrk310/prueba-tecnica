import { configureStore } from '@reduxjs/toolkit'
import schedulesSlice from '../features/schedules/schedulesSlice'
import schedulesTodaySlice from '../features/schedules/schedulesTodaySlice'



export const store = configureStore({
    reducer: {
        schedules: schedulesSlice,
        schedulesToday: schedulesTodaySlice
    },
})