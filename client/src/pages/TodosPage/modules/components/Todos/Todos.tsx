import { FC, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import { addCategory, fetchCategories, fetchCategoryProjects, setCurrentCategory } from '../../../../../store/todosSlice';
import Button from '../../../../../ui/Button/Button';
import { ErrorMessage } from '../../../../../ui/Error/ErrorBoundary';
import Input from '../../../../../ui/Input/Input';
import PTag from '../../../../../ui/PTag/PTag';
import Spinner from '../../../../../ui/Spinner/Spinner';
import WarningAuth from '../../../../../ui/WarningAuth/WarningAuth';
import cn from 'classnames';
import { createNewCategory } from '../../services/todosAPI';
import styles from './Todos.module.css';
import HTag from '../../../../../ui/Htag/HTag';
import ProjectCreate from '../ProjectCreate/ProjectCreate';

const Todos: React.FC = ():JSX.Element => {

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

    const dispatch = useDispatch<AppDispatch>();

    const categories = useTypedSelector(state => state.todos.categories);
    const currentCategory = useTypedSelector(state => state.todos.currentCategory);
    
    return (
        <>  
            {categories?.map(category => {
                return (
                    <Button 
                        onClick={() => dispatch(setCurrentCategory(category.id))} 
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

const ProjectGeneration:FC = ():JSX.Element => {
    
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const currentCategory = useTypedSelector(state => state.todos.currentCategory);
    const loading = useTypedSelector(state => state.todos.curentCategoryLoadingStatus)    
    const currentCategoryProjects = useTypedSelector(state => state.todos.curentCategoryProjects);
    
    useEffect(() => {
        dispatch(fetchCategoryProjects(currentCategory))
    }, [currentCategory, dispatch])

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
            {currentCategory 
                ?
            <div className={styles.projects}>

                {typeof currentCategoryProjects !== 'undefined' && currentCategoryProjects?.length > 0 
                    ? 
                currentCategoryProjects?.map(el => {
                    return (
                        <article className={styles.project} key={el.id}>
                            <HTag htag='h2'>{el.name}</HTag>
                            <PTag size='18'>{el.description}</PTag>
                            <PTag size='14'>Status: {el.status}</PTag>
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

export default Todos;