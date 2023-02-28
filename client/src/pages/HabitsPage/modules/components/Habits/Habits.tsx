import { FC, useEffect, useState } from "react";
import format from "date-fns/format";
import { useTypedSelector } from "../../../../../store/selectorTypedHook";
import Input from "../../../../../ui/Input/Input";
import Button from "../../../../../ui/Button/Button";
import { $authHost } from "../../../../AuthPage/modules/services/http.user";

interface IHabit {
    id: string
    name: string
    date: Date[]
}

const Habits:FC = ():JSX.Element => {

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toString());

    const [dates, setDates] = useState<IHabit[]>([]);

    const userId = useTypedSelector(state => state.user.user?.id)
    
    useEffect(() => {
        $authHost.get<any, Promise<IHabit[]>>('/habits?userId=1')
            .then((data) => {
                data.json();
            })
    }, [])

    const addHabit = async () => {
        await $authHost.post('/habits', { name, dates: [date], userId })
    }

    return (
        <>
            <div>
                Habits
            </div>
            <div>
                Month: {format(new Date(), 'MMMM')}
            </div>
                {/* {dates.map(date => {
                    return (
                        <div>
                            {date.name}
                        </div>
                    )
                })} */}
            <div>

            </div>
            <div>
                <Input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                <Input type="date" onChange={(e) => setDate(new Date(e.target.value).toString())} value={date}/>
                <Button onClick={addHabit}> 
                    SEND
                </Button>
            </div>
        </>
    );
};

export default Habits;