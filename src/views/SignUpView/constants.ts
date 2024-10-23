import * as z from 'zod'
import type { SignUpStep } from '@/views/SignUpView/types'

const lowerCaseSymbols = /[a-z]+/
const upperCaseSymbols = /[A-Z]+/
const numericSymbols = /[0-9]+/
const specialSymbols = /[!@#$%^&*()\-_+.]+/

const passwordErrorMessage = 'Password must have at least 8 characters, lowercase and uppercase letters, numbers and special symbols'

export const formSchema = [
  z.object({
    email: z.string().email(),
  }),
  z
    .object({
      password: z.string()
        .min(8, passwordErrorMessage)
        .regex(lowerCaseSymbols, passwordErrorMessage)
        .regex(upperCaseSymbols, passwordErrorMessage)
        .regex(numericSymbols, passwordErrorMessage)
        .regex(specialSymbols, passwordErrorMessage),
      confirmPassword: z.string()
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword
      },
      {
        message: 'Passwords must match!',
        path: ['confirmPassword']
      }
    )
]

export const signUpSteps: SignUpStep[] = [
  {
    step: 1,
    type: 'email',
    description: 'sign-up:step-email:description'
  },
  {
    step: 2,
    type: 'password',
    description: 'sign-up:step-password:description'
  },
]
