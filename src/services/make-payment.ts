import axios, { AxiosResponse } from 'axios'
interface HttpResponse<T = any> {
  statusCode: number
  body?: T
}

export interface PaymentProp {
  number: string
  name: string
  validate: string
  cvv: string
  numParcels: string
}

export const makePayment = async (payment: PaymentProp): Promise<HttpResponse> => {
  let axiosResponse: AxiosResponse

  try {
    axiosResponse = await axios.request({
      url: '/pagar',
      method: 'post',
      data: payment
    })
  } catch (error) {
    axiosResponse = error.response
  }

  return {
    statusCode: axiosResponse.status,
    body: axiosResponse.data
  }
}
