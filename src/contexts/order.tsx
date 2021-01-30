import React, { createContext, useState } from 'react'
import { PaymentProp } from '@/services'
export interface ContextProps {
  payment: PaymentProp
  setPayment: Function
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
  frontCard: true,
  setFrontCard: () => null
})

interface Props {
  children: React.ReactNode
}

const OrderProvider: React.ComponentType<Props> = ({ children }: Props) => {
  const [payment, setPayment] = useState<PaymentProp>({ ...PaymentInitialState })
  const [frontCard, setFrontCard] = useState(true)

  return (
    <OrderContext.Provider value={{
      payment,
      setPayment,
      frontCard,
      setFrontCard
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export { OrderProvider, OrderContext }
