import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { IHabit } from "../interfaces/Habits.interfaces";

export async function getHabits(userId: string): Promise<IHabit[] | undefined | string> {
    try {
      if(typeof userId !== "undefined") {
        const { data } = await $authHost.get<IHabit[]>(process.env.REACT_APP_API + `/habits/?userId=${userId}`);
        return data;
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