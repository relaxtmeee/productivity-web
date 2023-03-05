import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { IHabit } from "../interfaces/Habits.interfaces";

export async function getHabits(userId: string): Promise<IHabit[] | undefined | string> {
    try {
      if(typeof userId !== "undefined") {
        const { data } = await $authHost.get<IHabit[]>(process.env.REACT_APP_API + `/habits/?userId=${userId}`);

        const newData = data.map(habit => {

          habit.dates = habit.dates?.map(date => {
            return (
              new Date(date).toLocaleDateString()
            )
          })

          return habit
        })

        return newData
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }      
    }
}

export async function createHabit(post: IHabit) {
  try {
    const { data } = await $authHost.post<IHabit>(process.env.REACT_APP_API + `/habits`, post);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }   
  }


}

export async function patchAddDateToHabit(habitId: string, date: string) {
  try {
    const { data } = await $authHost.patch<IHabit>(process.env.REACT_APP_API + `/habits`, {habitId, date});    
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }   
  }
}

export async function patchDeleteDateFromHabit(habitId: string, date: string) {
  try {
    const { data } = await $authHost.patch<IHabit>(process.env.REACT_APP_API + `/habits/${habitId}`, date);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message
    }   
  }
}