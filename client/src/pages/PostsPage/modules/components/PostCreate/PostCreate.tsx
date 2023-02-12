import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, fetchPosts } from '../../../../../store/postsSlice';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import Button from '../../../../../ui/Button/Button';
import Input from '../../../../../ui/Input/Input';
import Textarea from '../../../../../ui/Textarea/Textarea';
import { IPostCreate } from '../../interfaces/PostCreate.interface';
import { createPost } from '../../services/http.posts';
import styles from './PostCreate.module.css';


const PostCreate = ({setOpen, ...props}: IPostCreate): JSX.Element => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userId = useTypedSelector(state => state.user.user?.id);
    
    const dispatch = useDispatch<AppDispatch>();

    const onCreatePost = async () => {
        const date = new Date().toString();
        try {
            if(typeof userId !== "undefined" && name.length > 1 && description.length > 1) {
                await createPost({name, description, date, userId});
                dispatch(addPost({name, description, date, userId}));
            }
        } catch (error) {
            
        }
        setOpen(false);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.create}>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Type name'/> 
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Type description'/>  
                <div className={styles.buttons}>
                    <Button onClick={onCreatePost}>Create article</Button>
                    <Button type='warning' onClick={() => setOpen(false)}>Cancel</Button>
                </div> 
            </div>
        </div>
       
    );
};

export default PostCreate;