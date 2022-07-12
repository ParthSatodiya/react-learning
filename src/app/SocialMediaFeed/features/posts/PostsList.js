import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { PostAuthor } from "./PostAuthor";
import { fetchPosts, selectAllPosts } from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";


const PostExcerpt = ({post}) => {
    return (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button">
                View post
            </Link>
        </article>
    )
}

export const PostsList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch])

    let content;
    if (postStatus === 'loading') {
        content = <Spinner text="Loading..."/>
    } else if (postStatus === 'succeeded') {
        // Sort posts in reverse order of datetime
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostExcerpt key={post.id} post={post}/>);
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>;
    }

    return (
        <section className="posts-list">
            <h2>posts</h2>
            {content}
        </section>
    )
}