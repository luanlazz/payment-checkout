import React from 'react'
import styled from 'styled-components'
import { Checkout } from '@/components'

const Store: React.FC = () => (
  <StoreContainer>
    <Checkout />
  </StoreContainer>
)

const StoreContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.default} 0% 0% no-repeat padding-box; 
  box-sizing: border-box;
  height: 100vh;
  opacity: 1;
`

export default Store
