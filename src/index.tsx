import React, { Suspense } from 'react'

import ReactDOM from 'react-dom/client'

import { AdressProvider } from 'context/AddressContext'
import { VehiclesProvider } from 'context/VehiclesContext'

import 'services/i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GlobalStyle } from 'styles'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <GlobalStyle />
      <VehiclesProvider>
        <AdressProvider>
          <App />
        </AdressProvider>
      </VehiclesProvider>
    </Suspense>
  </React.StrictMode>,
)
