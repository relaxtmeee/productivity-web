
import { create } from 'domain';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import { addProject } from '../../../../../store/todosSlice';
import Button from '../../../../../ui/Button/Button';
import Input from '../../../../../ui/Input/Input';
import Textarea from '../../../../../ui/Textarea/Textarea';
import { IProjectCreate } from '../../interfaces/ProjectCreate.interface';
import { createCategoryProject } from '../../services/todosAPI';
import styles from './ProjectCreate.module.css';


const ProjectCreate = ({setOpen, ...props}: IProjectCreate): JSX.Element => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const userId = useTypedSelector(state => state.user.user?.id);
    const categoryId = useTypedSelector(state => state.todos.currentCategory);
    
    const dispatch = useDispatch<AppDispatch>();

    const onCreatePost = async () => {
        
        
        try {
            if(typeof userId !== "undefined" && name.length > 1 && description.length > 1) {

                const data = await createCategoryProject({name, description, categoryId, userId, status: 'progress'});
                
                if(typeof data !== 'undefined' && typeof data !== 'string') {
                    dispatch(addProject({id: data.id, name, description, status: 'progress', categoryId, userId}));
                }
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
                    <Button onClick={onCreatePost}>Create project</Button>
                    <Button type='warning' onClick={() => setOpen(false)}>Cancel</Button>
                </div> 
            </div>
        </div>
       
    );
};

export default ProjectCreate;