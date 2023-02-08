import styles from './HTag.module.css';
import { IHTag } from './HTag.interface';
import cn from 'classnames';

const HTag = ({htag, children, className, ...props}:IHTag): JSX.Element => {

    switch (htag) {
        case 'h1': 
            return <h1 {...props} className={cn(styles.h1, className)}>{children}</h1>
        case 'h2': 
            return <h2 {...props} className={cn(styles.h2, className)}>{children}</h2>
        case 'h3': 
            return <h3 {...props} className={cn(styles.h3, className)}>{children}</h3>
        default:
            return <></>
    }

};

export default HTag;