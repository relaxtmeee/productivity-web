import { ISpinner } from './Spinner.interface';
import styles from './Spinner.module.css';

const Spinner = ({className, ...props}: ISpinner) => {
    return (
        <div {...props} className={styles.lds}><div></div><div></div><div></div><div></div></div>
    );
};

export default Spinner;