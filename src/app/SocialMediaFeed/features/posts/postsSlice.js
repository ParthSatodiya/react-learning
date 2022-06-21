import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '1', title: 'First post', content: 'Hello from the first post'},
    { id: '2', title: 'Second post', content: 'Second post content'},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        }
    }
})

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;