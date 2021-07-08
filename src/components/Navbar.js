import {useContext} from "react";
import {Context} from "../index";
import {Container, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, Redirect} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constants";
import styles from './Navbar.module.css'
import {observer} from "mobx-react-lite";
import {useHistory} from 'react-router-dom'
import img from '../assets/logo2.png'
import {isAdmin} from "../http/UserApi";
//import imgActive from '../assets/logo2Active.png'

const NavbarApp = observer(() => {
    const{user} = useContext(Context)
    const history = useHistory()

  return (
      <Navbar bg="dark" variant="dark" className="d-flex justify-content-between" >
          <div className={`d-flex align-items-center w-25 ms-2`}  >
              <NavLink to={SHOP_ROUTE} className={styles.whiteText}>Techno World
                  <Image height={50}
                         width={100}
                         src={img}
                         className={styles.animate1}
                  /></NavLink>
              </div>
          {user.isAuth?
              <Nav className="m-lg-1 px-3">
                  {isAdmin() && <Nav.Link className="px-3" onClick={()=> {
                      history.push(ADMIN_ROUTE)
                  }}><i className="large material-icons">brightness_7</i></Nav.Link>
                  }
                  <Nav.Link><i className="large material-icons">account_circle</i></Nav.Link>
                  <Nav.Link className="px-3" onClick={()=> {
                      history.push(BASKET_ROUTE)
                  }} ><i className="large material-icons">shopping_cart</i></Nav.Link>
                  <Nav.Link className="px-3" onClick={()=>{
                      user.setIsAuth(false)
                      localStorage.clear()
                      history.push(LOGIN_ROUTE)
                  }}>EXIT</Nav.Link>
              </Nav>:
              <Nav className="m-lg-1 px-3">
                  <Nav.Link className="px-3" onClick={()=>{
                     // user.setIsAuth(true)
                      history.push(LOGIN_ROUTE)
                  }}>Login</Nav.Link>
                  <Nav.Link className="px-3" onClick={()=> {
                      history.push(REGISTRATION_ROUTE)
                  }}>Sign In</Nav.Link>
                  <Nav.Link className="px-3" onClick={()=> {
                      history.push(BASKET_ROUTE)
                  }} ><i className="large material-icons">shopping_cart</i></Nav.Link>
              </Nav>
          }
      </Navbar>
  );
})
export default NavbarApp
