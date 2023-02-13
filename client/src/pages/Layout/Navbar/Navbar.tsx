import { INavbar } from "./Navbar.props";
import styles from "./Navbar.module.css";
import Button from "../../../ui/Button/Button";
import { useTypedSelector } from "../../../store/selectorTypedHook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchUser } from "../../../store/userSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import cn from 'classnames';
import { setPostsNull } from "../../../store/postsSlice";

const Navbar = ({className, ...props}: INavbar ):JSX.Element => {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const user = useTypedSelector(state => state.user.auth);
    const userEmail = useTypedSelector(state => state.user.user?.email);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const logIn = () => {
        navigate('/auth');
        setOpenMenu(!openMenu);
    }

    const logOut = () => {
        dispatch(fetchUser({user: {}, auth: false}));
        dispatch(setPostsNull());
        localStorage.removeItem('token');
        navigate('/auth');
        setOpenMenu(!openMenu);
    }
    
    return (
        <nav className={styles.nav} {...props}>
            <div className={styles.logo}>
                <NavLink to={'/'}>
                    MyWeb
                </NavLink>
            </div>
            <div className={cn(styles.menu, {
                [styles.active]: openMenu
            })}>
                <ul className={styles.links}>
                    <li onClick={() => setOpenMenu(false)} className={styles.link}>
                        <NavLink to={'/posts'}>Blog</NavLink>
                    </li>
                    <li onClick={() => setOpenMenu(false)} className={styles.link}>
                        <a href="#">Todo</a>
                    </li>
                    <li onClick={() => setOpenMenu(false)} className={styles.link}>
                        <a href="#">Habits</a>
                    </li>
                    <li onClick={() => setOpenMenu(false)} className={styles.link}>
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
            </div>
            <div onClick={() => setOpenMenu(!openMenu)} className={cn(styles.menu_button, {
                [styles.active]: openMenu
            })}>
            </div>
        </nav>
    );
};

export default Navbar;