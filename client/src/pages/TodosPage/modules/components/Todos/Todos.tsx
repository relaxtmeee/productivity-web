import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import { addCategory, deleteProject, deleteTask, fetchCategories, fetchCategoryProjects, fetchProjectTasks, setCurrentCategory, setCurrentProject, setTasksNull } from '../../../../../store/todosSlice';
import Button from '../../../../../ui/Button/Button';
import { ErrorMessage } from '../../../../../ui/Error/ErrorBoundary';
import Input from '../../../../../ui/Input/Input';
import PTag from '../../../../../ui/PTag/PTag';
import Spinner from '../../../../../ui/Spinner/Spinner';
import WarningAuth from '../../../../../ui/WarningAuth/WarningAuth';
import cn from 'classnames';
import { createNewCategory, deleteCategoryProject, deleteProjectTask } from '../../services/todosAPI';
import styles from './Todos.module.css';
import HTag from '../../../../../ui/Htag/HTag';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import { IProject } from '../../interfaces/Project.interface';
import TaskCreate from '../TaskCreate/TaskCreate';

const Todos = ():JSX.Element => {

    const [category, setCategory] = useState<string>('');

    const userId = useTypedSelector(state => state.user.user?.id);
    const loading = useTypedSelector(state => state.todos.todosLoadingStatus);
    
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if ( typeof userId !== 'undefined') {
            dispatch(fetchCategories(userId));
        }
    }, []);

    const addNewCategory = async () => {
        try {
            if(typeof userId !== 'undefined') {
                await createNewCategory({name: category, status: 'progress', userId})
                    .then(data => {
                        dispatch(addCategory(data));
                    })
            }
        } catch (error) {
            console.log(error);
        } finally {
            setCategory('');
        }
    }

    if(loading === 'pending') {
        return <>
            <Spinner/>
        </>
    } 

    if(loading === 'failed') {
        return <ErrorMessage />
    }
    
    if(!userId) {
        return <WarningAuth />
    }

    return (
    <div className={styles.todos}>  
        <div className={styles.category}>
            <PTag size='18'>Categories</PTag>
            <TodosGeneration />
            <Input placeholder='Set category' value={category} onChange={(e) => setCategory(e.target.value)}/>
            <Button onClick={addNewCategory} className={styles.button}>
                Add category
            </Button>
        </div>
        <ProjectGeneration />
    </div>
    );
};


const TodosGeneration = (): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const categories = useTypedSelector(state => state.todos.categories);
    const currentCategory = useTypedSelector(state => state.todos.currentCategory);
    
    return (
        <>  
            {categories?.map(category => {
                return (
                    <Button 
                        onClick={() => {
                            dispatch(setCurrentCategory(category.id));
                            dispatch(setCurrentProject(undefined))
                        }} 
                        className={cn(styles.categoryButton, {
                            [styles.activeButton]: currentCategory === category.id
                        })} 
                        key={category.id}
                    >
                        {category.name}
                    </Button>
                )
            })}
        </>
    )
}

const ProjectGeneration = ():JSX.Element => {
    
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const currentCategory = useTypedSelector(state => state.todos.currentCategory);
    const loading = useTypedSelector(state => state.todos.curentCategoryLoadingStatus);   
    const currentCategoryProjects = useTypedSelector(state => state.todos.curentCategoryProjects);

    const currentProject = useTypedSelector(state => state.todos.currentProject)

    useEffect(() => {
        dispatch(fetchCategoryProjects(currentCategory))
    }, [currentCategory, dispatch])

    const openProject = async (project: IProject) => {
        dispatch(setCurrentProject(project));
    }

    const deleteOneProject = async (id: string) => {
        await deleteCategoryProject(id)
            .then(() => {
                dispatch(deleteProject(id));
                dispatch(setTasksNull());
            })
    }
    
    return (
        <div className={styles.projectsWrapper}>
            {open ? <ProjectCreate setOpen={setOpen}/> : null}
            <PTag size='18'>Projects</PTag>
            {currentCategory 
                ? 
            <Button onClick={() => setOpen(true)}>
                Add project
            </Button>
                :
            null}
            {currentProject ? <TasksGeneration/> : null}
            {currentCategory 
                ?
            <div className={styles.projects}>

                {typeof currentCategoryProjects !== 'undefined' && currentCategoryProjects?.length > 0 
                    ? 
                currentCategoryProjects?.map(el => {
                    return (
                        <article 
                            onClick={() => openProject(el)} 
                            className={cn(styles.project, {
                                [styles.activeProject]: el.id === currentProject?.id
                            })}
                            key={el.id}
                        >
                            <HTag htag='h2'>{el.name}</HTag>
                            <PTag size='18'>{el.description}</PTag>
                            <PTag size='14'>Status: {el.status}</PTag>
                            <div onClick={() => deleteOneProject(el.id || '')} className={styles.x}></div>
                        </article>
                        
                    )
                    
                }) 
                    : 
                <HTag htag='h3'>Empty</HTag>}
            </div> 
                :
            <HTag htag='h2'>Choose category</HTag>
            }
            {loading === 'pending' ? <Spinner /> : null}
            {loading === 'failed' ? <ErrorMessage /> : null}
        </div>
    )
}

const TasksGeneration = ():JSX.Element => {

    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const tasks = useTypedSelector(state => state.todos.currentProjectTasks);
    const currentProject = useTypedSelector(state => state.todos.currentProject);

    useEffect(() => {
        dispatch(fetchProjectTasks(currentProject?.id || ''));
    }, [dispatch, currentProject])

    const deleteCurrentProjectTask = async (id: string) => {
        
        try {
            await deleteProjectTask(id)
                .then(() => {
                    dispatch(deleteTask(id));  
                })
            
        } catch (error) {
            
        }
    }
    
    return (
        <div className={styles.tasks}>
            {open ? <TaskCreate setOpen={setOpen}/> : null}
            <Button onClick={() => setOpen(true)} className={styles.taskButton}>
                Add Task
            </Button>
            {tasks?.map(task => {
                return (
                    <div key={task.id} className={styles.task}>
                        <HTag htag='h3'>
                            {task.name}
                        </HTag>
                        <PTag size='18'>
                            {task.description}
                        </PTag>
                        <PTag size='14'>
                            {task.status}
                        </PTag>
                        <div onClick={() => deleteCurrentProjectTask(task.id || '')} className={styles.x}></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Todos;