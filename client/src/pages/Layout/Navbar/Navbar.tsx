import { INavbar } from "./Navbar.props";
import styles from "./Navbar.module.css";
import Button from "../../../ui/Button/Button";
import { useTypedSelector } from "../../../store/selectorTypedHook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchUser } from "../../../store/userSlice";
import { NavLink } from "react-router-dom";
import { fetchPosts } from "../../../store/postsSlice";

const Navbar = ({className, ...props}: INavbar ):JSX.Element => {

    const user = useTypedSelector(state => state.user.auth);
    const userEmail = useTypedSelector(state => state.user.user?.email);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const logIn = () => {
        navigate('/auth');
    }

    const logOut = () => {
        dispatch(fetchUser({user: {}, auth: false}));

        localStorage.removeItem('token');
        navigate('/auth');
    }
    
    return (
        <nav className={styles.nav} {...props}>
            <div className={styles.logo}>
                <NavLink to={'/'}>
                    MyWeb
                </NavLink>
            </div>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <NavLink to={'/posts'}>Blog</NavLink>
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
                            {userEmail}
                        </div>
                        <Button onClick={logOut}>
                            Log out
                        </Button> 
                    </>
                    : 
                    <Button onClick={logIn}>Log in</Button>
                }
            </div>
        </nav>
    );
};

export default Navbar;