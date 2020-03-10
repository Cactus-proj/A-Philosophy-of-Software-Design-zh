LaTeX 版
========

> 先切换到 `latex/` 文件夹内，再执行脚本

+ `chaps` 文件夹内的东西均根据 `*.md` 文件自动生成。
+ `convert2latex.py` 此脚本将 `.md` 文件转化为 `.tex` 文件
+ `APoSD-zh.tex` 主 LaTeX 文件，编译他即可得到 PDF。
    建议使用 `latexmk` 编译
    使用的宏包见导言区。目前尚未插入文中的图片。
+ 如果要尝试本地编译，请使用最新版 texlive + VScode(LaTeX Workshop 插件)