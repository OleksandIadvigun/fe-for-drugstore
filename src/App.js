import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavbarApp from "./components/Navbar";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {check} from "./http/UserApi";
import {Spinner} from "react-bootstrap";
import {MySpinner} from "./components/common/MySpinner";
import {useAlert} from "react-alert";
import FooterApp from "./components/FooterApp";
import styles from './BaseLayout.module.css'

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const customAlert = useAlert()

    const isValidToken = async () => {
        try {
            await check().then((resp) => {
                if (resp.status === 200) {
                    user.setIsAuth(true)
                }
            })
        } catch (e) {
            customAlert.show(e.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        isValidToken()
    }, [])

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
