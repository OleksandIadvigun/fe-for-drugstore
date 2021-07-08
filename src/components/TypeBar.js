import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import styles from './TypeBar.module.css'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div className={styles.phoneTypeBar}>
        <ListGroup variant="flush" className={`mt-2 w-50  `}>
            {device.types.map(t =>
                <ListGroup.Item className="px-4"
                                style={{cursor: "pointer"}}
                                key={t.id}
                                active={t.id === device.selectedType.id}
                                onClick={()=>device.setSelectedType(t)}
                >{t.name}
                </ListGroup.Item>)}
        </ListGroup>
        </div>
    );
})
export default TypeBar
