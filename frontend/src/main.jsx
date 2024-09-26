import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx';
import { ContextProvider } from './contexts/contextprovider.jsx';
import { Provider } from 'react-redux';
import store from '../app/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
    <ContextProvider>
    <RouterProvider router={router} />
    </ContextProvider>
    </Provider>
  </React.StrictMode>,
)
