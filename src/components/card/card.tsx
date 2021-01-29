import React, { useContext } from 'react'
import styled from 'styled-components'
import { Grid, Typography as MaterialTypography, useMediaQuery, useTheme } from '@material-ui/core'
import { OrderContext } from '@/contexts'

const getType = (cardNumber: string, size: number): string => {
  const valueClear = cardNumber.replace(/ /g, '')

  if (/^4[0-9]{6,}$/.test(valueClear)) {
    return `https://api.iconify.design/logos-visa.svg?width=${size}&height=${size}`
  } else if (/^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/.test(valueClear)) {
    return `https://api.iconify.design/logos:mastercard.svg?width=${size}&height=${size}`
  } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/.test(valueClear)) {
    return `https://api.iconify.design/logos:dinersclub.svg?width=${size}&height=${size}`
  } else if (/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(valueClear)) {
    return `https://api.iconify.design/logos:discover.svg?width=${size}&height=${size}`
  }

  return ''
}

const CardFront: React.FC = () => {
  const { payment } = useContext(OrderContext)
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <CardContainer height={matchesMD ? 224 : 172} width={matchesMD ? 364 : 280}>
      <Details container>
        {matchesMD
          ? <>
            <Operator>
              <img src={getType(payment.number, 70) }/>
            </Operator>
            <NumberCard xs={12} top={14}>
              <Typography noWrap size={1.8}>{payment.number}</Typography>
            </NumberCard>
            <NameCard item xs={10} top={20}>
              <Typography size={1.2}>{payment.name}</Typography>
            </NameCard>
            <ValidateCard item xs={2} top={20} left={33}>
              <Typography size={1.2}>{payment.validate}</Typography>
            </ValidateCard>
          </>
          : <>
            <Operator>
              <img src={getType(payment.number, 50) }/>
            </Operator>
            <NumberCard xs={12} top={10}>
              <Typography noWrap size={1.5}>{payment.number}</Typography>
            </NumberCard>
            <NameCard item xs={10} top={15}>
              <Typography size={1.0}>{payment.name}</Typography>
            </NameCard>
            <ValidateCard item xs={2} top={15} left={28}>
              <Typography size={1.0}>{payment.validate}</Typography>
            </ValidateCard>
          </>
        }
      </Details>
    </CardContainer>
  )
}

interface ICardContainer {
  height: number
  width: number
}

const CardContainer = styled(Grid)<ICardContainer>`
  background: ${({ theme }) => theme.palette.grey[500]};
  border-radius: 8px;  
  position: absolute;
  height: ${(props) => props.height}px;
  top: ${({ theme }) => theme.spacing(12)}px;   
  width: ${(props) => props.width}px;
`

const Details = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Operator = styled(Grid)`
  position: absolute;
`
interface INumberCard {
  top: number
}

const NumberCard = styled(Grid)<INumberCard>`
  position: absolute;
  overflow: hidden;
  top: ${(props) => props.theme.spacing(props.top)}px;
`

interface INameCard {
  top: number
}

const NameCard = styled(Grid)<INameCard>`
  position: absolute;
  top: ${(props) => props.theme.spacing(props.top)}px;
`

interface IValidateCard {
  top: number
  left: number
}

const ValidateCard = styled(Grid)<IValidateCard>`
  position: absolute;
  top: ${(props) => props.theme.spacing(props.top)}px;
  left: ${(props) => props.theme.spacing(props.left)}px;
`

interface ITypography {
  size: number
}

const Typography = styled(MaterialTypography)<ITypography>`
  && {
    font-family: SF Pro Text;
    font-size: ${(props) => props.size}rem;
  }
`

export default CardFront
