import React from 'react'
import styled from 'styled-components'
import { Grid, Typography as MaterialTypography } from '@material-ui/core'
import { PaymentProp } from '@/services'

interface ICardBehind {
  matchesMD: boolean
  payment: PaymentProp
}

const CardBehind: React.FC<ICardBehind> = ({ matchesMD, payment }: ICardBehind) => (
  <Details container>
    {matchesMD
      ? <>
        <CvvCard item xs={2} top={13} left={23}>
          <Typography size={1.2}>{payment.cvv}</Typography>
        </CvvCard>
      </>
      : <>
        <CvvCard item xs={2} top={13} left={23}>
          <Typography size={1.0}>{payment.cvv}</Typography>
        </CvvCard>
      </>
    }
  </Details>
)

const Details = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

interface ICvvCard {
  top: number
  left: number
}

const CvvCard = styled(Grid)<ICvvCard>`
  position: absolute;
  top: ${(props) => props.theme.spacing(props.top)}px;
  left: ${(props) => props.theme.spacing(props.left)}px;
`

interface ITypography {
  size: number
}

const Typography = styled(MaterialTypography)<ITypography>`
  && {
    color: ${({ theme }) => theme.palette.common.black};
    font-family: SF Pro Text;
    font-size: ${(props) => props.size}rem;    
  }
`

export default CardBehind
