import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {editBrand, editType, fetchBrands, fetchTypes} from "../../http/DeviceApi";
import {useAlert} from "react-alert";
import styles from './Modal.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const EditBrand = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [id, setId] = useState(null)
    const customAlert = useAlert();

    const onEdit = () => {
        try{
        editBrand(id, name).then(value => setName(''))
        onHide()
        device.setSelectedBrand('')
        customAlert.show(`Success!`, {type: 'success', timeout: 1500})
        }catch (e) {
            customAlert.show(e.response.data.message)
        }
    }

    useEffect(() => {
        fetchBrands().then(brands => device.setBrands(brands))
    }, [])

    return (
        <Modal
            show={show}
            onHide={()=> onHide()}
            keyboard={false}
            contentClassName={styles.modalCard}
            size="lg"
            backdrop="static"
            centered
        >
            <Modal.Header className={styles.close}>
                <Modal.Title className={styles.title}>Edit BRAND</Modal.Title>
                <span onClick={()=>{
                    onHide()
                    setName('')
                }}>X</span>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mb-3">
                    <Dropdown.Toggle
                        variant="secondary">{device.selectedBrand.name ? device.selectedBrand.name : 'Select brand'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.brands.map(t =>
                            <Dropdown.Item
                                key={t.id}
                                onClick={() => {
                                    device.setSelectedBrand(t)
                                    setName(t.name)
                                    setId(t.id)
                                }}
                            >{t.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form>
                    <div className={styles.card}>
                        <div className={styles.box}>
                            <Form.Control
                                placeholder={'Edited name'}
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={()=>{
                    onHide()
                    setName('')
                }}>
                    Close
                </Button>
                <Button variant="warning" onClick={onEdit}>Edit</Button>
            </Modal.Footer>
        </Modal>
    );
})
export default EditBrand
