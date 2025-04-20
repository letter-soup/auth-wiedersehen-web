import { onMounted, onUnmounted } from 'vue'

export function useRouterGuard(guard: () => () => void) {
  let removeRouterGuard: () => void
  onMounted(() => {
    removeRouterGuard = guard()
  })
  onUnmounted(() => {
    if (removeRouterGuard) {
      removeRouterGuard()
    }
  })
}
