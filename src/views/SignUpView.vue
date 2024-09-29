<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpHandler = () => {
  console.log('debug:SignInView.vue:signUpHandler; ')
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
            {{ $t('sign-up:description') }}
          </p>
        </div>
        <div class="grid gap-4">
          <form>
            <div class="grid gap-2">
              <Label for="email">{{ $t('sign-up:email') }}</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">{{ $t('sign-up:password') }}</Label>
                <a href="/reset-password" class="ml-auto inline-block text-sm underline">
                  {{ $t('sign-up:password-reset') }}
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" class="w-full" @click="signUpHandler">
              {{ $t('sign-up:cta') }}
            </Button>
          </form>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ $t('sign-up:no-account') }}
          <a href="/sign-up" class="underline">
            {{ $t('sign-up:sign-up') }}
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
