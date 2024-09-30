import * as z from 'zod'
import type { SignUpStep } from '@/views/SignUpView/types'

const passwordRegex = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{10,50}$/

export const formSchema = [
  z.object({
    email: z.string().email(),
  }),
  z
    .object({
      password: z.string()
        .min(10, '')
        .max(50, ''),
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
