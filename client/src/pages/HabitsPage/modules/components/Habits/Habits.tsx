import { FC, Fragment, useEffect, useState } from "react";
import format from "date-fns/format";
import { useTypedSelector } from "../../../../../store/selectorTypedHook";
import Input from "../../../../../ui/Input/Input";
import Button from "../../../../../ui/Button/Button";
import { $authHost } from "../../../../AuthPage/modules/services/http.user";
import { createHabit } from "../../services/habitAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { addHabit, fetchHabits } from "../../../../../store/habitsSlice";

import styles from './Habit.module.css';
import { IHabit } from "../../interfaces/Habits.interfaces";

import getDaysInMonth from "date-fns/getDaysInMonth";
import setDate  from "date-fns/setDate";

const Habits:FC = ():JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const userId = useTypedSelector(state => state.user.user?.id)
    const habits = useTypedSelector(state => state.habits.habits);

    useEffect(() => {
        if (typeof userId !== 'undefined') {
            dispatch(fetchHabits(userId));
        }
    }, [])

    const setPerformance = (id: number, habit: IHabit) => {

        const date = setDate(new Date(), id + 1)
        console.log(date.toUTCString());
        console.log(date.getUTCMilliseconds());
        console.log(date.toISOString());
        
        
        
        // нужно добавить метод в API patch для обновления дат в привычке
        // 
    }

    return (
        <>
            <thead>
                <tr>
                    <th>
                        Habits
                    </th>
                    <th>
                        Month: {format(new Date(), 'MMMM')}
                    </th>
                </tr>
            </thead>
            <tbody>
                {habits?.map(habit => {
                    return (
                        <tr key={habit.id} id={habit.id}>
                            <td>{habit.name}</td>
                            <td>
                                {[...Array(getDaysInMonth(new Date()))].map((date, i) => {
                                    return (
                                        <input onClick={() => setPerformance(i, habit)} key={i} id={`${i}`} type='checkbox' className={styles.day}/>
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


// const constructorDate = () => {

//     const daysInMonth = getDaysInMonth(new Date());

//     return (
        
//     )
// }


export default Habits;