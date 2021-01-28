import React from 'react'
import FormPayment from './form-payment'
import { useOrder } from '@/hooks'

const Payment: React.FC = () => {
  const { setPayment } = useOrder()

  return (
    <FormPayment onUpdate={setPayment} />
  )
}

export default Payment
