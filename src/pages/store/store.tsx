import React from 'react'
import styled from 'styled-components'
import { Header } from '@/components'

const Store: React.FC = () => (
  <Background>
    <Header />
  </Background>
)

const Background = styled.main`
  background: ${({ theme }) => theme.palette.background.default} 0% 0% no-repeat padding-box; 
  height: 100vh;
  opacity: 1;
`

export default Store
