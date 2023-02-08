import axios from "axios";
import { IPost } from "../interfaces/Posts.interface";

export async function getPost() {
    try {
      const { data } = await axios.get<IPost[]>(process.env.REACT_APP_API + '/post/?userId=1');
      return data;
    } catch (error) {
      console.log(error);
      
    }
}