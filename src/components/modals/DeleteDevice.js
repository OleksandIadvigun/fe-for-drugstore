import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../../index";
import {useAlert} from "react-alert";
import {deleteDevice, fetchBrands, fetchDevices, fetchTypes,} from "../../http/DeviceApi";
import {observer} from "mobx-react-lite";
import styles from "./Modal.module.css";
import  './index.css'

const DeleteDevice =observer(({show,onHide})=> {
    const {device} = useContext(Context)
    const customAlert = useAlert();
    const[id, setId] = useState(null)

    const onDelete = () => {
        try {
            deleteDevice(id).then(value => {
                onHide()
            })
            customAlert.show(`Success!`, {type: 'success', timeout: 1500})
        }catch (e) {
            customAlert.show(e.response.data.message)
        }
    }

    // useEffect( () => {
    //     fetchTypes().then(types => device.setTypes(types))
    //     fetchBrands().then(brands => device.setBrands(brands))
    // }, [])
    useEffect(()=>{
        fetchDevices(device.selectedType.id, device.selectedBrand.id,device.page,100).then(devices => {
            device.setDevices(devices.rows)
        })
    },[device.page,device.selectedType, device.selectedBrand])
    const URL = 'http://localhost:5000/'
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
                <Modal.Title className={styles.title}>Delete DEVICE</Modal.Title>
                <span className={styles.close} onClick={onHide}>X</span>
            </Modal.Header>

            <Modal.Body>
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
                    <Dropdown className="mb-3" drop='right'>
                        <Dropdown.Toggle variant="secondary">{device.selectedDevice.name? device.selectedDevice.name: 'Select device'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.devices.map(t =>
                                <Dropdown.Item
                                    key={t.id}
                                    onClick={()=>{
                                        device.setSelectedDevice(t)
                                        setId(t.id)
                                    }}
                                ><div className="d-flex justify-content-between">
                                    <div>{t.name}</div>
                                    <Image width={50} height={50} src={URL + t.img}/>
                                </div></Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
})
export default DeleteDevice
