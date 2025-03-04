<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/toast'
import Footer from '@/components/layout/footer/Footer.vue'
</script>

<template>
  <RouterView />
  <Toaster />
  <Footer />
</template>

<style scoped></style>
