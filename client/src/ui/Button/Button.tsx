import styles from './Button.module.css';
import { IButton } from './Button.interface';
import cn from 'classnames';
import PTag from '../PTag/PTag';

const Button = ({type, children, className, ...props} : IButton) => {
    return (
        <button {...props} className={cn(className, styles.button, {
            [styles.warning]: type === 'warning',
            [styles.danger]: type === 'danger'
        })}>
            <PTag size='16'>
                {children}
            </PTag>
        </button>
    );
};

export default Button;