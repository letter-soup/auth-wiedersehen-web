<script setup lang="ts">
import { SOCIAL_MEDIA } from '@/components/layout/footer/constants'
import { Separator } from '@/components/ui/separator'
import { Shield } from 'lucide-vue-next'
</script>

<template>
  <footer class="w-full pb-4 px-8">
    <div class="mx-auto max-w-screen-xl lg:w-4/5 md:w-5/6">
      <div class="grid gap-6 grid-cols-3">
        <div>
          <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            {{ $t('footer:resources') }}
          </h2>
          <ul class="text-gray-600 dark:text-gray-400 space-y-2">
            <li>
              <a
                class="hover:underline"
                target="_blank"
                href="https://github.com/letter-soup/auth-wiedersehen-web"
              >
                {{ $t('footer:documentation') }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            {{ $t('footer:follow-us') }}
          </h2>
          <ul class="text-gray-600 dark:text-gray-400 space-y-2">
            <li v-for="socialMedia in SOCIAL_MEDIA" :key="socialMedia.key">
              <a :href="socialMedia.url" class="hover:underline">
                {{ $t(`social-media:${socialMedia.key}`) }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            {{ $t('footer:legal') }}
          </h2>
          <ul class="text-gray-600 dark:text-gray-400 space-y-2">
            <li>
              <a href="/terms" class="hover:underline">{{ $t('shared:terms-of-service') }}</a>
            </li>
            <li>
              <a href="/privacy" class="hover:underline">{{ $t('shared:privacy-policy') }}</a>
            </li>
          </ul>
        </div>
      </div>
      <Separator orientation="horizontal" class="my-5" />
      <div class="flex justify-between items-center">
        <RouterLink to="/" class="flex items-center">
          <Shield class="mr-2" alt="Auth Wiedersehen Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Auth Wiedersehen
            </span>
        </RouterLink>
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 <a href="/" class="hover:underline">Auth Wiedersehen™</a>.
          {{ $t('footer:all-rights-reserved') }}
        </span>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
