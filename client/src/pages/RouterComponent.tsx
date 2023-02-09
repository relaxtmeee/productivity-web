import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import MainPage from "./MainPage/MainPage";
import { withLayout } from "./Layout/Layout";
import PostPage from "./PostsPage/PostsPage";

const RouterComponent = ():JSX.Element => {

    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/posts" element={<PostPage/>}/>
        </Routes>
    );
};

export default withLayout(RouterComponent);