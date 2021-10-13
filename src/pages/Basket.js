import {useContext, useEffect, useState} from "react";
import {confirmOrder, getDetailsCart, payOrder, UpdateCart} from "../http/ProductApi";
import {Context} from "../index";
import {Button} from "react-bootstrap";
import {useAlert} from "react-alert";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {useHistory} from "react-router-dom";
import img from '../assets/grug5.png'
import imgCard from '../assets/credit.png'
import {Card, Image} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import FadeIn from "react-fade-in";
import {MySpinner} from "../components/common/MySpinner";
import SpinnerInside from "../components/common/SpinnerInside";
import {set} from "mobx";

 const Basket =observer(()=> {
    const [cart, setCart] = useState({orderItemDetails: []})
     const [quantity, setQuantity] = useState(false)
    const [amount, setAmount] = useState(0)
    const [money, setMoney] = useState(0)
     const [error, setError] = useState(false)
     const [isLoading, setIsLoading] = useState(false)
    const {product} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        getDetailsCart(product.orderNumber).then(dev => {
            console.log(dev.data + "DATA!!!!!!!!!!!!!!!!!")
            setCart(dev.data)
            setAmount(dev.data.total)
                // product.setOrderItems(dev.data.orderItems)
        })
    }, [])

    const customAlert = useAlert()
     function prepareData(itemNumber, itemQuantity ){
         console.log(product.orderItems + "items")
         return {
             orderItems: product.orderItems
                 .map(
                 el=> el.productNumber===itemNumber? {productNumber:el.productNumber,quantity: itemQuantity, price:el.price}: el
             )
         }
     }

    return (
        <div style={{display:"flex", justifyContent:"center" , alignItems:"center"}}>{product.payment===false?
            <div style={{boxShadow:"2px 2px 20px", borderRadius:10, padding:20, margin:20,minHeight: "42vh",display:"flex", alignItems:"center"
                }}><FadeIn transitionDuration={800}>
            <div style={{
                minHeight: "auto",
                minWidth: "800px",
                marginBottom: 20,
                marginTop:20,
                borderRadius: 5,
                display:"flex", flexDirection:"column",justifyContent:"center",
                paddingL:10
            }}><div style={{alignItems: "inherit",display:"flex", flexDirection:"column" }} >
                {cart.orderItemDetails.map(item =>
                    <div  key={item.name} style={{margin:10, border:"1px solid lightgrey", padding:5, borderRadius:5, display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div>
                        <Image src={img} height="70px" width="70px"/>
                        <span  style={{marginLeft:20}}>{item.name}</span>
                        </div>

                        <div style={{padding:10}}>price: {item.price} $,   quantity:<span style={{color:"orange", marginRight:5}}> {item.quantity}</span>
                            <Button style={{margin:5}} onClick={event => {
                                 prepareData(item.productNumber, item.quantity+1)
                                    .orderItems.map(el => console.log(el.productNumber===item.productNumber, item.price, el.quantity))

                                const preparedData2 = prepareData(item.productNumber, item.quantity+1)
                               // product.setOrderItems(preparedData2)
                                UpdateCart(prepareData(item.productNumber, item.quantity+1), product.orderNumber).then(response => {
                                    setCart({orderItemDetails: cart.orderItemDetails.map(el=>
                                            el.productNumber===item.productNumber?
                                                {
                                                    productNumber: el.productNumber,
                                                    price: el.price,
                                                    name: el.name,
                                                    quantity: item.quantity +1
                                                }:el)})
                                        setQuantity(!quantity)
                                    setAmount(amount + item.price)
                                    console.log(amount + item.price + "total")
                                        product.setCartNumber(product.cartNumber + 1)
                                    product.setOrderItems(prepareData(item.productNumber, item.quantity+1).orderItems)
                                    }
                                )
                            }}>+</Button>
                            <Button style={{paddingRight:15,paddingLeft:15}} onClick={event => {
                                if(item.quantity > 1){
                                UpdateCart(prepareData(item.productNumber, item.quantity-1), product.orderNumber).then(response => {
                                    setCart({orderItemDetails: cart.orderItemDetails.map(el=>
                                         el.productNumber===item.productNumber?
                                                {
                                        productNumber: el.productNumber,
                                        price: el.price,
                                        name: el.name,
                                        quantity: item.quantity -1
                                    }:el)})
                                     console.log(amount - item.price + "total")
                                        setAmount(amount - item.price)
                                        setQuantity(!quantity)
                                        product.setCartNumber(product.cartNumber - 1)
                                    product.setOrderItems(prepareData(item.productNumber, item.quantity-1).orderItems)
                                    }
                                )}else if (item.quantity < 2 && product.orderItems.length > 1){
                                    UpdateCart({
                                        orderItems: product.orderItems.filter(
                                            el=> el.productNumber!==item.productNumber
                                        )
                                    }, product.orderNumber).then(response => {
                                            setCart({orderItemDetails: cart.orderItemDetails.filter(
                                                el=> el.productNumber!==item.productNumber
                                            )})
                                            setQuantity(!quantity)
                                            product.setCartNumber(product.cartNumber - 1)
                                          product.setOrderItems(product.orderItems.filter(
                                              el=> el.productNumber!==item.productNumber
                                          ))
                                        }
                                    )
                                }else{
                                    customAlert.show("Should be minimum 1 item, or click cancel")
                                }
                            }}>-</Button>
                        </div>
                    </div>
                )}
            </div>
                {cart.orderItemDetails.length > 0 ? <div style={{fontSize:20}}>Total: <span style={{color:"black"}}>{amount.toFixed(2)} $</span> </div> : <div style={{fontSize:20}}>EMPTY</div>}
            </div>
            <div style={{display:"flex",justifyContent:"space-around"}}>
                {product.orderItems.length > 0 ?<Button variant="warning" style={{width:"80px"}}
                                                                                onClick={event => {
                // const orderRequest = {orderNumber:product.orderNumber}setIsLoading(true)
                   confirmOrder(product.orderNumber).then(res => {
                       console.log(res.data)
                       setCart({orderItemDetails: []})
                       product.setOrderItems({orderItemDetails: []})
                       product.setCartNumber(0)
                       product.setPayment(true)
                       customAlert.show(`Confirmed`, {type: 'info'})
                   }).catch(error => customAlert.show(error.response.data.message))
                       .finally(()=> setIsLoading(false))
            }}>{isLoading? SpinnerInside: 'Confirm'}</Button>: ''}
                <Button variant='danger'
                        style={{width:"80px"}}
                onClick={event => {
                    setIsLoading(false)
                product.setOrderNumber(0)
                product.setCartNumber(0)
                product.setOrderItems({orderItemDetails: []})
                setCart({orderItemDetails: []})
                    history.push(SHOP_ROUTE)
            }}
            >Cancel</Button ></div>
            </FadeIn>
            </div>
        :
            <div style={{
                minHeight: "42vh",
                boxShadow:"2px 2px 20px",
                minWidth: "800px",
                marginBottom: 20,
                marginTop:20,
                borderRadius: 5,
                display:"flex", flexDirection:"column",justifyContent:"center"
            }}>PAYMENT
                <div>Order number: <span style={{color:"orange"}}>{product.orderNumber}</span></div>
            <div>Input your cart details</div>
                <div><Image src={imgCard} height="230px" width="350px"/></div>
                <div>Amount: {amount.toFixed(2)} $</div>
                <input type="number" onChange={event => setMoney(event.target.value)} style={{width:"30%", alignSelf:"center"}}/> money

               <p style={{marginTop:50, display:"flex", justifyContent:"space-around"}}>
                   <Button variant="warning"
                                                                                                 style={{width:"80px"}}
                        onClick={event => {
                            setIsLoading(true)
                    setTimeout(()=>{
                        payOrder(product.orderNumber, money).then(res =>{
                            customAlert.show(`Success, you can take your products from the store with order number ${product.orderNumber}`, {type: 'info'})
                            product.setOrderBought([...product.orderBought,...[product.orderNumber]])
                            product.setCartNumber(0)
                            setError(false)
                            product.setOrderItems({orderItemDetails: []})
                            history.push(SHOP_ROUTE)
                            product.setOrderNumber(0)
                            product.setPayment(false)
                        }).catch(error => {
                            setError(true)
                            if(!error.response){
                                customAlert.show("Accountancy service is not responding, please, try again later.")
                            }else
                            customAlert.show(error.response.data.message)
                        })
                            .finally(()=> {setIsLoading(false)
                                }
                            )
                    },3000)

                }
                }
                >{isLoading? SpinnerInside: 'Pay'}</Button>
                   <Button variant="danger"
                           style={{width:"80px"}}
                           onClick={event => {
                               setIsLoading(false)
                               product.setOrderNumber(0)
                               product.setCartNumber(0)
                               product.setOrderItems({orderItemDetails: []})
                               setCart({orderItemDetails: []})
                               history.push(SHOP_ROUTE)
                           }}
                   >Cancel</Button>
               </p>
            </div>}
        </div>

    );
})
export default Basket
