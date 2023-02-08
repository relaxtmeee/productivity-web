import { FunctionComponent, useState } from "react";
import styles from './Layout.module.css';
import { ILayout } from "./Layout.interface";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

const Layout = ({children}: ILayout):JSX.Element => {

    return (
        <div className={styles.wrapper}>
            <Navbar />
            <main 
                role='main'
                className={styles.body}

            >
                {children}
            </main>
            <Footer className={styles.footer}/>
        </div>
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