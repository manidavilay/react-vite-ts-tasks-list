import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Task {
    id: string,
    title: string,
    frequency: "daily" | "weekly" | "monthly",
    completed: string[],
    createdAt: string
}

interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<{ title: string, frequency: "daily" | "weekly" | "monthly" }>) => {
            const newTask = {
                id: Date.now().toString(),
                title: action.payload.title,
                frequency: action.payload.frequency,
                completed: [],
                createdAt: new Date().toISOString()
            }
            state.tasks.push(newTask)
        },
        removeTask: (state, action: PayloadAction<{ id: string }>) => {
            const foundTask = state.tasks.find(task => task.id === action.payload.id)
            if (foundTask) {
                const foundTaskIndex = state.tasks.indexOf(foundTask)
                if (foundTaskIndex > -1) {
                    state.tasks.splice(foundTaskIndex, 1)
                }
            }
        }
    }
})

export const { addTask, removeTask } = tasksSlice.actions
export default tasksSlice.reducer