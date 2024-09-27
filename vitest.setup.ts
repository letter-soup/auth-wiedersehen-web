import { config } from '@vue/test-utils'
import { i18n } from './src/utils/locale'

config.global.plugins = [i18n]
