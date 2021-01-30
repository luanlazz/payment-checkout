import axios from 'axios'

export interface PaymentProp {
  number: string
  name: string
  validate: string
  cvv: string
  numParcels: string
}

export const makePayment = async (payment: PaymentProp): Promise<void> => {
  try {
    await axios.request({
      url: '/pagar',
      method: 'post',
      data: payment
    })
  } catch (error) {
    console.log('Error on request')
  }
}
