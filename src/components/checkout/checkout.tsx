import React, { useState } from 'react'
import styled from 'styled-components'
import newCard from '../../../assets/new-card.png'
import { Button, Grid, Link, Paper, Step, StepLabel, Stepper, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { breakpoints } from '@material-ui/system'
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <CheckoutContainer container xs={12}>
      <CheckoutPaper>
        <Navigation item xs={12} sm={12} md={5}>
          <Grid item>

            {activeStep > 0 && matches &&
              <LinkComponent onClick={handleBack}>
                <ArrowBackIosIcon />
                {matches && getPreviousStep(activeStep) }
              </LinkComponent>
            }

            {!matches &&
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

        <CheckoutStepper item xs={12} sm={12} md={7}>
          {matches &&
            <Stepper activeStep={activeStep} connector={<ArrowForwardIosIcon color='primary' />}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          }

          <StepContent>
            {activeStep === steps.length ? (
              <div>
                <Typography>
                  Etapas concluídas
                </Typography>
              </div>
            ) : (
              <Grid item xs={12}>
                <Grid item xs={12}>
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
  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin: ${({ theme }) => theme.spacing(4)}px;
  }
`

const Navigation = styled(Grid)`
  background: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  ${({ theme }) => theme.breakpoints.down('md')} {
    justify-content: center;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    justify-content: flex-start;
  }
  margin: 0;
  min-width: 330px;
  position: relative;
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
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
    font-size: 22px;
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

const CheckoutStepper = styled(Grid)`
  display: flex;
  color: ${({ theme }) => theme.palette.common.black};
  flex-direction: column;
  justify-content: flex-start;
  right: 0;
  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: ${({ theme }) => theme.spacing(5)}px
             ${({ theme }) => theme.spacing(3)}px
             ${({ theme }) => theme.spacing(3)}px
             ${({ theme }) => theme.spacing(12)}px;
  }

  & .MuiStepLabel-label, 
    .MuiStepIcon-root {
    color: ${({ theme }) => theme.palette.text.primary};
  }
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
