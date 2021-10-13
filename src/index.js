import React, {createContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
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
    containerStyle: {
        marginTop: "50px",
    }
}

// const AlertTemplate = ({ style, options, message, close }) => (
//     <div style={{color: 'blue', background: 'green', height: '300px', width: "300px"}}>
//         {options.type === 'info' && '!'}
//         {options.type === 'success' && ':)'}
//         {options.type === 'error' && ':('}
//         {message}
//         <button onClick={close}>X</button>
//     </div>
// )

ReactDOM.render(
    <AlertProvider template={AlertTemplate}{...options}>
    <Context.Provider value={{
            user: new UserStore(),
            product: new ProductStore(),
        }}>
        <App/>
    </Context.Provider>
    </AlertProvider>,
    document.getElementById('root')
);

