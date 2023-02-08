import { useEffect, useState } from "react";
import HTag from "../../../../../ui/Htag/HTag";
import PTag from "../../../../../ui/PTag/PTag";
import { IPost } from "../../interfaces/Posts.interface";
import { getPost } from "../../services/http.posts";
import styles from "./Posts.module.css";

const Posts: React.FC = ():JSX.Element => {

    const [posts, setPosts] = useState<IPost[]>();

    useEffect(() => {
        getPost().then(data => setPosts(data?.sort((a, b) => a.id < b.id ? 1 : -1)));
    }, [])
    
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