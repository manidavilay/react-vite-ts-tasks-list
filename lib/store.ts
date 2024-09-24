import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice"

const store = configureStore({
    reducer: tasksReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store