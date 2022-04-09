// https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html
module.exports = {
  base: "/A-Philosophy-of-Software-Design-zh/",
  locales: {
    '/': {
      lang: 'zh-CN',
      title: "《软件设计的哲学》中文翻译",
    },
    '/en/': {
      lang: 'en-US',
      title: '<A Philosophy of Software Design> Chinese Translation',
    }
  },
  themeConfig: {
    repo: "Cactus-proj/A-Philosophy-of-Software-Design-zh",
    repoLabel: "Github",
    docsRepo: "Cactus-proj/A-Philosophy-of-Software-Design-zh",
    docsBranch: "main/docs",
    editLinks: true,
    sidebarDepth: 2,
    nav: [],
    sidebar: {
      "/": [
        "",
        "preface.md",
        "ch01.md",
        "ch02.md",
        "ch03.md",
        "ch04.md",
        "ch05.md",
        "ch06.md",
        "ch07.md",
        "ch08.md",
        "ch09.md",
        "ch10.md",
        "ch11.md",
        "ch12.md",
        "ch13.md",
        "ch14.md",
        "ch15.md",
        "ch16.md",
        "ch17.md",
        "ch18.md",
        "ch19.md",
        "ch20.md",
        "ch21.md",
        "summary.md"
      ]
    },
    locales: {
      '/': { // zh-CN
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
      },
      '/en/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinks: false,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
      }
    }
  }
};
