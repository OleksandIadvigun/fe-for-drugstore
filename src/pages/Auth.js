import {Card, Container, Form, Nav, Row} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {login, registration} from "../http/UserApi";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useAlert} from "react-alert";
import styles from './Registration.module.css'
import FadeIn from "react-fade-in";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const customAlert = useAlert()

    const submit = async(e) =>{
        e.preventDefault()
        if(isLogin) {
          try {
              const userFromDB = await login(email, password)
              user.setUser(userFromDB)
              user.setIsAuth(true)
              history.push(SHOP_ROUTE)
              console.log(userFromDB)
          }catch (e) {
              customAlert.show(e.response.data.message)
          }
        }else{
            try {
                const message = await registration(email, password)
                customAlert.show(`Success! You can login now.`,{ type: 'info' })
                history.push(LOGIN_ROUTE)
                console.log(message)
            }catch (e) {
                customAlert.show(e.response.data.message)
            }
        }

    }

    return (
        <FadeIn transitionDuration={800}>
        <Container className="d-flex justify-content-center align-items-center"
                   style={{height: '92vh' }}
        >
            <div className={styles.card}>
                <div className={styles.box}>
            {/*<Card style={{width: 600}} className="p-5">*/}
                <h2 className="m-auto">{isLogin ? 'Login' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className='mt-3'
                        placeholder='Input email'
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Input password'
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {isLogin ?
                        <Row className="d-flex justify-content-center mt-3">
                            <span>Not registered? <NavLink to={REGISTRATION_ROUTE} className={styles.href}>Sign In</NavLink></span>
                            <button className="btn-warning mt-3 pe-lg-2 btn-sm border-1 w-auto"
                            onClick={(e)=>submit(e)}
                            >Enter</button>
                        </Row> :
                        <Row className="d-flex justify-content-center mt-3">
                            <span>Do you have account? <NavLink to={LOGIN_ROUTE} className={styles.href}>Login</NavLink></span>
                        <button className="btn-warning mt-3 pe-lg-2 btn-sm border-1 w-auto align-self-center"
                                onClick={(e)=>submit(e)}
                        >Sign In</button>
                        </Row> }
                </Form>
            {/*</Card>*/}
                </div>
            </div>
        </Container>
        </FadeIn>
    );
})
export default Auth
