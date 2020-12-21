# A-Philosophy-of-Software-Design-zh

《软件设计的哲学》中文翻译

在线阅读：[http://gdut_yy.gitee.io/doc-aposd/](http://gdut_yy.gitee.io/doc-aposd/)

<div style="inline">
  <img src="./docs/cover.jpeg" width="210px" height="280px" />
</div>

## 前言

斯坦福教授、Tcl 语言发明者 John Ousterhout 的著作《A Philosophy of Software Design》，自出版以来，好评如潮。按照 IT 图书出版的惯例，如果冠名为“实践”，书中内容关注的是某项技术的细节和技巧；冠名为“艺术”，内容可能是记录一件优秀作品的设计过程和经验；而冠名为“哲学”，则是一些通用的原则和方法论，这些原则方法论串起来，能够形成一个体系。正如”知行合一”、“世界是由原子构成的”、“我思故我在”，这些耳熟能详的句子能够一定程度上代表背后的人物和思想。用一句话概括《A Philosophy of Software Design》，软件设计的核心在于降低复杂性。

## 目录

- [前言](docs/preface.md)
- [第 1 章 介绍](docs/ch1.md)
- [第 2 章 复杂性的本质](docs/ch2.md)
- [第 3 章 工作代码是不够的](docs/ch3.md)
- [第 4 章 模块应该是深的](docs/ch4.md)
- [第 5 章 信息隐藏(和泄漏)](docs/ch5.md)
- [第 6 章 通用模块更深入](docs/ch6.md)
- [第 7 章 不同的层，不同的抽象](docs/ch7.md)
- [第 8 章 降低复杂性](docs/ch8.md)
- [第 9 章 在一起更好还是分开更好？](docs/ch9.md)
- [第 10 章 定义不存在的错误](docs/ch10.md)
- [第 11 章 设计它两次](docs/ch11.md)
- [第 12 章 为什么写评论呢？四个理由](docs/ch12.md)
- [第 13 章 注释应该描述代码中不明显的内容](docs/ch13.md)
- [第 14 章 选择的名字](docs/ch14.md)
- [第 15 章 先写评论](docs/ch15.md)
- [第 16 章 修改现有的代码](docs/ch16.md)
- [第 17 章 一致性](docs/ch17.md)
- [第 18 章 代码应该是显而易见的](docs/ch18.md)
- [第 19 章 软件发展趋势](docs/ch19.md)
- [第 20 章 设计性能](docs/ch20.md)
- [第 21 章 结论](docs/ch21.md)
- [总结](docs/summary.md)

## 本地开发 & 阅读

本项目基于 vuepress 进行开发，以提供比 github mardown 更佳的阅读体验

依赖于 `node.js`、`yarn`、`vuepress` 等环境

```sh
# vuepress
yarn global add vuepress

# 本地开发
git clone https://github.com/gdut-yy/A-Philosophy-of-Software-Design-zh.git
cd A-Philosophy-of-Software-Design-zh/
yarn docs:dev
```

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://gdut-yy.github.io/"><img src="https://avatars2.githubusercontent.com/u/33390928?s=460&v=4" width="100px;" /><br /><sub><b>gdut-yy</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/inkydragon"><img src="https://avatars1.githubusercontent.com/u/5158738?s=460&u=b9cbd51a3d1bbff1df994214e50058b9b3a9715a&v=4" width="100px;" /><br /><sub><b>inkydragon</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/chenpy228"><img src="https://avatars2.githubusercontent.com/u/5305370?s=460&v=4" width="100px;" /><br /><sub><b>chenpy228</b></sub></a><br /></td>    
    <td align="center"><a href="https://github.com/wuwenzhao"><img src="https://avatars0.githubusercontent.com/u/4035972?s=400&v=4" width="100px;" /><br /><sub><b>wuwenzhao</b></sub></a><br /></td>    
    <td align="center"><a href="https://github.com/BlackGlory"><img src="https://avatars3.githubusercontent.com/u/1365962?s=400&u=5a810f678ad49f010670436cca78fd0c5dc1863b&v=4" width="100px;" /><br /><sub><b>BlackGlory</b></sub></a><br /></td>    
    <td align="center"><a href="https://github.com/xulongfei"><img src="https://avatars3.githubusercontent.com/u/9260697?s=400&u=134db0399963d2a7741db02c837282a93b6b1b40&v=4" width="100px;" /><br /><sub><b>xulongfei</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/inkinworld"><img src="https://avatars1.githubusercontent.com/u/12553724?s=400&u=828ff5f286d697fe3235c6198b0aee2b0dfc5151&v=4" width="100px;" /><br /><sub><b>inkinworld</b></sub></a><br /></td>
  </tr>
    <tr>
    <td align="center"><a href="https://github.com/wangzhongliang"><img src="https://avatars1.githubusercontent.com/u/17668601?s=400&u=b796a585d9aa3577bf78033f5ae689c461ae7a02&v=4" width="100px;" /><br /><sub><b>wangzhongliang</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/fanjiangqi"><img src="https://avatars0.githubusercontent.com/u/19711488?s=400&u=37821dd702ab00848cb3a7cbca9235863f8deeb1&v=4" width="100px;" /><br /><sub><b>fanjiangqi</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/AllenKaiChen"><img src="https://avatars3.githubusercontent.com/u/49896664?s=400&u=21a54e715cbdfe854c8d6cb51bb91b7aae0f270f&v=4" width="100px;" /><br /><sub><b>AllenKaiChen</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/liquid207"><img src="https://avatars3.githubusercontent.com/u/48850370?s=400&v=4" width="100px;" /><br /><sub><b>liquid207</b></sub></a><br /></td>
  </tr>
</table>

## 更多书籍

[https://github.com/xx-zh/xx-zh-roadmap](https://github.com/xx-zh/xx-zh-roadmap)

## License

[MIT](./LICENSE)
