import { useNavigate } from "react-router-dom";
import AuthForm from "./modules/AuthForm/AuthForm";

import styles from './AuthPage.module.css';

import { useTypedSelector } from "../../store/selectorTypedHook";

const AuthPage = () => {

    return (
        <div className={styles.auth}>
            <AuthForm />
        </div>
    );
};

export default AuthPage;