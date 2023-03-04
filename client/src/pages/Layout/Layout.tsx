import { FunctionComponent, useEffect, useState } from "react";
import styles from './Layout.module.css';
import { ILayout } from "./Layout.interface";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { check } from "../AuthPage/modules/services/userAPI";
import { fetchedUser, fetchingUser, fetchUser } from "../../store/userSlice";
import Spinner from "../../ui/Spinner/Spinner";
import { BrowserRouter as Router } from 'react-router-dom';

const Layout = ({children}: ILayout):JSX.Element => {

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        check()
            .then((data) => {
                dispatch(fetchingUser());
                dispatch(fetchUser({user: data, auth: true}));
            })
            .catch(() => {
                dispatch(fetchedUser());
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if(loading) {
        return <>
            <Spinner/>
        </>
    }

    return (
        <Router>
            <div className={styles.wrapper}>
                <Navbar />
                <main 
                    role='main'
                    className={styles.body}

                >
                    <div className={styles.gradient}>
                        {children}
                    </div>
                </main>
                <Footer className={styles.footer}/>
            </div>
        </Router>
 
    )
}

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
            <Layout>
                <Component {...props} />
            </Layout>
		);
	};
};