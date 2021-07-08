import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../index";
import {useAlert} from "react-alert";
import {createBrand, createDevice, createDevice2, fetchBrands, fetchDevices, fetchTypes} from "../../http/DeviceApi";
import {observer} from "mobx-react-lite";
import styles from "./Modal.module.css";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import  './index.css'

 const CreateDevice =observer(({show,onHide})=> {
    const {device} = useContext(Context)
    const customAlert = useAlert();
    const [info, setInfo] = useState([])
    const[name, setName] = useState('')
    const[price, setPrice] = useState(null)
    const[file, setFile] = useState(null)


    const addInfo = () => {
        setInfo([...info,{title: '', description: '', number: Date.now()}])
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number===number ? {...i, [key]: value}: i))
    }

    const deleteInfo = (number) => {
        setInfo(info.filter(e=>e.number !==number))
    }

    const onAdd = () => {
        console.log("IN ADD DEV")
        console.log(file + "FILE")
        console.log(file.name + "FILEName")
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        console.log("Before func")
        console.log(formData.get('img') + " formdata")
        try {
            createDevice2(formData).then(value => {
                onHide()
                device.setSelectedBrand({})
                device.setSelectedType({})
                setInfo([])
                setName('')
                setPrice(null)
            })
            customAlert.show(`Success!`, {type: 'success', timeout: 1500})
        }catch (e) {
            customAlert.show(e.response.data.message)
        }
    }

     const hiddenFileInput = useRef('');

     const handleClick = event => {
         hiddenFileInput.current.click();
     };

    const selectFile = e => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
    }

    // useEffect( () => {
    //     fetchTypes().then(types => device.setTypes(types))
    //     fetchBrands().then(brands => device.setBrands(brands))
    // }, [])
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
                <Modal.Title className={styles.title}>Add DEVICE</Modal.Title>
                <span className={styles.close} onClick={onHide}>X</span>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="secondary">{device.selectedType.name? device.selectedType.name: 'Select type'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(t =>
                            <Dropdown.Item
                                key={t.id}
                                onClick={()=>device.setSelectedType(t)}
                            >{t.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="secondary">{device.selectedBrand.name? device.selectedBrand.name: 'Select brand'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(b =>
                                <Dropdown.Item key={b.id}
                                               onClick={()=>device.setSelectedBrand(b)}
                                >{b.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className={styles.card}>
                        <div className={styles.box}>
                    <Form.Control
                        type='text'
                        value={name}
                        className="mb-3"
                        placeholder={'Input the name'}
                        onChange={e=>setName(e.target.value)}
                    />
                    <Form.Control
                        value={price}
                        className="mb-3"
                        placeholder={'Add price'}
                        type='number'
                        onChange={e=>setPrice((Number)(e.target.value))}
                    />   <span className={`mb-3 align-self-center ms-1 d-flex justify-content-center`}
                               style={{cursor:"pointer"}}
                        onClick={handleClick}
                        > {file? <i className="large material-icons" style={{color:'green'}}>check</i>
                        :
                            <i className="large material-icons" style={{color:'sienna', marginRight: 4}}>
                                error_outline</i>}
                            <i className="large material-icons">insert_photo</i>
                            <a style={{paddingLeft:5}}> Select image..</a>
                            <input
                                placeholder='Add image'
                                ref={hiddenFileInput}
                                style={{display:'none'}}
                                type='file'
                                onChange={selectFile}
                            />
                            </span>
                        </div>
                    </div>
                    <Button variant="outline-info" onClick={addInfo}>
                        ADD INFO
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
                                placeholder={'Add title'}
                                          value={item.title}
                                          type='text'
                                          onChange={e => changeInfo('title',e.target.value, item.number)}
                            />
                            <Form.Control className="mt-3"
                                          type='text'
                                          value={item.description}
                                placeholder={'Add description'}
                                          onChange={e => changeInfo('description',e.target.value, item.number)}
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
                <Button variant="light" onClick={onHide}>
                    Close
                </Button>
                <Button variant="warning" onClick={onAdd}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
})
export default CreateDevice
