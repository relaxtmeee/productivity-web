import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { IPost } from "../../../PostsPage/modules/interfaces/Posts.interface";


export async function getOnePost(postId: string, userId: string) {
    try {
        if (typeof postId !== 'undefined') {
            const { data } = await $authHost.get<IPost>(process.env.REACT_APP_API + `/post/${postId}?userId=${userId}`);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
  }