import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Grid, Paper, Step, StepLabel, Stepper, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import CheckoutNavigation from './checkout-navigation'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const getSteps = (): any[] => {
  return [
    'Carrinho',
    'Pagamento',
    'Confirmação'
  ]
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

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const steps = getSteps()
  const theme = useTheme()
  const matchesMD = useMediaQuery(theme.breakpoints.up('md'))

  const handleNext = (): void => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  return (
    <CheckoutContainer container>
      <CheckoutPaper>
        <CheckoutNavigation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          getSteps={getSteps}
          matchesMD={matchesMD}
        />

        <CheckoutStepper item xs={12} sm={12} md={7}>
          {!!matchesMD &&
            <Stepper activeStep={activeStep} connector={<ArrowForwardIosIcon color='primary' />}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
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
                    size='large'
                    fullWidth
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

  & .MuiButton-root {
    border-radius: 10px;
  }
`

export default Checkout
