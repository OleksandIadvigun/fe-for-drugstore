import React, {createContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import * as PropTypes from "prop-types";
import AlertTemplate from "react-alert-template-basic";
import {positions, transitions,Provider as AlertProvider} from "react-alert";

export const Context = createContext(null)

AlertProvider.propTypes = {
    template: PropTypes.element,
    children: PropTypes.node
};
const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    type: 'error',
    transition: transitions.SCALE,
}
ReactDOM.render(
    <AlertProvider template={AlertTemplate}{...options}>
    <Context.Provider value={{
            user: new UserStore(),
            device: new DeviceStore(),
        }}>
        <App/>
    </Context.Provider>
    </AlertProvider>,
    document.getElementById('root')
);

