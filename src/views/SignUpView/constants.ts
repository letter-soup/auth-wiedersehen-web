import * as z from 'zod'
import type { SignUpStep } from '@/views/SignUpView/types'

const lowerCaseSymbols = /[a-z]+/
const upperCaseSymbols = /[A-Z]+/
const numericSymbols = /[0-9]+/
const specialSymbols = /[!@#$%^&*()\-_+.]+/

export const createFormSchema = (t: (key: string) => string) => {
  const translations = {
    weakPassword: t('error:sign-up:weak-password'),
    passwordMismatch: t('error:sign-up:password-mismatch'),
  }

  return [
    z.object({
      email: z.string().email(),
    }),
    z
      .object({
        password: z
          .string()
          .min(8, translations.weakPassword)
          .regex(lowerCaseSymbols, translations.weakPassword)
          .regex(upperCaseSymbols, translations.weakPassword)
          .regex(numericSymbols, translations.weakPassword)
          .regex(specialSymbols, translations.weakPassword),
        confirmPassword: z.string(),
      })
      .refine(
        (values) => {
          return values.password === values.confirmPassword
        },
        {
          message: translations.passwordMismatch,
          path: ['confirmPassword'],
        },
      ),
  ]
}

export const signUpSteps: SignUpStep[] = [
  {
    step: 1,
    type: 'email',
    description: 'sign-up:step-email:description',
  },
  {
    step: 2,
    type: 'password',
    description: 'sign-up:step-password:description',
  },
]
