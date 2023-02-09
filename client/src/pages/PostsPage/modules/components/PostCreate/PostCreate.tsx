import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../../../../store/postsSlice';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import Button from '../../../../../ui/Button/Button';
import Input from '../../../../../ui/Input/Input';
import Textarea from '../../../../../ui/Textarea/Textarea';
import { createPost } from '../../services/http.posts';
import styles from './PostCreate.module.css';

const PostCreate = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userId = useTypedSelector(state => state.user.user?.id);
    
    const dispatch = useDispatch<AppDispatch>();

    const onCreatePost = async () => {
        const date = new Date().toLocaleDateString();
        try {
            if(typeof userId !== "undefined") {
                await createPost({name, description, date, userId});
                dispatch(fetchPosts(userId));
            }

        } catch (error) {
            
        }
    }

    return (
        <div className={styles.create}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Type name'/> 
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Type description'/>   
            <Button onClick={onCreatePost}>Create article</Button>
        </div>
    );
};

export default PostCreate;