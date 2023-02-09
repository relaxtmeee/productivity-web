import { $authHost } from "../../../AuthPage/modules/services/http.user";
import { IPost } from "../interfaces/Posts.interface";

export async function getPost(userId: number | undefined) {
    try {
      if(typeof userId !== "undefined") {
        const { data } = await $authHost.get<IPost[]>(process.env.REACT_APP_API + `/post/?userId=${35}`);
        return data;
      }
    } catch (error) {
      console.log(error);
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