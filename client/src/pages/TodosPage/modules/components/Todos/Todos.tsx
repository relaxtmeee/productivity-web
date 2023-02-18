import { useEffect, useState } from 'react';
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
import { ICategory } from '../../interfaces/Category.interface';
import { createNewCategory } from '../../services/todosAPI';
import styles from './Todos.module.css';

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
        <ProjectGeneration/>
        </div>
    );
};

const TodosGeneration = (): JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const categories = useTypedSelector(state => state.todos.categories);

    const openProject = async (id: string) => {
        dispatch(setCurrentCategory(id));
        await dispatch(fetchCategoryProjects(id))
    }

    return (
        <>  
            {categories?.map(category => {
                return (
                    <Button onClick={() => openProject(category.id ?? '')} className={styles.categoryButton} key={category.id}>
                        {category.name}
                    </Button>
                )
            })}
        </>
    )
}

const ProjectGeneration = ():JSX.Element => {

    const currentCategory = useTypedSelector(state => state.todos.currentCategory);
    const currentCategoryProjects = useTypedSelector(state => state.todos.curentCategoryProjects);
    
    return (
        <>
            {currentCategory 
                ?
            <div>
                <h1>{currentCategory}</h1>
                {currentCategoryProjects?.map(el => {
                    return <div>{el.name}</div>
                })}
            </div> 
               
                :
            <div>Выберите категорию</div>
            }
        </>
    )
}

export default Todos;