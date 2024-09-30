import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    tasks: Array<string>
};

const initialState: InitialState = {
    tasks: []
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        add: (state, actions) => {
            state.tasks = [...state.tasks, actions.payload]
        },
        remove: (state, action) => {
            state.tasks = [...state.tasks.slice(0, action.payload), ...state.tasks.splice(action.payload + 1)]
        },
        removeMultiple: (state, action) => {
            state.tasks = [...state.tasks.filter((_, index) => !action.payload.includes(index))]
        },
        cleanTask: (state) => {
            state.tasks = []
        }
    }

});

export const { add, remove, removeMultiple, cleanTask } = taskSlice.actions

export default taskSlice.reducer;