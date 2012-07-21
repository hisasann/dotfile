colorscheme molokai

" http://d.hatena.ne.jp/ruicc/20080202/1201971501
if has('multi_byte_ime') || has('xim')
    highlight CursorIM guibg=DarkCyan guifg=NONE
endif

if has('gui_macvim')
    set transparency=3
    set guifont=Menlo:h12
    set guioptions-=T
endif

set textwidth=1000
set columns=160
set lines=155
set wrap  			" 長い行を折り返して表示 (nowrap:折り返さない)
set visualbell		" Beep音を消す

"特殊文字(SpecialKey)の見える化。listcharsはlcsでも設定可能。
"trailは行末スペース。
set list
set listchars=tab:>-,trail:-,nbsp:%,extends:>,precedes:<

" 全角スペースを視覚化
highlight ZenkakuSpace cterm=underline ctermfg=lightblue guibg=#666666
au BufNewFile,BufRead * match ZenkakuSpace /　/

