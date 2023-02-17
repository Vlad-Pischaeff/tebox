import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import App from './App';
import 'assets/style/index.sass';
import 'assets/style/quill.snow.css';
import 'react-quill-emoji/dist/quill-emoji.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
