import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    { 
        id: '1',
        date: sub(new Date(), { days: 10 }).toISOString(),
        title: 'First post',
        content: 'Hello from the first post',
        user: "1",
        reactions: {thumbsUp: 1, hooray: 0, heart: 0, rocket: 0, eyes: 0}
    },
    { 
        id: '2',
        date: sub(new Date(), { hours: 7 }).toISOString(),
        title: 'Second post',
        content: 'Second post content',
        user: "2",
        reactions: {thumbsUp: 1, hooray: 2, heart: 0, rocket: 0, eyes: 0}
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare({title, content, userId}) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0
                        }
                    }
                }
            }
        },
        postUpdated(state, action) {
            const {id, title, content} = action.payload;
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction] += 1;
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export default postsSlice.reducer;