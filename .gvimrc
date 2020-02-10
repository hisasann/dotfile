" colorscheme
syntax on
set background=dark
colorscheme dracula

" http://d.hatena.ne.jp/ruicc/20080202/1201971501
if has('multi_byte_ime') || has('xim')
    highlight CursorIM guibg=DarkCyan guifg=NONE
endif

if has('gui_macvim')
  set transparency=10
  "set guifont=Ricty\ Regular\ for\ Powerline:h13
  set guifont=Source\ Code\ Pro\ for\ Powerline:h13
  set guioptions-=T
endif

set textwidth=1000
set columns=800
set lines=300
set wrap            " 長い行を折り返して表示 (nowrap:折り返さない)
set visualbell t_vb=  " Beep音を消して、さらに画面のフラッシュもしない

"特殊文字(SpecialKey)の見える化。listcharsはlcsでも設定可能。
"trailは行末スペース。
set list
set listchars=tab:>-,trail:-,nbsp:%,extends:>,precedes:<

" 全角スペースを視覚化
" highlight ZenkakuSpace cterm=underline ctermfg=lightblue guibg=#666666
" au BufNewFile,BufRead * match ZenkakuSpace /　/

" <F2>, <F3> で background を切り替える - gVim のみ
nnoremap <Leader>bl :<C-u>set bg=light<Return>
nnoremap <Leader>bd :<C-u>set bg=dark<Return>
