import { Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import MainPage from "./MainPage/MainPage";
import { withLayout } from "./Layout/Layout";

const RouterComponent = ():JSX.Element => {

    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
    );
};

export default withLayout(RouterComponent);