import React from 'react'
import styled from 'styled-components'
import logo from '../../../assets/demo-shop.png'

const Header: React.FC = () => {
  return (
    <HeaderComponent>
      <Logo src={logo} />
      <Menu>
        <Option />
        <Option />
        <Option />
      </Menu>
    </HeaderComponent>
  )
}

const HeaderComponent = styled.header`
  align-items: center;
  background-color: #FFF;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  min-width: 100%;
`

const Menu = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`

const Logo = styled.img`
  width: 260px;
  height: 42px;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

const Option = styled.div`
  background: #3C3C3C 0% 0% no-repeat padding-box;
  border-radius: 5px;
  height: 18px;
  margin: ${({ theme }) => theme.spacing(2)}px;
  opacity: 1;
  width: 100px;
`

export default Header
