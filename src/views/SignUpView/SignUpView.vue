<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { computed, type ComputedRef, h, type Ref, ref, watchEffect } from 'vue'
import { Stepper, StepperItem, StepperTrigger } from '@/components/ui/stepper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { Separator } from '@/components/ui/separator'
import { createFormSchema, signUpSteps } from '@/views/SignUpView/constants'
import { useWindowEventListener } from '@/composable/useWindowEventListener'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const initialStep: number = 1
const stepIndex: Ref<number> = ref(initialStep)
const stepDescription: ComputedRef<string> = computed(
  () => signUpSteps[stepIndex.value - 1].description,
)
const formSchema: ComputedRef = computed(() => createFormSchema(t))

useWindowEventListener('popstate', (event) => {
  stepIndex.value = event.state?.stepIndex ?? initialStep
})

watchEffect(() => {
  history.pushState(
    { stepIndex: stepIndex.value },
    `Step ${stepIndex.value}`,
    `#step-${stepIndex.value}`,
  )
})

const signUpAcknowledgementMap: ComputedRef<Record<string, string>> = computed(() => ({
  termsOfService: `<a target="_blank" href="/terms" class="underline underline-offset-4 hover:text-primary">${t('sign-up:terms-of-service')}</a>`,
  privacyPolicy: `<a target="_blank" href="/privacy" class="underline underline-offset-4 hover:text-primary">${t('sign-up:privacy-policy')}</a>`,
}))

async function validateEmail(
  values: Record<string, string>,
  validate: () => Promise<any>,
  nextStep: () => void,
  setFieldError: (field: string, error: string) => void,
) {
  const validationResult = await validate()
  // if (emailAlreadyRegistered) {
  //   setFieldError('email', 'Email is already in use. Try resetting your password')
  //   return
  // }

  validationResult.valid && nextStep()
}

async function onSubmit(e: Event, validate: () => Promise<any>, values: any) {
  const validationResult = await validate()

  if (stepIndex.value === signUpSteps.length && validationResult.valid) {
    toast({
      title: 'You submitted the following values:',
      description: h(
        'pre',
        { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
        h('code', { class: 'text-white' }, JSON.stringify(values, null, 2)),
      ),
    })
  }
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center py-12">
    <div class="mx-auto grid w-[350px] gap-6">
      <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">
          {{ $t('sign-up:header') }}
        </h1>
        <p class="text-balance text-muted-foreground">
          {{ $t(stepDescription) }}
        </p>
      </div>
      <Form
        v-slot="{ values, validate, setFieldError }"
        as=""
        keep-values
        :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
      >
        <Stepper v-slot="{ nextStep }" v-model="stepIndex" class="block w-full">
          <form @submit.prevent="(e) => onSubmit(e, validate, values)">
            <div class="flex w-full flex-start gap-2">
              <StepperItem
                v-for="step in signUpSteps"
                :key="step.step"
                class="hidden"
                :step="step.step"
              >
                <StepperTrigger as-child>
                  <div />
                </StepperTrigger>
              </StepperItem>
            </div>

            <div class="flex flex-col gap-4">
              <template v-if="stepIndex === 1">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel>{{ $t('sign-up:email') }}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        v-bind="componentField"
                        @keydown.enter.prevent="
                          validateEmail(values, validate, nextStep, setFieldError)
                        "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button
                  class="w-full"
                  @click="validateEmail(values, validate, nextStep, setFieldError)"
                  type="button"
                >
                  {{ $t('sign-up:step:cta') }}
                </Button>
              </template>

              <template v-if="stepIndex === 2">
                <FormField v-slot="{ componentField }" name="password">
                  <FormItem>
                    <FormLabel>{{ $t('sign-up:password') }}</FormLabel>
                    <FormControl>
                      <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="confirmPassword">
                  <FormItem>
                    <FormLabel>{{ $t('sign-up:confirm-password') }}</FormLabel>
                    <FormControl>
                      <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <Button type="submit" class="w-full">
                  {{ $t('sign-up:cta') }}
                </Button>

                <p
                  class="px-8 text-center text-sm text-muted-foreground"
                  v-html="$t('sign-up:cta-acknowledgement', signUpAcknowledgementMap)"
                />
              </template>
            </div>
          </form>
        </Stepper>
      </Form>

      <Separator class="mt-2" :label="$t('sign-up:has-account')" orientation="horizontal" />
      <Button variant="link">
        <RouterLink to="/sign-in">
          {{ $t('sign-up:sign-in') }}
        </RouterLink>
      </Button>
    </div>
  </div>
</template>
