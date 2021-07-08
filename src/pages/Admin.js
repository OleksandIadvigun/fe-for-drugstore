import {Button, Container, Image, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import brandImage from '../assets/brand.png'
import FadeIn from "react-fade-in";
import styles from './Admin.module.css'
import {Context} from "../index";
import CreateType from "../components/modals/CreateType";
import EditType from "../components/modals/EditType";
import DeleteType from "../components/modals/DeleteType";
import EditBrand from "../components/modals/EditBrand";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteDevice from "../components/modals/DeleteDevice";
import EditDevice from "../components/modals/EditDevice";




export default function Admin() {
    const {device} = useContext(Context)
    const [showModalType, setShowModalType] = useState(false);
    const [editModalType, setEditModalType] = useState(false);
    const [deleteModalType, setDeleteModalType] = useState(false);
    const [showModalBrand, setShowModalBrand] = useState(false);
    const [editModalBrand, setEditModalBrand] = useState(false);
    const [deleteModalBrand, setDeleteModalBrand] = useState(false);
    const [showModalDevice, setShowModalDevice] = useState(false);
    const [deleteModalDevice, setDeleteModalDevice] = useState(false);
    const [editModalDevice, setEditModalDevice] = useState(false);

    return (
        <FadeIn transitionDuration={800}>
        <div className="d-flex flex-column justify-content-center pt-4" style={{width:'90vw', paddingBottom:150}}>
            <Row>TYPE</Row>
            <Button variant="secondary mt-4 p-2 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setShowModalType(true)
                    }}
            ><i className="large material-icons mt-1 ">add_circle</i>
            </Button>
            <Button variant="secondary mt-4 p-2 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setEditModalType(true)
                    }}
            ><i className="large material-icons mt-1 ">edit</i>
            </Button>
            <Button variant="secondary mt-4 p-2 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setDeleteModalType(true)
                    }}
            ><i className="large material-icons mt-1 ">delete_forever</i>
            </Button>

            <hr className="mt-5"/>
            <Row>BRAND</Row>
            <Button variant="secondary mt-4 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setShowModalBrand(true)
                    }}
            ><i className="large material-icons mt-1 ">add_circle</i></Button>
            <Button variant="secondary mt-4 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setEditModalBrand(true)
                    }}
            ><i className="large material-icons mt-1 ">edit</i></Button>
            <Button variant="secondary mt-4  align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setDeleteModalBrand(true)
                    }}
            > <i className="large material-icons mt-1 ">delete_forever</i> </Button>

            <hr className="mt-5"/>
            <Row>DEVICE</Row>
            <Button variant="secondary mt-4 p-2 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setShowModalDevice(true)
                    }}

            ><i className="large material-icons mt-1 ">add_circle</i></Button>
            <Button variant="secondary mt-4 p-2 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setEditModalDevice(true)
                    }}

            ><i className="large material-icons mt-1">edit</i></Button>
            <Button variant="secondary mt-4 p-2 align-self-center"
                    className={styles.buttonWidthMobile}
                    onClick={() => {
                        setDeleteModalDevice(true)
                    }}

            ><i className="large material-icons mt-1">delete_forever</i></Button>

            <CreateType show={showModalType}
                        onHide={() => {
                            setShowModalType(false)
                        }}
            />
            <EditType show={editModalType}
                        onHide={() => {
                            setEditModalType(false)
                            device.setSelectedType('')
                        }}
            />
            <DeleteType show={deleteModalType}
                      onHide={() => {
                          setDeleteModalType(false)
                          device.setSelectedType('')
                      }}
            />
            <CreateBrand show={showModalBrand}
                         onHide={() => {
                             setShowModalBrand(false)
                         }}/>
            <EditBrand show={editModalBrand}
                         onHide={() => {
                             setEditModalBrand(false)
                             device.setSelectedBrand('')
                         }}/>
            <DeleteBrand show={deleteModalBrand}
                         onHide={() => {
                             setDeleteModalBrand(false)
                             device.setSelectedBrand('')
                         }}/>
            <CreateDevice show={showModalDevice}
                          onHide={() => {
                              setShowModalDevice(false)
                              device.setSelectedBrand('')
                              device.setSelectedType('')
                          }}
            />
            <DeleteDevice show={deleteModalDevice}
                          onHide={() => {
                              setDeleteModalDevice(false)
                              device.setSelectedDevice('')
                              device.setSelectedBrand('')
                              device.setSelectedType('')
                          }}
            />
            <EditDevice show={editModalDevice}
                          onHide={() => {
                              setEditModalDevice(false)
                              device.setSelectedDevice('')
                              device.setSelectedBrand('')
                              device.setSelectedType('')
                          }}
            />
        </div>
        </FadeIn>
    );
}
