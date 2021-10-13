import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../index";
import {useAlert} from "react-alert";
import {createDevice2, createInvoice} from "../../http/ProductApi";
import {observer} from "mobx-react-lite";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import  './index.css'
import styles2 from './CreateDevice.module.css'
import styles from './Modal.module.css'
import {values} from "mobx";
import SpinnerInside from "../common/SpinnerInside";

 const AddIncomingInvoice = observer(({show,onHide})=> {
    const {device} = useContext(Context)
     const {product} = useContext(Context)
    const customAlert = useAlert();
    const [info, setInfo] = useState([])
    const[totalPrice, setTotalPrice] = useState(0)
    const[files, setFiles] = useState([])
     const[URL, setURL] = useState([])
     let[isLoading, setIsLoading]=useState(false)


    const addInfo = () => {
        setInfo([...info,{title: '', price: 0, quantity: 0, number: Date.now()}])
    }
    const addFile = (f) => {
        setFiles([...files,...f])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number===number ? {...i, [key]: value}: i))
    }

    const deleteInfo = (number) => {
        setInfo(info.filter(e=>e.number !==number))
    }

    const onAdd = () => {
        setIsLoading(true)
        console.log("IN ADD DEV")
        console.log(files + "FILEs")
        JSON.stringify(info)
        console.log("Before func")
        const invoiceItems = {
            productItems: info.map(el=>{
                return {
                    name: el.title,
                    price: el.price,
                    quantity: el.quantity
                }
            })
        }

            createInvoice(invoiceItems).then(value => {
                onHide()
                // device.setSelectedBrand({})
                // device.setSelectedType({})
                setInfo([])
                product.setOrderNumbers([...product.orderNumbers,...[value.orderNumber]])
                setTotalPrice(0)
                setURL([])
                setFiles([])
                customAlert.show(`Success, order number: ${value.orderNumber} `, {type: 'success', timeout: 3500})
            }).finally(()=>setIsLoading(false))
                .catch(error => customAlert.show(error.response.data.message))
    }

     const hiddenFileInput = useRef('');

     const handleClick = event => {
         hiddenFileInput.current.click();
     };

    const selectFile = e => {
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
             setURL([...URL,reader.result]);
        }.bind(this);
        addFile(e.target.files)
    }

    const deleteImageForDownload = (url, index) =>{
        setURL(URL.filter(u => u!==url));
        setFiles(files.filter((e,ind)=> ind!==index));
        console.log(files.length)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            keyboard={false}
            contentClassName={styles.modalCard}
            size="lg"
            backdrop="static"
            centered
        >
            <Modal.Header className={styles.close}>
                <Modal.Title className={styles.title}>Add incoming invoice </Modal.Title>
                <span className={styles.close} onClick={()=>{
                    onHide()
                    setURL([])
                    setFiles([])
                    setInfo([])
                }}>X</span>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className={styles.card}>
                        <div className={styles.box}>
                            {files.length > 0 && <div className="d-flex justify-content-start flex-wrap ms-4 ps-2"
                            >{URL.map((url,index) =>{
                                return <div key={url} className="m-1 mb-3" ><span><Image height={80} width={80} src={url} />
                                    <span className={styles2.imageCard} onClick={()=>{
                                       deleteImageForDownload(url, index)
                                    }
                                    }>X</span></span></div>})}</div>}
                        </div>
                    </div>
                    <Button variant="outline-info" onClick={addInfo}>
                        Add product
                    </Button>
                    <TransitionGroup>
                    {info.map((item)=>
                        <CSSTransition
                            key={item.number}
                            timeout={1000}
                            classNames="myNode"
                        >
                        <div className={styles.card}>
                            <div className={styles.box}>
                            <Form.Control className="mt-3"
                                placeholder={'name'}
                                          value={item.title}
                                          type='text'
                                          onChange={e => changeInfo('title',e.target.value, item.number)}
                            />
                            <Form.Control className="mt-3"
                                          type='number'
                                          value={item.description}
                                placeholder={'price'}
                                          onChange={e => changeInfo('price',e.target.value, item.number)}
                            />
                                <Form.Control className="mt-3"
                                              type='number'
                                              value={item.description}
                                              placeholder={'quantity'}
                                              onChange={e => changeInfo('quantity',e.target.value, item.number)}
                                />
                        <Col md={4} className="align-self-center">
                            <Button variant={"outline-danger"} className="mt-3 mb-2 "
                            onClick={()=>deleteInfo(item.number)}
                            >Delete
                            </Button>
                            <hr/>
                        </Col>
                            </div>
                        </div>
                        </CSSTransition>
                    )}
                        </TransitionGroup>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" style={{width:"80px"}} onClick={()=>{
                    onHide()
                    setIsLoading(false)
                    setURL([])
                    setFiles([])
                    setInfo([])
                }}>
                    Close
                </Button>
                <Button variant="warning" style={{width:"80px"}} onClick={onAdd}>{isLoading? SpinnerInside:'Add'}</Button>
            </Modal.Footer>
        </Modal>
    );
})
export default AddIncomingInvoice
