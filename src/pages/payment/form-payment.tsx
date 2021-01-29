import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'
import { FormHelperText, Grid, GridSize, MenuItem, TextField } from '@material-ui/core'
import { OrderContext, PaymentInitialState, PaymentProp } from '@/contexts'

const parcels = [
  {
    value: '1',
    label: '1 x 200.00 (à vista)'
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

const numberValidation = (fieldValue): string => {
  const valueClear = fieldValue.replace(/ /g, '')

  if (valueClear.length < 14) {
    return 'Número de cartão inválido'
  }

  if (/[^0-9]/.test(valueClear)) {
    return 'Insira apenas números'
  }

  return null
}

const numberMask = (value): string => {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
}

const nameValidation = (fieldValue): string => {
  if (fieldValue.trim() === '') {
    return 'Insira seu nome completo'
  }

  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return 'Insira apenas letras'
  }

  if (fieldValue.trim().length < 3) {
    return 'Insira seu nome completo'
  }

  const nameSplit: [] = fieldValue.split(' ')
  if (nameSplit.length < 2) {
    return 'Insira seu nome completo'
  }

  return null
}

const validateValidation = (fieldValue): string => {
  const date: [] = fieldValue.split('/')

  if (date.length < 2) {
    return 'Data inválida'
  }

  const [month = 99, year = 99] = date
  const dateNow = new Date()

  if ((+2000 + +year) < dateNow.getFullYear()) {
    return 'Ano inválido'
  }

  if (month < 0 || month > 12 || month < dateNow.getMonth() + 1) {
    return 'Mês inválido'
  }

  return null
}

const validateMask = (value): string => {
  return value
    .replace(/\D+/g, '')
    .replace(/(\w{5})+/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\d+?$/, '$1')
}

const cvvValidation = (fieldValue): string => {
  if (fieldValue.trim().length < 3) {
    return 'Código inválido'
  }

  return null
}

const numParcelsValidation = (fieldValue): string => {
  if (fieldValue.length === 0) {
    return 'Insira o número de parcelas'
  }

  return null
}

const validate = {
  number: numberValidation,
  name: nameValidation,
  validate: validateValidation,
  cvv: cvvValidation,
  numParcels: numParcelsValidation
}

const FormPayment: React.FC<Props> = ({ onUpdate }: Props) => {
  const { payment } = useContext(OrderContext)
  const [paymentState, dispatch] = useReducer(reducer, payment)
  const [errors, setErrors] = useState({})
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

  function handleBlur (e): void {
    const { name, value } = e.target
    const error = validate[name](value)

    setErrors(old => ({
      ...old,
      [name]: error
    }))
  }

  return (
    <Grid container spacing={2} justify='center'>
      <Form>
        {[
          {
            label: 'Número do cartão',
            xs: 12,
            name: 'number',
            hasMask: true,
            mask: numberMask,
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
            name: 'validate',
            hasMask: true,
            mask: validateMask
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
              value={field.hasMask
                ? field.mask(paymentState[field.name])
                : paymentState[field.name]
              }
              select={field.type === 'select'}
              error={errors[field.name] != null}
              onChange={handleChangeField}
              onBlur={handleBlur}
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
            <FormHelperText>
              {errors[field.name]}
            </FormHelperText>
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

    case 'LOAD_STATE':
      return {
        ...action.payload
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
  max-width: 500px;

  & .MuiFormLabel-root {
    color: ${({ theme }) => theme.palette.grey[500]};
  }

  & .MuiInputBase-input {
    color: ${({ theme }) => theme.palette.common.black};
  }

  & .MuiFormHelperText-root {
    color: ${({ theme }) => theme.palette.error.main};
  }
`

const GridInput = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

export default FormPayment
