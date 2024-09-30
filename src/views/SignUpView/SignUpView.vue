<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { computed, type ComputedRef, h, ref } from 'vue'
import { Stepper, StepperItem, StepperTrigger } from '@/components/ui/stepper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toast'
import { formSchema, signUpSteps } from '@/views/SignUpView/constants'

const stepIndex = ref(1)
const stepDescription: ComputedRef<string> = computed(() => signUpSteps[stepIndex.value - 1].description)

function onSubmit(e: Event, meta:any, validate: () => void, values: any) {
  e.preventDefault()
  validate()

  if (stepIndex.value === signUpSteps.length && meta.valid) {
    toast({
      title: 'You submitted the following values:',
      description: h(
        'pre',
        { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
        h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
      )
    })
  }
}
</script>

<template>
  <div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
    <div class="flex items-center justify-center py-12">
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
          v-slot="{ meta, values, validate }"
          as=""
          keep-values
          :validation-schema="toTypedSchema(formSchema[stepIndex - 1])"
        >
          <Stepper
            v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
            v-model="stepIndex"
            class="block w-full"
          >
            <form @submit="(e) => onSubmit(e, meta, validate, values)">
              <div class="flex w-full flex-start gap-2">
                <StepperItem v-for="step in signUpSteps" :key="step.step" class="hidden" :step="step.step">
                  <StepperTrigger as-child>
                    <div />
                  </StepperTrigger>
                </StepperItem>
              </div>

              <div class="flex flex-col gap-4">
                <template v-if="stepIndex === 1">
                  <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </template>

                <template v-if="stepIndex === 2">
                  <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>

                  <FormField v-slot="{ componentField }" name="confirmPassword">
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                </template>

                <Button
                  v-if="!isNextDisabled"
                  class="w-full"
                  @click="meta.valid && nextStep()"
                  type="button"
                >
                  {{ $t('sign-up:step:cta') }}
                </Button>

                <Button v-if="isNextDisabled" type="submit" class="w-full">
                  {{ $t('sign-up:cta') }}
                </Button>
              </div>
            </form>
          </Stepper>
        </Form>
        <div class="mt-4 text-center text-sm">
          {{ $t('sign-up:has-account') }}
          <a href="/sign-in" class="underline">
            {{ $t('sign-up:sign-in') }}
          </a>
        </div>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <img
        src="https://cdn.pixabay.com/photo/2024/06/01/12/28/monday-8802107_1280.jpg"
        alt="image"
        class="h-dvh w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  </div>
</template>
