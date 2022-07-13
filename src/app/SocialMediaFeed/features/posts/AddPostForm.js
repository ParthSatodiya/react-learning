import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNewPost, postAdded } from "./postsSlice";

export const AddPostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [postAddRequestStatus, setPostAddRequestStatus] = useState("idle");
    const [error, setError] = useState("");

    const dispatch = useDispatch();

    const users = useSelector(state => state.users);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId) && postAddRequestStatus === "idle";

    const onSaveClicked = async () => {
        if (!canSave) {
            return;
        }

        setError("");
        try {
            setPostAddRequestStatus('pending');
            await dispatch(addNewPost({title, content, user: userId})).unwrap();

            // dispatch(
            //     postAdded({
            //         title,
            //         content,
            //         userId
            //     })
            // )

            setTitle("")
            setContent("")
            setUserId("")
        } catch (err) {
            setError("Failed to save post!");
        } finally {
            setPostAddRequestStatus("idle");
        }
    
    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
    ))

    return (
        <section>
            <h2>Add a new post</h2>
            <div>{error}</div>
            <form>
                <label htmlFor="postTitle">Post title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <input
                    type="text"
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button type="button" onClick={onSaveClicked} disabled={!canSave}>
                    Save
                </button>
            </form>
        </section>
    )
}