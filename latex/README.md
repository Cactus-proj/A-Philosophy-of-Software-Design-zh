LaTeX 版
========

> 先切换到 `latex/` 文件夹内，再执行脚本
> 请使用 python3
> `pip install mistune==2.0.0a2`
> `cd latex`
> `python convert2latex.py`
> 安装对应平台的 texlive 最新版
> 使用 VSCode 的 LaTeX Workshop 插件编译，手工编译请自行解决出现的问题
> `latexmk -synctex=1 -interaction=nonstopmode -file-line-error -pdf APoSD-zh.tex`

+ `chaps` 文件夹内的东西均根据 `*.md` 文件自动生成。
+ `convert2latex.py` 此脚本将 `.md` 文件转化为 `.tex` 文件
+ `APoSD-zh.tex` 主 LaTeX 文件，编译即可得到 PDF。
    - 建议使用 `latexmk` 编译
    - 使用的宏包见导言区。目前尚未插入文中的图片，如有可能将重绘图片。
