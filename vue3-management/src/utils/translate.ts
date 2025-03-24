import i18n from 'i18next'
import enUS from '@/locales/en_US'
import zhCN from '@/locales/zh_CN'
import { defaultSetting } from '@/defaultSetting'
i18n.init({
  resources: {
    en: {
      translation: enUS
    },
    zh: {
      translation: zhCN
    }
  },
  lng: defaultSetting.defaultLang || 'zh',
  fallbackLng: defaultSetting.defaultLang || 'zh',
  interpolation: {
    escapeValue: false
  }
})
export const t = (key: string | undefined | unknown) => {
  if (key && typeof key == 'string') return i18n.t(key) || key
}
export { i18n }
