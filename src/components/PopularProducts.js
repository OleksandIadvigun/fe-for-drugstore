import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import styles from "./PopularProduts.module.css"
import {fetchProducts} from "../http/ProductApi";
import img from "../assets/grug5.png";
import {DEVICE_ROUTE} from "../utils/constants";
import {Image} from "react-bootstrap";
import {useAlert} from "react-alert";

const PopularProducts = observer(() => {
    const {product} = useContext(Context)

    return (
        <div className={styles.block}>
             <p style={{marginTop:10}}>{product.popularProducts.map((item,index)=>
                <span key={index} className={styles.products} onClick={(event => {
                    fetchProducts(product.size, product.page, item.name, product.sortField, product.sortDirection)
                        .then(response => {
                            console.log(response.data + "products")
                            product.setProducts(response.data)
                        })
                })}><Image src={img} height={50} width={50}/> {item.name}</span>
            )}</p>
        </div>

    );
})
export default PopularProducts