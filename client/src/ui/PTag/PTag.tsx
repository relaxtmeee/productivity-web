import styles from './PTag.module.css';
import { IPTag} from './PTag.interface';
import cn from 'classnames';

const PTag = ({size, children, className, ...props}:IPTag): JSX.Element => {

    switch (size) {
        case '14': 
            return <p {...props} className={cn(styles.p14, className)}>{children}</p>
        case '16': 
            return <p {...props} className={cn(styles.p16, className)}>{children}</p>
        case '18': 
            return <p {...props} className={cn(styles.p18, className)}>{children}</p>
        default:
            return <></>
    }

};

export default PTag;