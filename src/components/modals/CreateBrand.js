import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";
import {useAlert} from "react-alert";
import {createBrand, createType} from "../../http/DeviceApi";
import styles from "./Modal.module.css";

export default function CreateBrand({show,onHide}) {
    const[name, setName] = useState('')
    const customAlert = useAlert();
    const onAdd = () => {
        try{
        createBrand(name).then(value => setName(''))
        onHide()
        customAlert.show(`Success!`,{ type: 'success', timeout: 1500 })
        }catch (e) {
            customAlert.show(e.response.data.message)
        }
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
                <Modal.Title className={styles.title}>Add BRAND</Modal.Title>
                <span className={styles.close} onClick={onHide}>X</span>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <div className={styles.card}>
                        <div className={styles.box}>
                    <Form.Control
                        placeholder={'Input the name'}
                        value={name}
                        type='text'
                        onChange={(e)=> setName(e.target.value)}
                    />
                        </div>
                    </div>
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
}
