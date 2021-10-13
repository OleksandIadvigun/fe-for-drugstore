import {Col, Container, Row} from "react-bootstrap";
import Filter from "../components/Filter";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from "react";
import {Context} from "../index";
import {fetchPopular, fetchProducts} from "../http/ProductApi";
import Pages from "../components/Pages";
import styles from './Shop.module.css'
import FadeIn from "react-fade-in";
import PopularProducts from "../components/PopularProducts";
import HomeContent from "../components/HomeContent";

const Shop = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchPopular(product.size, product.page).then(response => {
                console.log(response.data + "popular products")
                product.setPopularProducts(response.data)
            }
        )

    }, [])
    return (
        <FadeIn transitionDuration={800}>
            <Container className={styles.wrap}>
                <Row>
                    <Col md={3}>
                        <Filter/>
                    </Col>
                    <Col md={9}>
                       <div className="text-start">Popular products:</div>
                        {/*<BrandBar/>*/}
                        <PopularProducts/>
                        { product.products.length===0 ? <HomeContent/>:""}
                        <DeviceList/>
                    </Col>
                </Row>
            </Container>
            <div className={styles.pagin}><Pages/></div>
        </FadeIn>
    );
})
export default Shop
