import styles from './Button.module.css';
import { IButton } from './Button.interface';

const Button = ({children, ...props} : IButton) => {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;