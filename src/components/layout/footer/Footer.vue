<script setup lang="ts">
import { SOCIAL_MEDIA } from '@/components/layout/footer/constants'
import { Separator } from '@/components/ui/separator'
import LanguageSwitcher from '@/components/primitives/language-switcher/LanguageSwitcher.vue'
</script>

<template>
  <footer class="grid grid-cols-12 gap-2 pb-4">
    <div
      class="col-start-3 col-span-8 lg:col-start-4 lg:col-span-6 max-sm:col-start-2 max-sm:col-span-10"
    >
      <div class="grid gap-6 grid-cols-3">
        <div class="flex justify-center">
          <div class="w-fit">
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
        </div>
        <div class="flex justify-center">
          <div class="w-fit">
            <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {{ $t('footer:follow-us') }}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li v-for="socialMedia in SOCIAL_MEDIA" :key="socialMedia.key">
                <a :href="socialMedia.url" target="_blank" class="hover:underline">
                  {{ $t(`social-media:${socialMedia.key}`) }}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="w-fit">
            <h2 class="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              {{ $t('footer:legal') }}
            </h2>
            <ul class="text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <a href="/terms" target="_blank" class="hover:underline">
                  {{ $t('footer:terms-of-service') }}
                </a>
              </li>
              <li>
                <a href="/privacy" target="_blank" class="hover:underline">
                  {{ $t('footer:privacy-policy') }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" class="my-5" />
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025 <RouterLink to="/" class="hover:underline">Auth Wiedersehen™</RouterLink>.
          {{ $t('footer:all-rights-reserved') }}
        </span>
        <LanguageSwitcher />
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
