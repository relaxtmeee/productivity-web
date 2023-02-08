import AuthForm from "./modules/AuthForm/AuthForm";
import styles from './AuthPage.module.css';
const AuthPage = () => {
    return (
        <div className={styles.auth}>
            <AuthForm />
        </div>
    );
};

export default AuthPage;