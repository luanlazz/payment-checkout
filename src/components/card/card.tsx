import React from 'react'
import styled from 'styled-components'
import { Grid, useMediaQuery, useTheme } from '@material-ui/core'
import { CardFront, CardBehind } from '@/components'
import { useOrder } from '@/hooks'
import bgCardFront from '@/assets/card-front.png'
import bgCardBehind from '@/assets/card-back.png'

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

const Card: React.FC = () => {
  const { payment, frontCard } = useOrder()
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <CardContainer
      height={matchesMD ? 224 : 172}
      width={matchesMD ? 364 : 280}
      hastype={getType(payment.number, null).length > 0 ? 'true' : 'false'}
      background={frontCard as boolean ? bgCardFront.toString() : bgCardBehind.toString()}
    >
      {frontCard as boolean
        ? <CardFront
          getType={getType}
          matchesMD={matchesMD}
          payment={payment}
        />
        : <CardBehind
          matchesMD={matchesMD}
          payment={payment}
        />
      }
    </CardContainer>
  )
}

interface ICardContainer {
  height: number
  width: number
  hastype: string
  background: string
}

const CardContainer = styled(Grid)<ICardContainer>`
  background: ${(props) => props.hastype === 'true'
    ? `url(${props.background})`
    : props.theme.palette.grey[500]};
  border-radius: 8px;
  position: absolute;
  height: ${(props) => props.height}px;
  top: ${({ theme }) => theme.spacing(12)}px;   
  width: ${(props) => props.width}px;
`

export default Card
