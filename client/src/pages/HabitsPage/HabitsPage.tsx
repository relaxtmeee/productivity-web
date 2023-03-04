import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addHabit } from '../../store/habitsSlice';
import { useTypedSelector } from '../../store/selectorTypedHook';
import { AppDispatch } from '../../store/store';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import styles from './HabitsPage.module.css';
import Habits from './modules/components/Habits/Habits';
import { createHabit } from './modules/services/habitAPI';

const HabitsPage = () => {
    const [name, setName] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const userId = useTypedSelector(state => state.user.user?.id);
    
    const addNewHabit = async () => {
        await createHabit({name: name, dates: [], userId: userId || ''})
            .then((data) => {
                dispatch(addHabit(data));
            })
    }
    
    return (
        <>  
        <table className={styles.layout}>
            <Habits/>
        </table>
        <div>
            Новая привычка
        </div>
        <div>
            <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            <Button onClick={addNewHabit}> 
                SEND
            </Button>
        </div>
        </>
        
       
    );
};

export default HabitsPage;