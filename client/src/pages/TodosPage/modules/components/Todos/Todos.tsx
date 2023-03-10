import { useEffect, useRef, createRef, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import { addCategory, deleteCategory, deleteProject, deleteTask, fetchCategories, fetchCategoryProjects, fetchProjectTasks, setCurrentCategory, setCurrentProject } from '../../../../../store/todosSlice';
import Button from '../../../../../ui/Button/Button';
import { ErrorMessage } from '../../../../../ui/Error/ErrorBoundary';
import Input from '../../../../../ui/Input/Input';
import PTag from '../../../../../ui/PTag/PTag';
import Spinner from '../../../../../ui/Spinner/Spinner';
import WarningAuth from '../../../../../ui/WarningAuth/WarningAuth';
import cn from 'classnames';
import { createNewCategory, deleteCategoryProject, deleteOneCategory, deleteProjectTask } from '../../services/todosAPI';
import styles from './Todos.module.css';
import './Fade.css';
import HTag from '../../../../../ui/Htag/HTag';
import ProjectCreate from '../ProjectCreate/ProjectCreate';
import { IProject } from '../../interfaces/Project.interface';
import TaskCreate from '../TaskCreate/TaskCreate';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { IOneTodo } from '../../interfaces/OneTodo.interface';


const Todos:FC = ():JSX.Element => {

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

const TodosGeneration:FC = (): JSX.Element => {

    const categories = useTypedSelector(state => state.todos.categories);
    const currentCategory = useTypedSelector(state => state.todos.currentCategory);
    
    return (
        <>  
            <TransitionGroup component={null} className={styles.items}>
                {categories?.map(category => {
                    return (
                        <CSSTransition 
                            key={category.id} 
                            timeout={300} 
                            classNames='category'
                        >
                            <OneTodo category={category} currentCategory={currentCategory}/>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </>
    )
}

const OneTodo:FC<IOneTodo> = ({category, currentCategory}):JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const deleteCurrentCategory = async () => {
        
        await deleteOneCategory(currentCategory)
            .then(() => {
                dispatch(deleteCategory(currentCategory));
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    return (
        <div className={cn({
            [styles.oneCategory]: currentCategory === category.id
        })}>
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
            {currentCategory === category.id 
                ? 
                <Button onClick={deleteCurrentCategory} className={styles.deleteCategory} type='danger'>
                    Delete category   
                </Button>                         
                :
            null
            }
        </div>
    )
}

const ProjectGeneration:FC = ():JSX.Element => {
    
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

    const deleteOneProject = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
        event.stopPropagation();
        await deleteCategoryProject(id)
            .then(() => {
                dispatch(deleteProject(id));
            })
    }
    
    return (
        <div className={styles.projectsWrapper}>
            {open ? <ProjectCreate setOpen={setOpen}/> : null}
            <PTag size='18'>Projects</PTag>
            {currentCategory 
                ? 
                <>
                    <Button onClick={() => setOpen(true)}>
                        Add project
                    </Button>
                </>
                :
            null}
            {currentProject ? <TasksGeneration/> : null}
            {currentCategory 
                ?
            <div className={styles.projects}>
                <TransitionGroup component={null} className={styles.items}>
                    {typeof currentCategoryProjects !== 'undefined'
                        ? 
                        currentCategoryProjects?.map(el => {
                            return (
                                <CSSTransition                             
                                    key={el.id} 
                                    timeout={300} 
                                    classNames='item'
                                >
                                    <article 
                                        onClick={() => openProject(el)} 
                                        className={cn(styles.project, {
                                            [styles.activeProject]: el.id === currentProject?.id
                                        })}

                                    >
                                        <HTag htag='h2'>{el.name}</HTag>
                                        <PTag size='18'>{el.description}</PTag>
                                        <PTag size='14'>Status: {el.status}</PTag>
                                        <div onClick={(event) => deleteOneProject(event, el.id || '')} className={styles.x}></div>
                                    </article>
                                </CSSTransition>
                            )
                        }) 
                        : 
                        <div>empty</div>
                    }
                </TransitionGroup> 
            </div> 
                :
            null
            }
            {loading === 'pending' 
                ? 
                <>
                    <HTag className={styles.choose} htag='h2'>Choose category</HTag>
                    <Spinner />
                </> 
                : 
            null}
            {loading === 'failed' ? <ErrorMessage /> : null}
        </div>
    )
}


const TasksGeneration:FC = ():JSX.Element => {

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
            <TransitionGroup component={null} className={styles.items}>
                {tasks && tasks.map(task => {
                    return (
                        <CSSTransition 
                            key={task.id} 
                            timeout={300} 
                            classNames='item'
                        >
                            <div className={styles.task}>
                                <HTag htag='h3'>
                                    {task.name}
                                </HTag>
                                <PTag size='18'>
                                    {task.description}
                                </PTag>
                                <PTag size='14'>
                                    {task.status}
                                </PTag>
                                <div 
                                    onClick={() => {
                                        deleteCurrentProjectTask(task.id || '')
                                    }} 
                                    className={styles.x}
                                ></div>
                            </div>
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </div>
    )
}

export default Todos;