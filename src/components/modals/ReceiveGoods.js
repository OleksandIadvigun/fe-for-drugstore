import {Button, Form, Modal} from "react-bootstrap";
import {useContext, useState} from "react";
import {receiveGoods} from "../../http/ProductApi";
import {useAlert} from "react-alert";
import styles from './Modal.module.css'
import {Context} from "../../index";
import SpinnerInside from "../common/SpinnerInside";

export default function ReceiveGoods({show,onHide}) {
    const[orderNumber, setOrderNumber] = useState('')
    const {product} = useContext(Context)
    const customAlert = useAlert();
    let[isLoading, setIsLoading]=useState(false)

        const onAdd = () => {
        setIsLoading(true)
        receiveGoods(orderNumber).then(value => {
            product.setOrderNumbers(product.orderNumbers.filter(el=>el!==orderNumber))
            onHide()
            customAlert.show(`Success, received.`, {type: 'success', timeout: 1500})
            setOrderNumber('')
        }).catch(error => customAlert.show(error.response.data.message))
            .finally(()=> setIsLoading(false))
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
              <Modal.Title className={styles.title}>Receive goods</Modal.Title>
              <span onClick={onHide}>X</span>
          </Modal.Header>
          <Modal.Body>
              <Form>
                  <div className={styles.card}>
                      <div className={styles.box}>
                  <Form.Control
                  placeholder={'Input the number of order'}
                  value={orderNumber}
                  type="text"
                  onChange={(e)=> setOrderNumber(e.target.value)}
                  />
                      </div>
                  </div>
              </Form>

          </Modal.Body>

          <Modal.Footer>
              <Button variant="light" style={{width:"80px"}} onClick={onHide}>
                  Close
              </Button>
              <Button variant="warning" style={{width:"80px"}} onClick={onAdd}>{isLoading? SpinnerInside:'Submit'}</Button>
          </Modal.Footer>
      </Modal>
  );
}
