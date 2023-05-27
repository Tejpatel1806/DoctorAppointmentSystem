import { createSlice } from '@reduxjs/toolkit';
//user name ni slice create kari aapde ane ema single property
//user che jeni initial value null che 
//aama getUser name ni action che 

// In Redux, a "payload" refers to the data that is passed as an argument to an action creator
// function. The payload is the part of the action that describes the changes that need to be made to the Redux store.

// In the code snippet you provided, the "getUser" action creator function takes in a payload as an argument.
// The payload can be any data that needs to be stored in the Redux store, and in this case, it is the user data that needs to be stored.
// When the "getUser" action is dispatched, the payload data will be passed to the reducer function that handles this action, and the "user" 
// property of the state will be updated to the value of the payload.

// For example, if you have a user object with properties like name, email, and ID, you can pass this object as the
//  payload to the "getUser" action, and the "user" property in the Redux store will be set to this object.Then, you can access the user data
//   from the Redux store in any other part of the application that needs it.
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});
export const { setUser } = userSlice.actions;