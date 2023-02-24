import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import { addProject, addTask } from '../../../../../store/todosSlice';
import Button from '../../../../../ui/Button/Button';
import Input from '../../../../../ui/Input/Input';
import Textarea from '../../../../../ui/Textarea/Textarea';
import { ITaskCreate } from '../../interfaces/TaskCreate.interface';
import { createProjectTask } from '../../services/todosAPI';
import styles from './TaskCreate.module.css';


const TaskCreate = ({setOpen, ...props}: ITaskCreate): JSX.Element => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentProject = useTypedSelector(state => state.todos.currentProject);
    const currentCategory = useTypedSelector(state => state.todos.currentCategory);

    const dispatch = useDispatch<AppDispatch>();

    const onCreateTask = async () => {
    
        try {
            if (typeof currentProject?.id !== 'undefined') {
                const data = await createProjectTask({name, description, projectId: currentProject?.id , status: 'progress', categoryId: currentCategory});                

                if(typeof data !== 'undefined' && typeof data !== 'string') {
                    dispatch(addTask({id: data.id, name, description, status: data.status, projectId: currentProject.id, categoryId: currentCategory }));
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
                    <Button onClick={onCreateTask}>Create task</Button>
                    <Button type='warning' onClick={() => setOpen(false)}>Cancel</Button>
                </div> 
            </div>
        </div>
       
    );
};

export default TaskCreate;