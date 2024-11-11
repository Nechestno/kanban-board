import { StrictMode } from 'react'
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './font.scss'
import {Provider} from "react-redux";
import store from "./store";

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        rootElement
    );
}