import {Card, Image} from "react-bootstrap";
import rate from '../assets/ff.png';
import rateActive from '../assets/ff3.png';
import {useHistory} from 'react-router-dom'
import styles from './DeviceItem.module.css'
import {DEVICE_ROUTE} from "../utils/constants";
import img from '../assets/grug5.png'
import {AddToCart, UpdateCart} from "../http/ProductApi";
import {useContext, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";


const DeviceItem = observer(({item}) => {
    const history = useHistory()
    const {product} = useContext(Context)
    const [clicked, setClicked] =useState([])
    const URL = 'http://localhost:5000/'
    function prepareData(id) {
        const isPresent = product.orderItems.filter(el=>el.productNumber === id)
        const filtered = product.orderItems.filter(el=>el.productNumber !== id)
        return isPresent.length > 0 ? {orderItems: filtered.concat([{
            productNumber:isPresent[0].productNumber ,
                    quantity: isPresent[0].quantity + 1}])
        }
    : {orderItems: product.orderItems.concat([{
                    productNumber: item.productNumber, quantity: 1 }])}
    }
    return (
        <Card
            className={styles.marginMobile}>
            <Image src={img} onClick={() => history.push(DEVICE_ROUTE + '/' + item.productNumber)}
                   className={styles.sizeMobile}/>
            <div className="d-flex justify-content-between ms-1 text-black-50 mt-2 "
                 onClick={() => history.push(DEVICE_ROUTE + '/' + item.productNumber)}><span>{item.name}</span>
                <span>{item.id}<Image width={20} height={20} className="mb-1 ms-1 me-1"
                                      src={item.rating <= 0 ? rate : rateActive}/></span>
            </div>
            <div className="d-flex justify-content-between ms-1 mt-2">
                <div className="text-dark">{item.price}{console.log(item.price)} $</div>
                <div style={{height: 5, marginRight: 2}} className={styles.cart}><i className="large material-icons" onClick={event => {
                    product.cartNumber < 1 ? AddToCart({
                        orderItems: [{
                            productNumber: item.productNumber,
                            quantity: 1
                        }]
                    }).then(response => {
                            setClicked(response.data.orderItems)
                            product.setCartNumber(product.cartNumber + 1)
                            product.setOrderItems( [{
                            productNumber: item.productNumber,
                            quantity: 1
                        }])
                        product.setPayment(false)
                            product.setOrderNumber(response.data)
                        }
                    ) : UpdateCart( prepareData(item.productNumber)
                    , product.orderNumber).then(response => {
                            product.setOrderItems(prepareData(item.productNumber).orderItems)
                            product.setCartNumber(product.cartNumber + 1)
                        }
                    )
                }}>shopping_cart</i></div>
            </div>
        </Card>
    );
})
export default DeviceItem