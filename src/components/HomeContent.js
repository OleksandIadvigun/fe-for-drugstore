import React from 'react';
import fon from "../assets/fon.jpg"
import styles from "./HomeContent.module.css"

function HomeContent(props) {
    return (
        <div  className={styles.shrift} style={{ height:"70vh", display:"flex", justifyContent:"center", alignItems:"center",
        marginTop:"10px", borderRadius:10 , fontSize:"38px",
            flexDirection:"column", color:'#008B8B'
        }}>
            <div >Welcome to our drugstore.<br/> You can find what you need using search field.
        </div>
            {/*<img src={fon} width="95%"  style={{position:"relative", opacity:"30%" , borderRadius:20}}/>*/}
            </div>
    );
}

export default HomeContent;