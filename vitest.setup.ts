import { config } from '@vue/test-utils'
import { i18n } from './src/lib/locale'

config.global.plugins = [i18n]
