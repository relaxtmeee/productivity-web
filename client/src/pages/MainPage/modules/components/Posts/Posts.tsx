import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../../store/selectorTypedHook";
import { fetchPosts } from "./postsSlice";
import { AppDispatch } from "../../../../../store/store";
import HTag from "../../../../../ui/Htag/HTag";
import PTag from "../../../../../ui/PTag/PTag";
import styles from "./Posts.module.css";

const Posts: React.FC = ():JSX.Element => {

    const posts = useTypedSelector(state => state.posts.posts)
    const postLoading = useTypedSelector(state => state.posts.postsLoadingStatus);

    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        dispatch(fetchPosts());
    }, [])
    

    if(postLoading !== 'idle') {
        return <></>
    } else {

    }
    
    
    return (
        <div className={styles.posts}>
            {posts && posts.map((post) => {
                return (
                <div key={post.id} className={styles.post}>
                    <HTag className={styles.heading} htag="h2">{post.name}</HTag>
                    <PTag className={styles.description} size="16">{post.description}</PTag>
                    <PTag className={styles.date} size="14">{new Date(post.date).toLocaleDateString()}</PTag>
                </div>
                )
            })}
        </div>
    );
};

export default Posts;