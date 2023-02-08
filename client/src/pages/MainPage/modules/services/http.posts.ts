import axios from "axios";
import { IPost } from "../interfaces/Posts.interface";

export async function getPost() {
  try {
    const { data } = await axios.get<IPost[]>('http://localhost:5001/api/post?userId=1')
    return data;
  } catch (error) {
    console.log(error);
    
  }
}