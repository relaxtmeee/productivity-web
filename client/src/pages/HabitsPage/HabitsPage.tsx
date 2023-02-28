import styles from './HabitsPage.module.css';
import Habits from './modules/components/Habits/Habits';

const HabitsPage = () => {
    return (
        <div className={styles.layout}>
            <Habits/>
        </div>
    );
};

export default HabitsPage;