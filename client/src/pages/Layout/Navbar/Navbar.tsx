import { INavbar } from "./Navbar.props";
import styles from "./Navbar.module.css";
import Button from "../../../ui/Button/Button";

const Navbar = ({className, ...props}: INavbar ):JSX.Element => {

    const user = false;

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
                {user ? 
                    <>
                        <div className={styles.name}>
                            username
                        </div>
                        <Button>
                            Выйти
                        </Button> 
                    </>
                    : 
                    <Button>Войти</Button>
                }
            </div>
        </nav>
    );
};

export default Navbar;