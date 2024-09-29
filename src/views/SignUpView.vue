<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toggle } from '@/components/ui/toggle'
import { ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { computed, type ComputedRef, ref, type Ref } from 'vue'

const { currentRoute, back, push } = useRouter();
type SignUpStep = 'email' | 'password' | 'tos'

const currentStep: Ref<SignUpStep> = ref('email')

const canGoBack: ComputedRef<boolean> = computed(() => currentStep.value !== 'email')

function validateEmail(scrollNext: () => void, next: SignUpStep): void {
  currentStep.value = next
  scrollNext()
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
            <Carousel
              v-slot="{ scrollNext, scrollPrev }"
              class="relative w-full max-w-xs"
              :opts="{ watchDrag: false, duration: 0 }"
            >
              <Toggle v-if="canGoBack" @click="scrollPrev">
                <ArrowLeft class="h-4 w-4" />
              </Toggle>
              <CarouselContent>
                <CarouselItem>
                  <div class="grid gap-2">
                    <Label for="email">{{ $t('sign-up:email') }}</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                    <Button @click="validateEmail(scrollNext)"> Next </Button>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="grid gap-2">
                    <Label for="password">{{ $t('sign-up:password') }}</Label>
                    <Input id="password" type="password" required />
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </form>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ $t('sign-up:has-account') }}
          <a href="/sign-up" class="underline">
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
