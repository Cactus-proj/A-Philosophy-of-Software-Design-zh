import mistune
import re
import os
import time

ROOT_MD_DIR  = '../docs/'
ROOT_IMG_DIR = ROOT_MD_DIR + 'figures/'

ROOT_TEX_DIR = './chaps/'


# LaTeXRenderer
class LaTeXRenderer(mistune.HTMLRenderer):
    NAME = 'latex'
    IS_TREE = False

    def __init__(self, is_book_or_report=True):
        self._is_book_or_report = is_book_or_report
        # latex 对特殊字符的转义
        self._ltx_esc_dict = {
            '~': r'\textasciitilde{}',

            '#': '\#',
            '$': '\$',
            '%': '\%',
            '^': '\^{}',
            '&': '\&',

            '-': '{-}',
            '_': '\_',

            '{': '\{',
            '}': '\}',
            '[': '{[}',
            ']': '{]}',
            
            '\\': r'\textbackslash{}',
        }
        # listing 宏包支持的语言
        self._ltx_lang_dict = {
            'c':    'C',
            'sh':   'sh',
            'cpp':  'C++',
            'c++':  'C++',
            'java': 'Java',
            'go':   'C',  # TODO: def highlight for go
        }
        # 图片对应的列表
        self._ltx_img_dict = {
            
        }

    # 转义 text 中的特殊字符
    def escape_latex(self, text):
        if re.search(r"[~#$%^&-_{}\[\]\\]+", text):
            return ''.join(self._ltx_esc_dict.get(c, c) for c in text)
        else:
            return text

    # 处理英文段落
    def english(self, text):
        return ''

    # def english_list_item(self, text, level):
    #     return ''

    # 所有文本的处理函数
    def text(self, text):
        return self.escape_latex(text)
    
    def link(self, link, text=None, title=None):
        # 不支持 title
        return ' \\href{'+link+'}' + '{'+(text or link)+'} '

    def image(self, src, alt="", title=None):
        s = '<img src="' + src + '" alt="' + alt + '"'
        if title:
            s += ' title="' + escape_html(title) + '"'
        return s + ' />'

    def emphasis(self, text):
        return ' \\emph{ ' + text + ' } '

    def strong(self, text):
        return ' \\textbf{ ' + text + ' } '
    
    def codespan(self, text):
        return ' \\texttt{ ' + text + ' } '
    
    def linebreak(self):
        return ' \\\\ ' # '\\'

    def paragraph(self, text):
        return text + '\n'

    # 各级标题
    def heading(self, text, level):
        lvdict = {
            1: 'chapter', # only def in book or report
            2: 'section',
            3: 'subsection',
            4: 'subsubsection',
        }
        if 1==level:
            ## text = '第 1 章 XXX'
            text = re.sub(r"(第 [0-9]+ 章 )", '', text)
        else: 
            ## text = '2.5 Conclusion 结论'
            ## 删除标题中的英文
            # s = re.sub(r"(\d+\.\d+ [a-zA-Z: ?/-]+)", '', s)
            ## 仅删除编号
            text = re.sub(r"(\d+\.\d+ )", '', text)
        
        tag = lvdict[level]
        return '\n\\' + tag + '{' + text + '}\n'

    def newline(self):
        return '\n'

    def thematic_break(self):
        return '\n\n'  # '<hr />\n'

    def block_text(self, text):
        return text
    
    def block_code(self, code, info=None):
        html = '\\begin{lstlisting}'
        if info:
            lang = info.strip().split(None, 1)[0]
            html += '[language=' + self._ltx_lang_dict[lang] + ']'
        return html + '\n' + code + '\\end{lstlisting}\n'
    
    def block_quote(self, text):
        if ('Chapter' in text) or ('Preface' in text):
            # 英文标题 '> Chapter ?'
            return ''
        else:
            # 中文翻译
            return text

    # 列表
    def list(self, text, ordered, level, start=None):
        if ordered:
            return '\\begin{enumerate}\n' + text + '\\end{enumerate}\n'
        else:
            return '\\begin{itemize}\n' + text + '\\end{itemize}\n'

    def list_item(self, text, level):
        return '\item ' + text + '\n'

# LaTeXRenderer end

# hook func
def remove_english(self, tokens, state):
    # 删除所有英文节点
    # print(tokens)
    for tok in tokens:
        if 'paragraph' == tok['type']:  # 顶层的段落
            # 变为换行
            tok['type'] = 'english'
        # if 'list_item' == tok['type']:  # 顶层的列表
        #     tok['type'] = 'english_list_item'
    return tokens


# main 
for mdfile in os.listdir(ROOT_MD_DIR):
    fname, ext = os.path.splitext(mdfile)
    # 跳过非 markdown 文件 和 README.md
    if ('.md' != ext) or ('README'==fname):
        continue
    else:
        print("[md2tex] Converting {}".format(mdfile))

    md_fname    = ROOT_MD_DIR  + fname + '.md'
    latex_fname = ROOT_TEX_DIR + fname + '.tex'

    with open(md_fname, 'r', encoding="utf-8") as fmd:
        with open(latex_fname, 'w') as ftex:
            markdown = mistune.create_markdown(renderer=LaTeXRenderer())
            markdown.before_render_hooks = [remove_english]
            ftex.writelines([
                "% 本文件由 'convert2latex.py' 脚本自动生成\n",
                "% 内容有问题请修改脚本。\n",
                "% 文件生成时间：",
                time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()), '\n',
            ])
            ftex.write(markdown(fmd.read()))
