import styles from './WarningAuth.module.css';

const WarningAuth: React.FC = ():JSX.Element => {
    return (
        <div className={styles.warning}>
            You aren't logged in to your account, the functionality is not available
        </div>
    );
};

export default WarningAuth;