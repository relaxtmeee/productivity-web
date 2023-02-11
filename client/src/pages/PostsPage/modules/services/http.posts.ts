import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { IPost } from "../interfaces/Posts.interface";

export async function getPost(userId: string | undefined): Promise<IPost[] | undefined | string> {
    try {
      if(typeof userId !== "undefined") {
        const { data } = await $authHost.get<IPost[]>(process.env.REACT_APP_API + `/post/?userId=${userId}`);
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message
      }      
    }
}

export async function createPost(post: IPost) {
  try {
    const { data } = await $authHost.post<IPost>(process.env.REACT_APP_API + `/post`, post);
    return data;
  } catch (error) {
    console.log(error);
  }
}