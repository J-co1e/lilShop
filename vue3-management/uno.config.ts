import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
export default defineConfig({
  rules: [
    ['m-0-a', { margin: '0 auto' }],
    ['bg-light-mask', { 'background-color': 'rgba(0,0,0,0.2)' }],
    ['bg-dark-mask', { 'background-color': 'rgba(255,255,255,0.15)' }],
    [/^fs-(.+)$/, ([, fontSize]) => ({ 'font-size': `${fontSize}px` })],
    [
      /^bg-img-(\w+)-(\w+)-(png|jpg|gif)$/,
      ([, dir, name, format]) => ({ 'background-image': `url(@/assets/${dir}/${name}.${format})` })
    ]
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()], // 合并前缀
  shortcuts: {
    fl: 'flex',
    flc: 'flex-col flex',
    vc: 'items-center',
    bt: 'justify-between',
    hv: 'justify-center items-center'
  },
  theme: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    backgroundColor: {
      'black-bg': '#181818',
      'btn-bg-black': 'rgba(255,255,255,0.1)',
      'btn-bg-light': 'rgba(0,0,0,0.05)',
      'black-hover': 'rgba(255,255,255,0.18)'
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        lucide: () => import('@iconify-json/lucide/icons.json').then((i) => i.default),
        ic: () => import('@iconify-json/ic/icons.json').then((i) => i.default)
      }
    })
  ]
})
