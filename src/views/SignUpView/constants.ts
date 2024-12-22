import * as z from 'zod'
import type { SignUpStep } from '@/views/SignUpView/types'

const lowerCaseSymbols = /[a-z]+/
const upperCaseSymbols = /[A-Z]+/
const numericSymbols = /[0-9]+/
const specialSymbols = /[!@#$%^&*()\-_+.]+/

export const formSchema = [
  z.object({
    email: z.string().email(),
  }),
  z
    .object({
      password: z.string()
        .min(8, 'error:sign-up:weak-password')
        .regex(lowerCaseSymbols, 'error:sign-up:weak-password')
        .regex(upperCaseSymbols, 'error:sign-up:weak-password')
        .regex(numericSymbols, 'error:sign-up:weak-password')
        .regex(specialSymbols, 'error:sign-up:weak-password'),
      confirmPassword: z.string()
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword
      },
      {
        message: 'error:sign-up:password-mismatch',
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
