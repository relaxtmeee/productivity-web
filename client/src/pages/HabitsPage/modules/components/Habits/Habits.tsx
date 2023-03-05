import { FC, useEffect, useState } from "react";
import format from "date-fns/format";
import { useTypedSelector } from "../../../../../store/selectorTypedHook";
import { patchAddDateToHabit } from "../../services/habitAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { fetchHabits, updateDatesHabit, updatingDatesHabit } from "../../../../../store/habitsSlice";
import cn from 'classnames';
import styles from './Habits.module.css';
import { IHabit } from "../../interfaces/Habits.interfaces";

import getDaysInMonth from "date-fns/getDaysInMonth";
import setDate  from "date-fns/setDate";
import Spinner from "../../../../../ui/Spinner/Spinner";

const Habits:FC = ():JSX.Element => {

    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const dispatch = useDispatch<AppDispatch>();

    const userId = useTypedSelector(state => state.user.user?.id)
    const habits = useTypedSelector(state => state.habits.habits);

    useEffect(() => {
        if (typeof userId !== 'undefined') {
            dispatch(fetchHabits(userId));
        }
    }, [dispatch]);

    const setPerformance = async (e: React.MouseEvent<HTMLLabelElement, MouseEvent> ,id: number, habit: IHabit) => {
        
        const date = setDate(new Date(currentDate), id + 1).toDateString(); 
        
        try {
            if (habit.id) {
                const data = await patchAddDateToHabit(habit.id, date);
                
                dispatch(updateDatesHabit(data));
            }
        } catch (error) {
            
        }
    
    }
    
    return (
        <>
            <thead>
                <tr>
                    <th>
                        Habits
                    </th>
                    <th>
                        Month: {format(currentDate, 'MMMM yyyy')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {habits?.map(habit => {
                    return (
                        <tr key={habit.id} id={habit.id} className={styles.row}>
                            <td>{habit.name}</td>
                            <td>
                                {[...Array(getDaysInMonth(new Date()))].map((date, i) => {                                    
                                    return (
                                        // <label 
                                        //     className={cn(styles.day, {
                                        //         [styles.active]: habit.dates?.includes(setDate(new Date(currentDate), i + 1).toLocaleDateString())
                                        //     })} 
                                        //     onClick={(e) => setPerformance(e, i, habit)} 
                                        //     id={`${i}`} 
                                        //     key={i}
                                        // >
                                        //     <input type='checkbox'/>
                                        // </label>
                                        <DateCur key={i} habit={habit} currentDate={currentDate} i={i} setPerformance={(e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => setPerformance(e, i, habit)}/>
                                    )
                                })}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </>
    );
};

interface IOr {
    habit: IHabit, currentDate: Date, i: number, setPerformance: (e: React.MouseEvent<HTMLLabelElement, MouseEvent> ,id: number, habit: IHabit) => void
}

const DateCur = ({habit, currentDate, i, setPerformance} : IOr) => {

    console.log(1);
    
    return ( 
        <label 
            className={cn(styles.day, {
                [styles.active]: habit.dates?.includes(setDate(new Date(currentDate), i + 1).toLocaleDateString())
            })} 
            onClick={(e) => setPerformance(e, i, habit)} 
            id={`${i}`} 
        >
        <input type='checkbox'/>
    </label>
    )
}

export default Habits;