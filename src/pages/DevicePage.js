import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import rate from '../assets/ff.png';
import {useContext, useEffect, useState} from "react";
import {fetchOneDevice} from "../http/DeviceApi";
import {useParams} from 'react-router-dom'
import FadeIn from "react-fade-in";

export default function DevicePage() {
const [device,setDevice] = useState({})
const {id} = useParams()
    const URL = 'http://localhost:5000/'
    const description =[
        {id:1, title: 'Battery', description: '4000A'},
        {id:2, title: 'Battery', description: '4000A'},
        {id:3, title: 'Battery', description: '4000A'},
        {id:4, title: 'Battery', description: '4000A'},
        {id:5, title: 'Battery', description: '4000A'},
        {id:6, title: 'Battery', description: '4000A'},
        {id:7, title: 'Battery', description: '4000A'}
    ]

    useEffect(()=>{
        fetchOneDevice(id).then(dev=>setDevice(dev))
    },[])
    return (
        <FadeIn transitionDuration={800}>
        <Container style={{height: '93vh'}}>
            <div className="d-flex justify-content-between">
            <Col md={4} className="mt-3 d-flex justify-content-center">
             <Image width={300} height={300} src={URL+device.img} />
            </Col>
            <Col md={4} className="mt-3  d-flex justify-content-center">
             <div className="d-flex flex-column align-items-center">
                 <div className="fs-2">{device.name}</div>
                 <div className="d-flex justify-content-center align-items-center"
                 style={{background: `url(${rate}) no-repeat center center`, width:240,height:240,
                 backgroundSize:"cover", fontSize:42}}
                 >
                     <div className="me-4 mb-2">{device.rating}</div>
                 </div>
             </div>
            </Col>
            <Col md={4} className="mt-3  d-flex justify-content-center">
               <Card className="d-flex flex-column align-items-center justify-content-around"
               style={{height: 300, width: 300, fontSize: 30}}>
                   <h3 style={{fontSize: 40}}>{device.price}$</h3>
                   <Button variant={"outline-dark"}>Add to the basket</Button>
               </Card>
            </Col>
            </div>
            <Row className="d-flex flex-column ms-5 me-4 mt-4">
                <h2>About device: </h2>
                {description.map((info,index)=>
                    <Row style={{ background: index % 2===0? 'lightGrey':''}} key={index}>
                {info.title}: {info.description}
                    </Row>)}
            </Row>
        </Container>
        </FadeIn>
    );
}
