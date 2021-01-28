import React, { createContext, useState } from 'react'

export interface PaymentProp {
  number: string
  name: string
  validate: string
  cvv: string
  numParcels: string
}

export interface ContextProps {
  payment: PaymentProp
  setPayment: Function
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
  setPayment: () => null
})

interface Props {
  children: React.ReactNode
}

const OrderProvider: React.ComponentType<Props> = ({ children }: Props) => {
  const [payment, setPayment] = useState<PaymentProp>({ ...PaymentInitialState })

  return (
    <OrderContext.Provider value={{
      payment,
      setPayment
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export { OrderProvider, OrderContext }
