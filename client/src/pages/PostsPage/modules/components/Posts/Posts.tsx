import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../../store/selectorTypedHook";
import { fetchPosts } from "../../../../../store/postsSlice";
import { AppDispatch } from "../../../../../store/store";
import HTag from "../../../../../ui/Htag/HTag";
import PTag from "../../../../../ui/PTag/PTag";
import styles from "./Posts.module.css";
import Spinner from "../../../../../ui/Spinner/Spinner";
import PostCreate from "../PostCreate/PostCreate";
import Button from "../../../../../ui/Button/Button";
import { NavLink } from "react-router-dom";
import { ErrorMessage } from "../../../../../ui/Error/ErrorBoundary";

const Posts: React.FC = ():JSX.Element => {

    const [open, setOpen] = useState<boolean>(false);
    
    const postLoading = useTypedSelector(state => state.posts.postsLoadingStatus);
    const userId = useTypedSelector(state => state.user.user?.id);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if(typeof userId != "undefined" ) {
            dispatch(fetchPosts(userId));
        }
    }, [])
    

    if(postLoading === 'pending') {
        console.log('pedning');
        return <>
            <Spinner/>
        </>
    } 

    if(postLoading === 'failed') {
        return <ErrorMessage />
    }
    
    return (
        <div className={styles.posts}>
            {open ? <PostCreate setOpen={setOpen}/> : null}
            
            <div className={styles.add}>
                <PTag size="18" className={styles.add_text}>
                    Do you want to share your thoughts?
                </PTag>
                <Button onClick={() => setOpen(true)}>Add article</Button>
            </div>

            <PostsGenaration/>
            
        </div>
    );
};

const PostsGenaration = (): JSX.Element => {

    const posts = useTypedSelector(state => state.posts.posts);
    
    return (
        <>
            {posts && [...posts].sort((a, b) => a.date < b.date ? 1 : -1).map((post) => {
                return (
                    <NavLink key={post.date} to={'/posts/' + post.id}>
                        <div className={styles.post}>
                            <HTag className={styles.heading} htag="h2">{post.name}</HTag>
                            <PTag className={styles.description} size="16">{post.description}</PTag>
                            <PTag className={styles.date} size="14">{new Date(post.date).toLocaleDateString()}</PTag>
                        </div>
                    </NavLink>
                )
            })}
        </>
    )
}

export default Posts;