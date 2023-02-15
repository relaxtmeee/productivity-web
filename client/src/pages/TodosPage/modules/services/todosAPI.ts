import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { ICategory } from "../interfaces/Category.interface";


export async function getCategories (userId: string) : Promise<ICategory[] | undefined | string> {
    try {
        if(typeof userId !== "undefined") {
            const { data } = await $authHost.get<ICategory[]>(process.env.REACT_APP_API + `/category/?userId=${userId}`);
            return data;
        }
    } catch (error) {
        if(error instanceof Error) {
            return error.message
        }
    }
}