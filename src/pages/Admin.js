import {Button, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import AddIncomingInvoice from "../components/modals/AddIncomingInvoice";
import FadeIn from "react-fade-in";
import styles from './Admin.module.css'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import ReceiveGoods from "../components/modals/ReceiveGoods";
import DeliverGoods from "../components/modals/DeliverGoods";

 const Admin = observer(() => {
    const {product} = useContext(Context)
    const [showIncomingInvoice, setShowAddIncomingInvoice] = useState(false);
    const [showReceiveGoods, setShowReceiveGoods] = useState(false);
    const [showDeliverGoods, setShowDeliverGoods] = useState(false);
    useEffect(()=>{
        console.log(product.orderNumbers)
    },[product.orderNumbers])

    return (
        <FadeIn transitionDuration={800}>
        <div className="d-flex flex-column justify-content-center pt-4" style={{width:'90vw', paddingBottom:150}}>
            <Row>Accountancy</Row>
            <Button variant="secondary mt-3  align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setShowAddIncomingInvoice(true)
                    }}
            ><div style={{display:"flex", justifyContent:"center"}}>
                <i className="large material-icons me-1 ">add_circle</i><span>Add incoming invoice</span>
            </div>
            </Button>
            <div style={{marginTop:20}}> Paid incoming orders:
                {product.orderNumbers.map((el,index)=>
                    <div style={{ border:"1px #0002 solid", margin:10, textAlign:"start", padding:5,
                    borderRadius:5}}
                         key={index}> <span style={{color:"lightGreen"}}>{index+1}
                         </span> order number:<span style={{marginLeft:"50px"}}> {el}</span>
                    </div>
                )}
            </div>
            <hr className="mt-5"/>
            <Row>Store</Row>
            <Button variant="secondary mt-3  align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setShowReceiveGoods(true)
                    }}

            ><div style={{display:"flex", justifyContent:"center"}}>
                <i className="large material-icons me-1">add_circle</i><span>Receive goods</span>
            </div></Button>

            <Button variant="secondary mt-4 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setShowDeliverGoods(true)
                    }}

            ><div style={{display:"flex", justifyContent:"center"}}>
                <i className="large material-icons me-1">edit</i><span>Deliver goods</span>
            </div>
            </Button>
            <div style={{marginTop:20}}> Paid outcoming orders:
                {product.orderBought.map((el,index)=>
                    <div style={{ border:"1px #0002 solid", margin:10, textAlign:"start", padding:5,
                        borderRadius:5}}
                         key={index}> <span style={{color:"lightGreen"}}>{index+1}
                         </span> order number:<span style={{marginLeft:"50px"}}> {el}</span>
                    </div>
                )}
            </div>
            <AddIncomingInvoice show={showIncomingInvoice}
                                onHide={() => {
                            setShowAddIncomingInvoice(false)
                        }}
            />
            <ReceiveGoods show={showReceiveGoods}
                        onHide={() => {
                            setShowReceiveGoods(false)
                        }}
            />
            <DeliverGoods show={showDeliverGoods}
                          onHide={() => {
                              setShowDeliverGoods(false)
                          }}
            />
        </div>
        </FadeIn>
    );
})
export default Admin