import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthPage from "./AuthPage/AuthPage";
import MainPage from "./MainPage/MainPage";
import { withLayout } from "./Layout/Layout";

const RouterComponent = ():JSX.Element => {
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