import { useEffect } from 'react';
import HTag from '../../../../../ui/Htag/HTag';
import PTag from '../../../../../ui/PTag/PTag';
import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../../../../store/postsSlice';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import Spinner from '../../../../../ui/Spinner/Spinner';

const Post = () => {

    const post = useTypedSelector(state => state.posts.post);
    const loading = useTypedSelector(state => state.posts.postsLoadingStatus);
    const userId = useTypedSelector(state => state.user.user?.id);

    const { postId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        if(typeof userId !== 'undefined' && typeof postId !== 'undefined') {
            try {
                dispatch(fetchPost({postId, userId}));
            } catch (error) {
                console.log(error);
            }
        }
    }, [])    
        
    if(loading !== 'idle') {
        return <Spinner></Spinner>
    }
    
    return (
        <>
            {
                post ? 
                <div className={styles.post}>
                    <HTag className={styles.heading} htag="h2">{post.name}</HTag>
                    <PTag className={styles.description} size="16">{post.description}</PTag>
                    <PTag className={styles.date} size="14">{new Date(post.date).toLocaleDateString()}</PTag>
                </div>
                :
                null
            }
        </>
    );
};

export default Post;