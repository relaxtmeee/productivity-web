import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import MainPage from "./MainPage/MainPage";
import { withLayout } from "./Layout/Layout";
import PostsPage from "./PostsPage/PostsPage";
import PostPage from "./PostPage/PostPage";
import TodosPage from "./TodosPage/TodosPage";
import HabitsPage from "./HabitsPage/HabitsPage";

const RouterComponent = ():JSX.Element => {

    return (
        <Routes>
            <Route path="/todos" element={<TodosPage/>}/>
            <Route path="/posts/:postId" element={<PostPage/>}/>
            <Route path="/posts" element={<PostsPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/habits" element={<HabitsPage/>}/>
            <Route path="/" element={<MainPage/>}/>
        </Routes>
    );
};

export default withLayout(RouterComponent);