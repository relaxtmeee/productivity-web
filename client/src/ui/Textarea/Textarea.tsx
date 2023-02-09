import styles from './Textarea.module.css';
import { ITextarea } from './Textarea.interface';

const Textarea = ({...props} : ITextarea): JSX.Element => {

    return (
        <textarea {...props} className={styles.textarea}/>
    );   

};

export default Textarea;