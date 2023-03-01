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

interface IHabit {
    id: string
    name: string
    date: Date[]
}

const Habits:FC = ():JSX.Element => {

    const [name, setName] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const userId = useTypedSelector(state => state.user.user?.id)
    const habits = useTypedSelector(state => state.habits.habits);

    useEffect(() => {
        if (typeof userId !== 'undefined') {
            dispatch(fetchHabits(userId));
        }
    }, [])

    const addNewHabit = async () => {
        await createHabit({name: name, dates: [], userId: userId || ''})
            .then((data) => {
                dispatch(addHabit(data));
            })
    }

    console.log(habits);
    

    return (
        <>
            <div>
                Habits
            </div>
            <div>
                Month: {format(new Date(), 'MMMM')}
            </div>
                {habits && habits.map(habit => {
                    return (
                        <Fragment key={habit.id}>
                            <div>{habit.name}</div>
                            <div>{habit.dates?.map((date) => {
                                return (
                                    <div>
                                        {new Date(date).toDateString()}
                                    </div>
                                )
                            })}</div>
                        </Fragment>
                        
                    )
                })}
            <div>

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

export default Habits;