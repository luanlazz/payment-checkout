import React, { useContext } from 'react'
import styled from 'styled-components'
import { Grid, Typography as MaterialTypography } from '@material-ui/core'
import { OrderContext } from '@/contexts'

const getType = (number): string => {
  const valueClear = number.replace(/ /g, '')

  if (/^4[0-9]{6,}$/.test(valueClear)) {
    return 'https://api.iconify.design/logos-visa.svg?width=70&height=70'
  } else if (/^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/.test(valueClear)) {
    return 'https://api.iconify.design/logos:mastercard.svg?width=70&height=70'
  } else if (/^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/.test(valueClear)) {
    return 'https://api.iconify.design/logos:dinersclub.svg?width=70&height=70'
  } else if (/^6(?:011|5[0-9]{2})[0-9]{3,}$/.test(valueClear)) {
    return 'https://api.iconify.design/logos:discover.svg?width=70&height=70'
  }

  return ''
}

const Card: React.FC = () => {
  const { payment } = useContext(OrderContext)

  return (
    <CardContainer>
      <Details container>
        <Operator>
          <img src={getType(payment.number)}/>
        </Operator>
        <NumberCard xs={12}>
          <Typography size={1.8}>{payment.number}</Typography>
        </NumberCard>
        <NameCard item xs={10}>
          <Typography size={1.2}>{payment.name}</Typography>
        </NameCard>
        <ValidateCard item xs={2}>
          <Typography size={1.2}>{payment.validate}</Typography>
        </ValidateCard>
      </Details>
    </CardContainer>
  )
}

const CardContainer = styled(Grid)`
  background: ${({ theme }) => theme.palette.grey[500]};
  border-radius: 8px;
  height: 224px;
  position: absolute;
  top: ${({ theme }) => theme.spacing(12)}px;
  
  && {
    width: 364px;
  }
`

const Details = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Operator = styled(Grid)`
  position: absolute;
`

const NumberCard = styled(Grid)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(14)}px;
`

const NameCard = styled(Grid)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(20)}px;
`

const ValidateCard = styled(Grid)`
  position: absolute;
  top: ${({ theme }) => theme.spacing(20)}px;
  left: ${({ theme }) => theme.spacing(33)}px;
`

interface ITypography {
  size: number
}

const Typography = styled(MaterialTypography)<ITypography>`
  && {
    font: normal normal normal ${(props) => props.size}rem SF Pro Text;
  }
`

export default Card
