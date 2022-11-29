import { memo } from 'react'

import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'

import Checkout from 'pages/Checkout'
import CreditCardPayment from 'pages/CreditCardPayment'
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'
import TicketPayment from 'pages/TicketPayment'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/ticketpayment/:id" element={<TicketPayment />} />
        <Route path="/creditcardpayment/:id" element={<CreditCardPayment />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  )
}

export default memo(Routes)
