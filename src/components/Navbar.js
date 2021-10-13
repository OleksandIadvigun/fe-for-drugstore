import {useContext, useState} from "react";
import {Context} from "../index";
import {Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/constants";
import styles from './Navbar.module.css'
import {observer} from "mobx-react-lite";
import img from '../assets/logoMain.png'
import {isAdmin} from "../http/UserApi";
import {fetchProducts} from "../http/ProductApi";
import {useAlert} from "react-alert";
import SpinnerInside from "./common/SpinnerInside";
//import imgActive from '../assets/logo2Active.png'

const NavbarApp = observer(() => {
    const {user} = useContext(Context)
    const {product} = useContext(Context)
    let[isLoading, setIsLoading]=useState(false)
    const history = useHistory()
    const customAlert = useAlert()

    return (
        <Navbar bg="dark" variant="dark" className="d-flex justify-content-between" style={{height:'6.5vh'}}>
            <div className={`d-flex align-items-center ms-3`} style={{width: 200}}>
                <NavLink to={SHOP_ROUTE} className={styles.whiteText}>Drugstore
                    <Image height={50}
                           width={50}
                           src={img}
                           className={styles.animate1}
                    /></NavLink>
            </div>
            <div style={{display:"flex",flexDirection:"row",textAlign:"center"}}>
            <input type="text" placeholder="Search..." style={{marginBottom:3,borderRadius:5, paddingLeft:5}}
            onChange={(event => product.setSearch(event.target.value))} value={product.search}
            />
            <span className={styles.search}
                  onClick={(event => {
                      setIsLoading(true)
                      fetchProducts(product.size, product.page, product.search, product.sortField, product.sortDirection)
                          .then(response => {
                              console.log(response.data + "products")
                              product.setProducts(response.data)
                              history.push(SHOP_ROUTE)
                              // product.setSearch('')
                          }).catch(error => {
                          const res = error.response.data.message.substr(0,45)
                          customAlert.show(res)
                          })
                          .finally(()=> setIsLoading(false))
                  })}>
              <span>{isLoading? SpinnerInside: <i className="large material-icons " style={{fontSize:24}} >search</i>}</span>
          </span>
            </div>
            {user.isAuth ?
                <Nav className="m-lg-1 px-3">
                    {isAdmin() && <Nav.Link className="px-3" onClick={() => {
                        history.push(ADMIN_ROUTE)
                    }}><i className="large material-icons">brightness_7</i></Nav.Link>
                    }
                    <Nav.Link><i className="large material-icons">account_circle</i></Nav.Link>
                    <Nav.Link className="px-3" onClick={() => {
                        history.push(BASKET_ROUTE)
                    }}><i className="large material-icons " style={{fontSize:28}}>shopping_cart</i></Nav.Link>
                    <Nav.Link className="px-3" onClick={() => {
                        user.setIsAuth(false)
                        localStorage.clear()
                        history.push(LOGIN_ROUTE)
                    }}>EXIT</Nav.Link>
                </Nav> :
                <Nav className="m-lg-1 px-3">
                    <Nav.Link className="px-3" onClick={() => {
                        history.push(ADMIN_ROUTE)
                    }}><i className="large material-icons">brightness_7</i></Nav.Link>
                    <Nav.Link className="px-3" onClick={() => {
                        // user.setIsAuth(true)
                        history.push(LOGIN_ROUTE)
                    }}>Login</Nav.Link>
                    <Nav.Link className="px-3" onClick={() => {
                        history.push(REGISTRATION_ROUTE)
                    }}>Sign In</Nav.Link>
                    <Nav.Link className="px-3" onClick={() => {
                        history.push(BASKET_ROUTE)
                    }}><div style={{display:"flex", flexDirection:"column"}}><i className="large material-icons" style={{fontSize:28}}>shopping_cart</i>
                        {product.cartNumber > 0? <span style={{ marginTop:"-38px",marginLeft:23, color:"white",background:'#0c9380',borderRadius:"80px", width:"65%", fontSize:12}}>{product.cartNumber}</span>:''}</div></Nav.Link>
                </Nav>
            }
        </Navbar>
    );
})
export default NavbarApp
