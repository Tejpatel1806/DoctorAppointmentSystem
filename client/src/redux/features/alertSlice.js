import { createSlice } from '@reduxjs/toolkit';

// The createSlice function is used to create a new slice, which includes the slice's name (alerts),
// an initial state object (initialState), 
//and a set of reducer functions (reducers) that can be used to modify the slice's state.
// The initial state of the alerts slice is an object with a single property, loading, set to false.
// The showLoading and hideLoading reducer functions are defined in the reducers object. 
//They both take the current state as an argument, modify it in some way, and return the new state. 
//In this case, showLoading sets the loading property to true, while hideLoading sets it to false.


export const alertSlice = createSlice({
    name: "alerts",
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        },
    },
});
export const { showLoading, hideLoading } = alertSlice.actions;