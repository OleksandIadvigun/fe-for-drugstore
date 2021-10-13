import {useContext} from "react";
import {Context} from "../index";
import {Button, Card, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div>
            <ListGroup horizontal className="d-flex flex-wrap">
                {/*{device.brands.map(br =>*/}
                {/*    <Button variant="outline-secondary" className="p-md-1 my-2 me-2 border-light" key={br.id}*/}
                {/*            style={{cursor: "pointer"}}*/}
                {/*            active={br.id === device.selectedBrand.id}*/}
                {/*            onClick={() => device.setSelectedBrand(br)*/}
                {/*            }*/}
                {/*    >{br.name}</Button>*/}
                {/*)}*/}
                Brandbar
            </ListGroup>
        </div>
    );
})
export default BrandBar
