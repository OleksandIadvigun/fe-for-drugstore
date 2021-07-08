import {Card, Col, Image, Row} from "react-bootstrap";
import rate from '../assets/ff.png';
import rateActive from '../assets/ff3.png';
import {useHistory} from 'react-router-dom'
import styles from './DeviceItem.module.css'
import {DEVICE_ROUTE} from "../utils/constants";
import {bool} from "prop-types";


export default function DeviceItem({item}) {
    const history = useHistory()
    const URL = 'http://localhost:5000/'
  return (
      <Card style={{ cursor: 'pointer', border: 'light', marginBottom: 30,color:'grey'}}
      className={styles.marginMobile}
            onClick={()=>history.push(DEVICE_ROUTE + '/' + item.id)}
      >
        <Image  src={URL + item.img}
               className={styles.sizeMobile}/>
          <div className="d-flex justify-content-between ms-1 text-black-50 "><span>{item.name}</span>
              <span>{item.rating}<Image width={20} height={20} className="mb-1 ms-1 me-1" src={item.rating<=0? rate: rateActive }/></span>
          </div>
          <div className="d-flex justify-content-between ms-1 mt-2">
          <div className="text-dark" >{item.price} $</div>
              <div style={{height:5, marginRight:2}}><i className="large material-icons">shopping_cart</i></div>
          </div>
      </Card>
  );
}
