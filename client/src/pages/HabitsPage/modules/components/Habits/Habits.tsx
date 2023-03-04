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

import styles from './Habits.module.css';
import { IHabit } from "../../interfaces/Habits.interfaces";

import getDaysInMonth from "date-fns/getDaysInMonth";
import setDate  from "date-fns/setDate";

const Habits:FC = ():JSX.Element => {

    const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'MMMM yyyy'));

    const dispatch = useDispatch<AppDispatch>();

    const userId = useTypedSelector(state => state.user.user?.id)
    const habits = useTypedSelector(state => state.habits.habits);

    useEffect(() => {
        if (typeof userId !== 'undefined') {
            dispatch(fetchHabits(userId));
        }
    }, []);

    const setPerformance = (e: React.MouseEvent<HTMLLabelElement, MouseEvent> ,id: number, habit: IHabit) => {

        const date = setDate(new Date(currentDate), id + 1); // получение выбранной даты
        console.log((e.target as HTMLInputElement).checked);
        
        
        // нужно добавить метод в API patch для обновления дат в привычке
    }

    return (
        <>
            <thead>
                <tr>
                    <th>
                        Habits
                    </th>
                    <th>
                        Month: {currentDate}
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
                                        <label className={styles.day} onClick={(e) => setPerformance(e, i, habit)} id={`${i}`} key={i}>
                                            <input type='checkbox'/>
                                        </label>
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

export default Habits;