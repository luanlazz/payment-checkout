import React from 'react'
import styled from 'styled-components'
import { Grid, Link, Typography } from '@material-ui/core'
import { CardFront } from '@/components'
import newCard from '../../../assets/new-card.png'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import DoneIcon from '@material-ui/icons/Done'

const getStepTitle = (step: number): React.ReactNode => {
  switch (step) {
    case 0:
      return (
        <>
          <Icon>
            <ShoppingCartIcon fontSize='large' />
          </Icon>
          <Title>
            Confira seus produtos
          </Title>
        </>
      )
    case 1:
      return (
        <>
          <NewCard src={newCard}/>
          <Title>
            Adicione um novo cartão de crédito
          </Title>
          <CardFront />
        </>
      )
    case 2:
      return (
        <>
          <Icon>
            <DoneIcon fontSize='large' />
          </Icon>
          <Title>
            Revise o seu pedido e confirme
          </Title>
        </>)
    default:
      return (
        <Title>
          Etapa desconhecida
        </Title>
      )
  }
}

const getPreviousStep = (step: number): string => {
  switch (step) {
    case 0:
      return 'Adicionar outros produtos'
    case 1:
      return 'Alterar forma de pagamento'
    case 2:
      return 'Alterar informações de pagamento'
    default:
      return 'Etapa desconhecida'
  }
}

interface Props {
  activeStep: number
  setActiveStep: Function
  matchesMD: boolean
  getSteps: Function
}

const CheckoutNavigation: React.FC<Props> = ({ activeStep, setActiveStep, matchesMD, getSteps }: Props) => {
  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Navigation item xs={12} sm={12} md={5}>
      <Grid item>

        {activeStep > 0 && matchesMD &&
          <LinkComponent onClick={handleBack}>
            <ArrowBackIosIcon />
            {matchesMD && getPreviousStep(activeStep) }
          </LinkComponent>
        }

        {!matchesMD &&
          <Typography color='textSecondary'>
            {activeStep > 0 &&
              <BackLink>
                <ArrowBackIosIcon onClick={handleBack} />
              </BackLink>
            }
            <b>{'Etapa '} {activeStep + 1}</b>
            {' de '} {getSteps().length}
          </Typography>
        }
      </Grid>

      <StepTitle>
        {getStepTitle(activeStep)}
      </StepTitle>
    </Navigation>
  )
}

const Navigation = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  margin: 0;
  min-width: 290px;
  position: relative;

  ${({ theme }) => theme.breakpoints.down('md')} {
    height: 239px;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(3)}px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    height: auto;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing(5)}px
             ${({ theme }) => theme.spacing(3)}px
             ${({ theme }) => theme.spacing(3)}px
             ${({ theme }) => theme.spacing(7)}px;
  }   
`

const LinkComponent = styled(Link)`
  align-items: center;
  flex-direction: row;

  && {
    color: ${({ theme }) => theme.palette.text.secondary};
    display: flex;
    font-size: 1rem;
    text-decoration: none;
    ${({ theme }) => theme.breakpoints.down('md')} {
      justify-content: flex-start;
    }

    :hover {
      text-decoration: none;
      cursor: pointer;
    }
  }
`

const BackLink = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing(4)}px;
  cursor: pointer;
`

const StepTitle = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  flex-direction: row;  
  max-width: 300px;
  position: absolute;
  ${({ theme }) => theme.breakpoints.down('md')} {
    top: ${({ theme }) => theme.spacing(8)}px;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    top: ${({ theme }) => theme.spacing(14)}px;
  }  
`

const Title = styled.h2` 
  font-weight: bold;
`

const NewCard = styled.img`
  height: 50px;
  width: 50px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
`

const Icon = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 50px;
  width: 50px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
`

export default CheckoutNavigation
