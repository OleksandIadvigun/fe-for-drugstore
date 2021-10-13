import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavbarApp from "./components/Navbar";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {MySpinner} from "./components/common/MySpinner";
import {useAlert} from "react-alert";
import FooterApp from "./components/FooterApp";
import styles from './BaseLayout.module.css'

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(false)

    const customAlert = useAlert()

    if (loading) {
        return (MySpinner)
    }

    return (
        <BrowserRouter>
            <div className={styles.mainWrapper}>
            <NavbarApp/>
            <main>
            <AppRouter/>
            </main>
                <FooterApp/>
            </div>
        </BrowserRouter>
    );
})

export default App;
