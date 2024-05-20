import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

// https://v2.vuepress.vuejs.org/zh/reference/config.html
export default defineUserConfig({
  bundler: viteBundler(),

  base: "/A-Philosophy-of-Software-Design-zh/",
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "《软件设计的哲学》",
      description: '《软件设计的哲学》中文翻译',
    },
  },

  // https://v2.vuepress.vuejs.org/zh/guide/theme.html
  // https://ecosystem.vuejs.press/zh/themes/default/config.html
  theme: defaultTheme({
    locales: {
      '/': { // zh-CN
        // 该语言在下拉菜单中的标签
        selectLanguageName: '简体中文',
        // 多语言下拉菜单的标题
        selectLanguageText: '选择语言',
        selectLanguageAriaselectLanguageName: '选择语言',
        editLink: true,
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
      },
    },
  
    repo: "Cactus-proj/A-Philosophy-of-Software-Design-zh",
    docsRepo: "Cactus-proj/A-Philosophy-of-Software-Design-zh",
    docsBranch: "main",
    docsDir: "docs",
    contributors: false,
  
    sidebarDepth: 2,
    sidebar: 'auto',
  }),

})
