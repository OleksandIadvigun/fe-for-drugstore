import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {AddToCart, fetchOneDevice, fetchOneProduct, UpdateCart} from "../http/ProductApi";
import {useHistory, useParams} from 'react-router-dom'
import FadeIn from "react-fade-in";
import ImageGallery from "react-image-gallery";
import img from '../assets/grug5.png'
import {Context} from "../index";
import SpinnerInside from "../components/common/SpinnerInside";

export default function DevicePage() {
    const {product} = useContext(Context)
    const history = useHistory()
    const [device,setDevice] = useState({productNumber:'123456',name:'',quantity:0,price:0})
    const [quantity,setQuantity] = useState(1)
    const [info,setInfo] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [images,setImages] = useState([{original: img,
        thumbnail: img}])
const {id} = useParams()
    const URL = 'http://localhost:5000/'
    const comments = [
        {id:1,description:"Very good, lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum", rate: 4.5, userId:6},
        {id:1,description:"Very good,lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum", rate: 4.5,userId:6},
        {id:1,description:"Very good, lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum", rate: 4.5,userId:6}
    ]

    useEffect(()=>{
        fetchOneProduct(id).then(dev=>{
            setDevice(dev.data)
       })
    },[])

    const code =()=> {
      let s = device.productNumber
        return s.substring(0,6)
    }

    return (
        <FadeIn transitionDuration={800}>
        <Container style={{ paddingBottom:50, minHeight:'93vh',background: 'white', marginBottom:15, borderRadius:3}} >
            <div className="d-flex justify-content-around mt-3 " style={{minWidth:1020}} >
            <div className="p-1 d-flex justify-content-center "  >
                <ImageGallery  thumbnailPosition='bottom' items={images} lazyLoad={true}/>
             {/*<Image width={300} height={300} src={device.images && URL+device.images[0].img} />*/}
            </div>
            <Col md={5} className=" d-flex justify-content-center flex-column" style={{minHeight:620}}>
                <span className="align-self-end me-1 text-black-50" style={{fontSize:'0.8rem'}} >Code: {code()}</span>
             <div className="d-flex flex-column align-items-start justify-content-start p-3" style={{ minHeight:300}}>
                 <span style={{color:'darkslategray',textAlign:'start',fontSize:30, fontWeight:'bold'}}>{device.name}</span>
                 <div className="d-flex justify-content-start  w-100 pt-5" >
                 <span className="" style={{background: 'white'}}>
                     <span className="me-3"> * * * * * </span>
                     <span className="me-3">{device.rating}</span>
                     <span className=""> comments<i className="material-icons ms-1">message</i></span>
                 </span>
                 </div>
             </div>
                <div style={{ height:390}} className="justify-content-between d-flex align-items-center mx-3" >
                    <h3 style={{fontSize: 35, color: 'darkslategrey'}}>{device.price*2}$</h3>
                   <div className="d-flex justify-content-end me-3">
                       <input
                           style={{width:80}}
                           type="number"
                           className="form-control me-3"
                           placeholder="amount"
                           defaultValue="1"
                           name="amount"
                           //value={age}
                           onChange={event => {setQuantity(Number(event.target.value))}}
                       />

                       <Button variant={"warning"} className='d-flex justify-content-center' onClick={event => {
                           setIsLoading(true)
                           product.cartNumber < 1 ? AddToCart({
                               orderItems: [{
                                   productNumber: device.productNumber,
                                   quantity: quantity
                               }]
                           }).then(response => {
                                   product.setCartNumber(product.cartNumber + quantity)
                                   product.setOrderItems([{
                                       productNumber: device.productNumber,
                                       quantity: quantity
                                   }])
                                   product.setPayment(false)
                                   product.setOrderNumber(response.data)
                               }
                           ) .finally(()=>setIsLoading(false))
                               :
                               UpdateCart({
                               orderItems: product.orderItems.concat({
                                   productNumber: device.productNumber,
                                   quantity: quantity
                               })
                           }, product.orderNumber).then(response => {
                                   product.setOrderItems(response.data.orderItems)
                                   product.setCartNumber(product.cartNumber + quantity)
                               }
                           ).finally(()=>setIsLoading(false))
                       }}>{isLoading? <span style={{marginRight:5}}> {SpinnerInside}</span>:<i className="large material-icons me-1" >shopping_cart</i>} <span style={{marginLeft:5}} >Add to Cart</span></Button>
                       </div>
                    {/*</span>*/}
                </div>
            </Col>
            </div>
            <hr className="mt-5 "/>
            <div className="d-flex flex-column pt-4 " style={{background: 'white'}}>
                <h2>Details </h2>
                {info.map((info,index)=>
                    <div  className="d-flex justify-content-center m-2 " key={index}>
                        <div style={{ background:'ghostwhite', borderRadius:7}}
                             className="d-flex justify-content-between p-4 w-75 "
                        ><span>{info.title}:</span><span style={{color:'black', fontWeight: 'bold'}}> {info.description}</span></div>
                    </div>)}
            </div>
            <hr className="mt-5 "/>
            <div className="d-flex flex-column align-items-center pt-4 " style={{background: 'white'}}>
                <h2>Comments </h2>
                <div className="d-flex justify-content-between align-items-center"
                     style={{background: '#F5F5F5', borderRadius:8, padding: 15, marginBottom: 10, fontSize:18, width:'75%'}}>
                <div style={{fontWeight:'bold'}}>
                    You can add your comment here
                </div>
                    <Button variant="secondary" style={{color:'lightgrey'}}>Add comment</Button>
                </div>
                {comments.map((comment,index)=>
                    <div style={{ marginBottom:10, color:'black',borderRadius:8 , border:'1px solid Gainsboro',width:'75%'}} key={index}>
                    <div  className="d-flex flex-column justify-content-center m-2  " >
                        <div className="d-flex justify-content-between p-1 px-3 "
                        ><span>{comment.userId} Ivan</span><span> * * * * * {comment.rate}</span></div>
                        <div style={{ textAlign: 'start'}} className="p-3 ">{comment.description} </div>
                    </div>
                    </div>
                        )}
            </div>
        </Container>
        </FadeIn>
    );
}
