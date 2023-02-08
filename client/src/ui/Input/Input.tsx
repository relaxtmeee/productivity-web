import styles from './Input.module.css';
import { IInput } from './Input.interface';

const Input = ({...props} : IInput): JSX.Element => {

    return (
        <input {...props} className={styles.input}/>
    );   

};

export default Input;