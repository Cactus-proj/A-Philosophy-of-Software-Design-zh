import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "《软件设计的哲学》中文版",
  // meta 标签 <= 80 中文字符
  description: "软件设计的哲学 约翰·奥斯特豪特"
  + "; A Philosophy of Software Design 中文翻译"
  + "; 軟件設計的哲學 (第2版) 約翰·奧斯特豪特"
  ,
  lang: 'zh-CN',
  base: '/A-Philosophy-of-Software-Design-zh/',

  lastUpdated: true,
  // https://vitepress.dev/zh/guide/sitemap-generation#options
  sitemap: {
    hostname: 'https://cactus-proj.github.io/A-Philosophy-of-Software-Design-zh/'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '章节正文', link: '/ch01' },
      { text: '全书总结', link: '/summary' },
    ],

    sidebar: [
      {
        text: '目录',
        items: [
          { text: '前言', link: '/preface' },
          { text: '第 1 章 介绍', link: '/ch01' },
          { text: '第 2 章 复杂性的本质', link: '/ch02' },
          { text: '第 3 章 工作代码是不够的', link: '/ch03' },
          { text: '第 4 章 模块应该是深的', link: '/ch04' },
          { text: '第 5 章 信息隐藏(和泄漏)', link: '/ch05' },
          { text: '第 6 章 通用模块更深入', link: '/ch06' },
          { text: '第 7 章 不同的层，不同的抽象', link: '/ch07' },
          { text: '第 8 章 降低复杂性', link: '/ch08' },
          { text: '第 9 章 在一起更好还是分开更好？', link: '/ch09' },
          { text: '第 10 章 定义不存在的错误', link: '/ch10' },
          { text: '第 11 章 设计它两次', link: '/ch11' },
          { text: '第 12 章 为什么要写注释呢？有四个理由', link: '/ch12' },
          { text: '第 13 章 注释应该描述代码中不明显的内容', link: '/ch13' },
          { text: '第 14 章 选择的名字', link: '/ch14' },
          { text: '第 15 章 先写注释', link: '/ch15' },
          { text: '第 16 章 修改现有的代码', link: '/ch16' },
          { text: '第 17 章 一致性', link: '/ch17' },
          { text: '第 18 章 代码应该是显而易见的', link: '/ch18' },
          { text: '第 19 章 软件发展趋势', link: '/ch19' },
          { text: '第 20 章 设计性能', link: '/ch20' },
          { text: '第 21 章 结论', link: '/ch21' },
          { text: '总结', link: '/summary' },
        ]
      }
    ],

    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Cactus-proj/A-Philosophy-of-Software-Design-zh' }
    ],

    editLink: {
      pattern: 'https://github.com/Cactus-proj/A-Philosophy-of-Software-Design-zh/edit/main/docs/:path'
    },
  }
})
