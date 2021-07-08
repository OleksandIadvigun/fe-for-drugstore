import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {deleteType, editType, fetchBrands, fetchTypes} from "../../http/DeviceApi";
import {useAlert} from "react-alert";
import styles from './Modal.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const DeleteType = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [id, setId] = useState(null)
    const customAlert = useAlert();

    const onEdit = () => {
        try {
            deleteType(id).then(value => setName(''))
            onHide()
            device.setSelectedType('')
            customAlert.show(`Success!`, {type: 'success', timeout: 1500})
        }catch (e) {
            customAlert.show(e.response.data.message)
        }
    }

    useEffect(() => {
        fetchTypes().then(types => device.setTypes(types))
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
                <Modal.Title className={styles.title}>DeleteTYPE</Modal.Title>
                <span onClick={onHide}>X</span>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className="mb-3">
                    <Dropdown.Toggle
                        variant="secondary">{device.selectedType.name ? device.selectedType.name : 'Select type'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {device.types.map(t =>
                            <Dropdown.Item
                                key={t.id}
                                onClick={() => {
                                    device.setSelectedType(t)
                                    setId(t.id)
                                }}
                            >{t.name}</Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="light" onClick={onHide}>
                    Close
                </Button>
                <Button variant="danger" onClick={onEdit}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
})
export default DeleteType
