import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from '../../../../../store/selectorTypedHook';
import { AppDispatch } from '../../../../../store/store';
import { fetchCategories } from '../../../../../store/todosSlice';
import Button from '../../../../../ui/Button/Button';
import { ErrorMessage } from '../../../../../ui/Error/ErrorBoundary';
import Input from '../../../../../ui/Input/Input';
import PTag from '../../../../../ui/PTag/PTag';
import Spinner from '../../../../../ui/Spinner/Spinner';
import WarningAuth from '../../../../../ui/WarningAuth/WarningAuth';
import styles from './Todos.module.css';

const Todos: React.FC = ():JSX.Element => {

    const userId = useTypedSelector(state => state.user.user?.id);
    const loading = useTypedSelector(state => state.todos.postsLoadingStatus);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if ( typeof userId !== 'undefined') {
            dispatch(fetchCategories(userId));
        }
    }, []);

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
            <PTag size='18'>Categories</PTag>
            <TodosGeneration />
            <Input/>
            <Button className={styles.button}>
                Add category
            </Button>
        </div>
    );
};

const TodosGeneration = (): JSX.Element => {
    
    const categories = useTypedSelector(state => state.todos.categories);

    return (
        <>  
            {categories?.map(category => {
                return (
                    <div className={styles.category} key={category.id}>
                        {category.name}
                    </div>
                )
            })}
        </>
    )
}

export default Todos;