import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { IPost } from "../../../PostsPage/modules/interfaces/Posts.interface";


export async function getOnePost(postId: string): Promise<IPost | undefined | string>  {
    try {
        if (typeof postId !== 'undefined') {
            const { data } = await $authHost.get<IPost>(process.env.REACT_APP_API + `/post/${postId}`);            
            return data;
        }
    } catch (error) {
        if (error instanceof Error) {
            return error.message
          }  
    }
}


export async function deleteOnePost(postId: string): Promise<1 | 0 | undefined | string>  {
    try {
        const { data } = await $authHost.delete<1 | 0>(process.env.REACT_APP_API + `/post/${postId}`);            
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }  
    }
}