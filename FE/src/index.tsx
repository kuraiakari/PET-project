import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StyledEngineProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'

import { store } from './redux/store'

import { router } from './router'
import './App.css'
import './fontText.css'
import './magin.css'
import './padding.css'
import './fontDownload/JejuMyeongjo-Regular.ttf'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router}></RouterProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
)
