import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/DeviceApi";
import Pages from "../components/Pages";
import styles from './Shop.module.css'
import FadeIn from "react-fade-in";

const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect( () => {
        fetchTypes().then(types => device.setTypes(types))
        fetchBrands().then(brands => device.setBrands(brands))
        fetchDevices().then(devices => {
            device.setDevices(devices.rows)
            device.setTotalPages(devices.count)

        })

    }, [])
    useEffect(()=>{
        fetchDevices(device.selectedType.id, device.selectedBrand.id,device.page).then(devices => {
            device.setDevices(devices.rows)
            device.setTotalPages(devices.count)

        })
    },[device.page,device.selectedType, device.selectedBrand])
    return (
        <FadeIn transitionDuration={800}>
        <Container className={styles.wrap}>
            <Row>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                </Col>
            </Row>
        </Container>
    <div className={styles.pagin}><Pages/></div>
    </FadeIn>
    );
})
export default Shop
