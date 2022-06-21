import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const dispatch = useDispatch();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSaveClicked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )
        }

        setTitle("")
        setContent("")
    }

    return (
        <section>
            <h2>Add a new post</h2>
            <form>
                <label htmlFor="postTitle">Post title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSaveClicked}>Save</button>
            </form>
        </section>
    )
}