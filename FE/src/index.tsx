import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { StyledEngineProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'

import App from './App'
import AutoScrollToTop from './AutoToTop'
import { store } from './redux/store'

import './fontText.css'
import './magin.css'
import './padding.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <AutoScrollToTop />
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
)
