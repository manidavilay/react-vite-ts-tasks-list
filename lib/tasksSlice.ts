import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  completed: string[];
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        title: string;
        frequency: "daily" | "weekly" | "monthly";
      }>
    ) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload.title,
        frequency: action.payload.frequency,
        completed: [],
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
    },
    editTask: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        frequency: "daily" | "weekly" | "monthly";
      }>
    ) => {
        const taskToEdit = state.tasks.find((task) => task.id === action.payload.id);
        if (taskToEdit) {
          taskToEdit.title = action.payload.title;
          taskToEdit.frequency = action.payload.frequency;
        }
    },
    toggleStatus: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const foundTask = state.tasks.find(
        (task) => task.id === action.payload.id
      );
      if (foundTask) {
        const foundTaskIndex = foundTask.completed.indexOf(action.payload.date);
        if (foundTaskIndex > -1) {
          foundTask.completed.splice(foundTaskIndex, 1);
        } else {
          foundTask.completed.push(action.payload.date);
        }
      }
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) => {
      const foundTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (foundTaskIndex > -1) {
        state.tasks.splice(foundTaskIndex, 1);
      }
    },
  },
});

export const { addTask, editTask, toggleStatus, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
