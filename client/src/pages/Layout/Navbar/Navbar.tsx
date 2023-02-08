import { INavbar } from "./Navbar.props";
import styles from "./Navbar.module.css";
import Button from "../../../ui/Button/Button";

const Navbar = ({className, ...props}: INavbar ):JSX.Element => {
    return (
        <nav className={styles.nav} {...props}>
            <div className={styles.logo}>
                MyWeb
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <a href="#">Blog</a>
                </li>
                <li className={styles.link}>
                    <a href="#">Todo</a>
                </li>
                <li className={styles.link}>
                    <a href="#">Habits</a>
                </li>
                <li className={styles.link}>
                    <a href="#">Training constructor</a>
                </li>
            </ul>
            <div className={styles.user}>
                <div className={styles.name}>
                    username
                </div>
                <Button>
                    Выйти
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;