import { useContext } from 'react'
import { OrderContext, ContextProps } from '@/contexts'

function useOrder (): ContextProps {
  return useContext(OrderContext)
}

export default useOrder
