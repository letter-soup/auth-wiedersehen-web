<script setup lang="ts">
import { Select, SelectItem } from '@/components/ui/select'
import { useI18n } from 'vue-i18n'

const { locale: selectedLocale, availableLocales } = useI18n()
</script>

<template>
  <Select>
    <SelectItem v-for="locale in availableLocales" :key="locale" :value="locale"></SelectItem>
  </Select>
</template>

<style scoped>

</style>