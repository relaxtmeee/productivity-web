import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import MainPage from "./MainPage/MainPage";
import { withLayout } from "./Layout/Layout";
import { useTypedSelector } from "../store/selectorTypedHook";

const RouterComponent = ():JSX.Element => {

    const user = useTypedSelector(state => state.user.auth);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/auth" element={<AuthPage/>}/>
            </Routes>
        </Router>
    );
};

export default withLayout(RouterComponent);