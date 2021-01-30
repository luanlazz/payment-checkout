import React, { createContext, useState } from 'react'
import { PaymentProp, makePayment } from '@/services'
export interface ContextProps {
  payment: PaymentProp
  setPayment: Function
  sendPayment: Function
  frontCard: boolean
  setFrontCard: Function
}

export const PaymentInitialState: PaymentProp = {
  number: '',
  name: '',
  validate: '',
  cvv: '',
  numParcels: ''
}

const OrderContext = createContext<ContextProps>({
  payment: { ...PaymentInitialState },
  setPayment: () => null,
  sendPayment: () => null,
  frontCard: true,
  setFrontCard: () => null
})

interface Props {
  children: React.ReactNode
}

const OrderProvider: React.ComponentType<Props> = ({ children }: Props) => {
  const [payment, setPayment] = useState<PaymentProp>({ ...PaymentInitialState })
  const [frontCard, setFrontCard] = useState(true)

  const sendPayment = (): void => {
    makePayment(payment)
      .then(() => console.log('Pagamento enviado com sucesso'))
      .catch(error => console.log('Error: ', error))
  }

  return (
    <OrderContext.Provider value={{
      payment,
      setPayment,
      sendPayment,
      frontCard,
      setFrontCard
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export { OrderProvider, OrderContext }
