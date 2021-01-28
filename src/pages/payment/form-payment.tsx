import React, { useEffect, useReducer, useRef } from 'react'
import styled from 'styled-components'
import { Grid, GridSize, MenuItem, TextField } from '@material-ui/core'
import { PaymentInitialState, PaymentProp } from '@/contexts'

const parcels = [
  {
    value: '1',
    label: '1 x 200.00'
  },
  {
    value: '2',
    label: '2 x 100.00'
  },
  {
    value: '3',
    label: '3 x 66.66'
  },
  {
    value: '4',
    label: '4 x 50.00'
  }
]

interface Props {
  onUpdate: Function
}

const FormPayment: React.FC<Props> = ({ onUpdate }: Props) => {
  const [paymentState, dispatch] = useReducer(reducer, PaymentInitialState)
  const numberCard = useRef()

  useEffect(() => {
    onUpdate(paymentState)
  }, [paymentState, onUpdate])

  function handleChangeField (e): void {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { name, value }
    })
  }

  return (
    <Grid container spacing={2} justify='center'>
      <Form>
        {[
          {
            label: 'Número do cartão',
            xs: 12,
            name: 'number',
            inputRef: numberCard
          },

          {
            label: 'Nome (igual ao cartão)',
            xs: 12,
            name: 'name'
          },

          {
            label: 'Validade',
            xs: 6,
            name: 'validate'
          },

          {
            label: 'CVV',
            xs: 6,
            name: 'cvv',
            props: {
              maxLength: 3
            }
          },

          {
            label: 'Número de parcelas',
            xs: 12,
            name: 'numParcels',
            type: 'select'
          }
        ].map((field) => (
          <GridInput item key={field.name} xs={field.xs as GridSize}>
            <TextField
              label={field.label}
              name={field.name}
              value={paymentState[field.name]}
              select={field.type === 'select'}
              onChange={handleChangeField}
              inputProps={{ ...field.props }}
              fullWidth
            >
              {field.type === 'select' &&
                parcels.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              }
            </TextField>
          </GridInput>
        ))}
      </Form>
    </Grid>
  )
}

function reducer (state, action): PaymentProp {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }

    case 'RESET':
      return {
        ...PaymentInitialState
      }

    default:
      return state
  }
}

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-width: 200px;
  max-width: 400px;

  & .MuiFormLabel-root {
    color: ${({ theme }) => theme.palette.grey[500]};
  }

  & .MuiInputBase-input {
    color: ${({ theme }) => theme.palette.common.black};
  }
`

const GridInput = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

export default FormPayment
