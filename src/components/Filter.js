import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import styles from './TypeBar.module.css'
import {Button} from "react-bootstrap";
import {fetchProducts} from "../http/ProductApi";
import {SHOP_ROUTE} from "../utils/constants";
import {useHistory} from "react-router-dom";
import Checkbox from "react-custom-checkbox";
import img from "../assets/checker4.png"
import SpinnerInside from "./common/SpinnerInside";

const Filter = observer(() => {
    const {product} = useContext(Context)
    let[popularity, setPopularity]=useState(false)
    let[price, setPrice]=useState(true)
    let[isLoading, setIsLoading]=useState(false)
    let[createdAt, setCreatedAt]=useState(false)
    let[asc, setAsc]=useState(true)
    let[desc, setDesc]=useState(false)
    const history = useHistory()

    useEffect(()=>{
        console.log("effect")
    },[price])
    return (
        <div className={styles.phoneTypeBar} style={{ color: "black" }}>
            <span style={{fontSize:20, marginTop: 30}}>Filter</span>
            <div style={{marginTop:45, marginBottom:10}}>Sort by</div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <div style={{textAlign: "start", width: "50%"}}>
                    <p style={{marginTop:15, fontSize:15}}>
                        <label>
                            <Checkbox
                                checked={popularity}
                                onChange={event => {
                                product.setSortField('popularity')
                                setPopularity(!popularity)
                                setCreatedAt(false)
                                setPrice(false)
                            }}
                                icon={
                                    <div
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            backgroundColor: "#174A41",
                                            alignSelf: "stretch",
                                        }}
                                    >
                                        <img src={img} color="white" width={20} />
                                    </div>
                                }
                                borderColor="silver"
                                borderWidth={0}
                                borderRadius={18}
                                style={{ overflow: "hidden" }}
                                size={20}
                                label="Popularity"
                            />
                        </label>
                    </p>
                    <p style={{ fontSize:15}}>
                        <Checkbox
                            checked={price} onChange={event => {
                            product.setSortField('price')
                            setPrice(!price)
                            setPopularity(false)
                            setCreatedAt(false)
                        }}
                            icon={
                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        backgroundColor: "#174A41",
                                        alignSelf: "stretch",
                                    }}
                                >
                                    <img src={img} color="white" width={20} />
                                </div>
                            }
                            borderColor="silver"
                            borderWidth={0}
                            borderRadius={18}
                            style={{ overflow: "hidden" }}
                            size={20}
                            label="Price"
                        />
                    </p>
                    <p style={{ fontSize:15}}>
                        <Checkbox
                            checked={createdAt} onChange={event => {
                            product.setSortField('createdAt')
                            setCreatedAt(!createdAt)
                            setPopularity(false)
                            setPrice(false)
                        }}
                            icon={
                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        backgroundColor: "#174A41",
                                        alignSelf: "stretch",
                                    }}
                                >
                                    <img src={img} color="white" width={20} />
                                </div>
                            }
                            borderColor="silver"
                            borderWidth={0}
                            borderRadius={18}
                            style={{ overflow: "hidden" }}
                            size={20}
                            label="Recently added"
                        />
                    </p>
                </div>
            </div>
            <div style={{marginTop:45, marginBottom:10}}>Type:</div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <div style={{ textAlign: "start", width: "50%"}}>
                    <p style={{marginTop:15, fontSize:15}}>
                        <Checkbox
                            checked={asc} onChange={event => {
                            product.setSortDirection('ASC')
                            setAsc(!asc)
                            setDesc(false)
                        }}
                            icon={
                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        backgroundColor: "#174A41",
                                        alignSelf: "stretch",
                                    }}
                                >
                                    <img src={img} color="white" width={20} />
                                </div>
                            }
                            borderColor="silver"
                            borderWidth={0}
                            borderRadius={18}
                            style={{ overflow: "hidden" }}
                            size={20}
                            label="Ascendant"
                        />
                    </p>
                    <p style={{ fontSize:15}}>
                        <Checkbox
                            className={styles.customCheckbox} checked={desc}  onChange={event => {
                            product.setSortDirection('DESC')
                            setDesc(!desc)
                            setAsc(false)
                        }}
                            icon={
                                <div
                                    style={{
                                        display: "flex",
                                        flex: 1,
                                        backgroundColor: "#174A41",
                                        alignSelf: "stretch",
                                    }}
                                >
                                    <img src={img} color="white" width={20} />
                                </div>
                            }
                            borderColor="silver"
                            borderWidth={0}
                            borderRadius={18}
                            style={{ overflow: "hidden" }}
                            size={20}
                            label="Descendant"
                        />
                    </p>
                </div>
            </div>
            <div style={{marginTop:45}}>
                <Button variant="secondary" style={{width:"80px"}} onClick={(event => {
                    setIsLoading(true)
                    fetchProducts(product.size, product.page, product.search, product.sortField, product.sortDirection)
                        .then(response => {
                            console.log(response.data + "products")
                            product.setProducts(response.data)
                            history.push(SHOP_ROUTE)
                            // product.setSearch('')
                        }).finally(()=>setIsLoading(false))
                })}>{isLoading? SpinnerInside: 'Submit'}</Button>
            </div>
        </div>
    );

})
export default Filter
