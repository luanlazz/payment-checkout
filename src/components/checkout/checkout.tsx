import React, { useState } from 'react'
import styled from 'styled-components'
import newCard from '../../../assets/new-card.png'
import { Button, Grid, Link, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import DoneIcon from '@material-ui/icons/Done'

const getSteps = (): any[] => {
  return [
    'Carrinho',
    'Pagamento',
    'Confirmação'
  ]
}

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

const getStepContent = (step: number): string => {
  switch (step) {
    case 0:
      return 'Carrinho'
    case 1:
      return 'Pagamento'
    case 2:
      return 'Confirmação'
    default:
      return 'Etapa desconhecida'
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

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <CheckoutContainer container>
      <CheckoutPaper>
        <Navigation item xs={12} sm={12} md={4}>
          <BackStep>
            {activeStep > 0 &&
              <>
                <ArrowBackIosIcon />
                <LinkComponent onClick={handleBack}>
                  {getPreviousStep(activeStep)}
                </LinkComponent>
              </>
            }
          </BackStep>

          <StepTitle>
            {getStepTitle(activeStep)}
          </StepTitle>
        </Navigation>

        <CheckoutStepper item>
          <Stepper activeStep={activeStep} connector={<ArrowForwardIosIcon color='primary' />}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <StepContent>
            {activeStep === steps.length ? (
              <div>
                <Typography>
                  Etapas concluídas
                </Typography>
              </div>
            ) : (
              <Grid item xs={12}>
                <Grid item xs={12} alignContent='center'>
                  {getStepContent(activeStep)}
                </Grid>

                <ButtonNextStep item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    fullWidth
                    size='large'
                  >
                    {activeStep === steps.length - 1 ? 'Finalizar Pedido' : 'Continuar'}
                  </Button>
                </ButtonNextStep>
              </Grid>
            )}
          </StepContent>
        </CheckoutStepper>
      </CheckoutPaper>
    </CheckoutContainer>
  )
}

const CheckoutContainer = styled(Grid)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

const CheckoutPaper = styled(Paper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 596px;
  margin: ${({ theme }) => theme.spacing(4)}px;
  max-width: 90%;
`

const Navigation = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  margin: 0;
  padding: ${({ theme }) => theme.spacing(5)}px
           ${({ theme }) => theme.spacing(3)}px
           ${({ theme }) => theme.spacing(3)}px
           ${({ theme }) => theme.spacing(8)}px;
  min-width: 330px;
  position: relative;
`

const BackStep = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: row;
`

const LinkComponent = styled(Link)`
  && {
    color: ${({ theme }) => theme.palette.common.white};
    font-size: 22px;
    text-decoration: none;

    :hover {
      text-decoration: none;
      cursor: pointer;
    }
  }
`

const StepTitle = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: row;  
  max-width: 300px;
  top: ${({ theme }) => theme.spacing(14)}px;
  position: absolute;
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

const CheckoutStepper = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  right: 0;
  padding: ${({ theme }) => theme.spacing(5)}px
           ${({ theme }) => theme.spacing(3)}px
           ${({ theme }) => theme.spacing(3)}px
           ${({ theme }) => theme.spacing(15)}px;
`

const StepContent = styled(Grid)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`

const ButtonNextStep = styled(Grid)`
  bottom: ${({ theme }) => theme.spacing(2)}px;
  height: 51px;
  position: absolute;
  right: ${({ theme }) => theme.spacing(2)}px;
  width: 246px;
`

export default Checkout
