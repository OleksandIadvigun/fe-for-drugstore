import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import FadeIn from "react-fade-in";
import '../index.css'
import styles from './DeviceList.module.css'

const DeviceList = observer(() => {
    const {product} = useContext(Context)
  return (
    <div className={`d-flex flex-wrap  ${styles.flexCenterMobile}`}>
        {product.products.map((item,index)=>
          <DeviceItem item={item} key={index}/>
        )}
    </div>
  );
})
export default DeviceList
