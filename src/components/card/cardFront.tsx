import React from 'react'
import styled from 'styled-components'
import { Grid, Typography as MaterialTypography } from '@material-ui/core'
import { PaymentProp } from '@/services'

interface ICardFront {
  getType: Function
  matchesMD: boolean
  payment: PaymentProp
}

const CardFront: React.FC<ICardFront> = ({ getType, matchesMD, payment }: ICardFront) => (
  <Details container>
    {matchesMD
      ? <>
        <Operator>
          <img src={getType(payment.number, 70) }/>
        </Operator>
        <NumberCard item xs={12} top={14}>
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
        <NumberCard item xs={12} top={10}>
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
)

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
