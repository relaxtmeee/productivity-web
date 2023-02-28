import { INavbar } from "./Navbar.props";
import styles from "./Navbar.module.css";
import Button from "../../../ui/Button/Button";
import { useTypedSelector } from "../../../store/selectorTypedHook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchUser } from "../../../store/userSlice";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import cn from 'classnames';
import { setPostsNull } from "../../../store/postsSlice";
import PTag from "../../../ui/PTag/PTag";

const Navbar = ({className, ...props}: INavbar ):JSX.Element => {

    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const user = useTypedSelector(state => state.user.auth);
    const userEmail = useTypedSelector(state => state.user.user?.email);
    const dispatch = useDispatch<AppDispatch>();

    let location = useLocation();

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
            <div className={cn(styles.logo, {
                    [styles.active]: location.pathname === '/'
                })}
            >
                <NavLink to={'/'}>
                    MyWeb
                </NavLink>
            </div>
            <div className={cn(styles.menu, {
                [styles.active]: openMenu
            })}>
                <ul className={styles.links}>
                    <li 
                        onClick={() => setOpenMenu(false)} 
                        className={cn(styles.link, {
                            [styles.active]: location.pathname === '/posts'
                        })}
                    >
                        <NavLink to={'/posts'}>Blog</NavLink>
                    </li>
                    <li 
                        onClick={() => setOpenMenu(false)} 
                        className={cn(styles.link, {
                            [styles.active]: location.pathname === '/todos'
                        })}
                    >
                        <NavLink to={'/todos'}>Todo</NavLink>
                    </li>
                    <li 
                        onClick={() => setOpenMenu(false)} 
                        className={cn(styles.link, {
                            [styles.active]: location.pathname === '/habits'
                        })}
                    >
                        <NavLink to={'/habits'}>Habits</NavLink>
                    </li>
                    <li onClick={() => setOpenMenu(false)} className={styles.link}>
                        <a href="#">Training constructor</a>
                    </li>
                </ul>
                <div className={styles.user}>
                    {user ? 
                        <>
                            <PTag size='16' className={styles.name}>
                                {userEmail}
                            </PTag>
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