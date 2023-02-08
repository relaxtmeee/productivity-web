import styles from './Button.module.css';
import { IButton } from './Button.interface';

const Button = ({children} : IButton) => {
    return (
        <button className={styles.button}>
            {children}
        </button>
    );
};

export default Button;