import { useEffect } from 'react';
import HTag from '../../../../../ui/Htag/HTag';
import PTag from '../../../../../ui/PTag/PTag';
import styles from './Post.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, fetchPost } from '../../../../../store/postsSlice';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store/store';
import Spinner from '../../../../../ui/Spinner/Spinner';
import { ErrorMessage } from '../../../../../ui/Error/ErrorBoundary';
import Button from '../../../../../ui/Button/Button';
import { NavLink } from 'react-router-dom';
import { deleteOnePost } from '../../services/postAPI';

const Post = () => {

    const navigate = useNavigate();
    const post = useTypedSelector(state => state.posts.post);
    const loading = useTypedSelector(state => state.posts.postsLoadingStatus);
    const userId = useTypedSelector(state => state.user.user?.id);

    const { postId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        if(typeof userId !== 'undefined' && typeof postId !== 'undefined') {
            try {
                dispatch(fetchPost(postId));
            } catch (error) {
                console.log(error);
            }
        }
    }, [])    
        
    const deleteArticle = async () => {
        if(typeof postId !== 'undefined') {
            await deleteOnePost(postId)
                .then(() => {
                    dispatch(deletePost(postId));
                    navigate('/posts');
                })
        }
    
    } 

    if(loading === 'pending') {
        return <Spinner />
    }

    if (loading === 'failed') {
        return <ErrorMessage />
    }
    
    return (
        <>
            {
                post ? 
                <div className={styles.block}>
                    <div className={styles.post}>
                        <HTag className={styles.heading} htag="h2">{post.name}</HTag>
                        <PTag className={styles.description} size="16">{post.description}</PTag>
                        <PTag className={styles.date} size="14">{new Date(post.date).toLocaleDateString()}</PTag>
                    </div>
                    <div className={styles.buttons}>
                        <Button onClick={() => deleteArticle()} className={styles.button} type='danger'>Delete</Button>
                        <NavLink to={'/posts'}>
                            <Button className={styles.button} type='warning'>Back</Button>
                        </NavLink>
                    </div>

                </div>
                :
                null
            }
        </>
    );
};

export default Post;