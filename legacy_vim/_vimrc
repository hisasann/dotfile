"   __  __ _ _____ _________
"   \ \ | |_|     V  __/  __|
"    \ \| | | | | | |  | [__
" [_] \___|_|_|_|_|_|  \____|
"
"---------------------------------------------------------------------------
" bundle settings {{{
" Note: Skip initialization for vim-tiny or vim-small.
if 0 | endif

if has('vim_starting')
  if &compatible
    set nocompatible               " Be iMproved
  endif

  " Required:
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif

" Required:
call neobundle#begin(expand('~/.vim/bundle/'))

" Let NeoBundle manage NeoBundle
" Required:
NeoBundleFetch 'Shougo/neobundle.vim'

" YankRing.vim的なやつ
" キーマップを既存のを置き換えないのでよいよい
NeoBundle 'LeafCage/yankround.vim'

" neocomplcache
NeoBundle 'Shougo/neocomplcache'

" unite
NeoBundle 'Shougo/unite.vim'
NeoBundle 'tsukkee/unite-help'
NeoBundle 'h1mesuke/unite-outline'
NeoBundle 'Shougo/neomru.vim', { 'depends': [ 'Shougo/unite.vim' ] }
" via https://twitter.com/ShougoMatsu/status/433720402276143104
NeoBundle 't9md/vim-choosewin'

" vimfiler
" ドットファイルは、.を押せば表示される
NeoBundle 'Shougo/vimfiler.vim', { 'depends': [ 'Shougo/unite.vim' ] }

" via http://subtech.g.hatena.ne.jp/secondlife/20061222/1166778147
" d + s + 囲んでるもの
" ds'     (今カーソルのある文字列を囲んでいる ' を消す)
" ds"     (" を)
" ds(     (() を)
" dst     (<tag> を)
" c + s + 囲んでるもの, + 変更したいもの
" cs'"            (今囲んでいる ' を " に変える)
" cs"<tag>        (今囲んでいる " を <tag> に変える)
" cst<tag>        (直近で囲まれてるタグを <tag> に)
" h*oge                   →  "hoge"                    # ysiw"
" "↑ カーソル位置の単語を " で囲う
" { *:foo => 'bar' }      →  ( { :foo => 'bar' } )     # ysa{( or ysaBb
" "↑ カーソル位置の {} で囲まれた文字列を () で囲う
" he said, *i am a pen.   →  he said, "i am a pen."    # ys$"
" "↑ カーソル位置がら行末までを " で囲う
" yahho*oooo konnichiha-  →  'yahhooooo konnichiha-'   # yss'
" "↑ 行全体を ' で囲う。行指向操作。
" ySSt  カレント行をタグで囲い改行する
" インサートモードでC-G, s or S  閉じタグの自動補完
" hoge  S<div> <div>hoge</div> これがかなり便利
NeoBundle 'tpope/vim-surround'

" ZenCoding
" Ctrl+y, Ctrl+,
NeoBundle 'mattn/emmet-vim'

" JavaScript
" syntax
NeoBundle 'jelera/vim-javascript-syntax'
" indent
NeoBundle 'jiangmiao/simple-javascript-indenter'

NeoBundle 'tyru/caw.vim'

" レインボーサイクロン！
NeoBundle 'daisuzu/rainbowcyclone.vim'

" ステータスラインをカッコよくする
NeoBundle 'vim-airline/vim-airline'
NeoBundle 'vim-airline/vim-airline-themes'

" golang
NeoBundle 'fatih/vim-go'

call neobundle#end()

filetype plugin indent on     " required!

NeoBundleCheck

" Brief help
" :NeoBundleList          - list configured bundles
" :NeoBundleInstall(!)    - install(update) bundles
" :NeoBundleClean(!)      - confirm(or auto-approve) removal of unused bundles
" }}}

"---------------------------------------------------------------------------
" basic settings {{{
set nocompatible            " 必ず最初に書く（vi互換コードを解除）
set viminfo='20,<50,s10,h,! " YankRing用に!を追加
set shellslash              " Windowsでディレクトリパスの区切り文字に / を使えるようにする
set lazyredraw              " マクロなどを実行中は描画を中断
set number        " 行番号を非表示
set ruler        " ルーラーを表示 (noruler:非表示)
set cmdheight=2      " コマンドラインの高さ (Windows用gvim使用時はgvimrcを編集すること)
set laststatus=2    " 常にステータス行を表示 (詳細は:he laststatus)

" スクロールが遅い問題対策
" via http://kadoppe.com/archives/2013/09/vimrc-2.html
set lazyredraw
set ttyfast

" statusline {{{
  set statusline=%<     " 行が長すぎるときに切り詰める位置
  set statusline+=[%n]  " バッファ番号
  set statusline+=%m    " %m 修正フラグ
  set statusline+=%r    " %r 読み込み専用フラグ
  set statusline+=%h    " %h ヘルプバッファフラグ
  set statusline+=%w    " %w プレビューウィンドウフラグ
  set statusline+=%{'['.(&fenc!=''?&fenc:&enc).':'.&ff.']'}  " fencとffを表示
  set statusline+=%y    " バッファ内のファイルのタイプ
  set statusline+=\     " 空白スペース
if winwidth(0) >= 130
  set statusline+=%F    " バッファ内のファイルのフルパス
else
  set statusline+=%t    " ファイル名のみ
endif
  set statusline+=%=    " 左寄せ項目と右寄せ項目の区切り
  set statusline+=%{fugitive#statusline()}  " Gitのブランチ名を表示
  set statusline+=\ \   " 空白スペース2個
  set statusline+=%1l   " 何行目にカーソルがあるか
  set statusline+=/
  set statusline+=%L    " バッファ内の総行数
  set statusline+=,
  set statusline+=%c    " 何列目にカーソルがあるか
  set statusline+=%V    " 画面上の何列目にカーソルがあるか
  set statusline+=\ \   " 空白スペース2個
  set statusline+=%P    " ファイル内の何％の位置にあるか
" }}}

" set title
set title titlestring=%t%(\ %M%)%(\ (%{expand(\"%:~:.:h\")})%)%(\ %a%)
set linespace=0
set showcmd        " コマンドをステータス行に表
if has("win32") || has("win64")
  " sjisはWindows用
  set encoding=sjis
else
  set encoding=utf-8
endif

" 折りたたみ関連
set nofoldenable
set foldmethod=indent
set foldopen=all  " fold内に移動すれば自動で開く
" set foldclose=all  " fold外に移動しfoldlevelより深ければ閉じる
set foldlevel=1   " 折りたたみの具合
set foldnestmax=2  " 最大折りたたみ深度$
set foldcolumn=2  " 左側に折りたたみガイド表示$

" ウィンドウを移動するタイミングで再読み込み
" via http://vim-users.jp/2011/03/hack206/
augroup vimrc-checktime
  autocmd!
  autocmd WinEnter * checktime
augroup END

augroup BufferAu
  autocmd!
  "カレントディレクトリを自動的に移動
  autocmd BufNewFile,BufRead,BufEnter * if isdirectory(expand("%:p:h")) && bufname("%") !~ "NERD_tree" | cd %:p:h | endif
augroup END
" }}}

"---------------------------------------------------------------------------
" command settings {{{
set wildmenu           " コマンド補完を強化
set wildmode=list:full " リスト表示，最長マッチ
set tags=~/.tags,tags
" }}}

"---------------------------------------------------------------------------
" search settings {{{
set ignorecase  " 大文字小文字無視
set smartcase  " 大文字ではじめたら大文字小文字無視しない
set wrapscan  " 最後まで検索したら先頭へ戻る
"set nowrapscan  " 検索をファイルの先頭へループしない
set hlsearch  " 検索文字をハイライト
set incsearch  " インクリメンタルサーチ
" }}}

"---------------------------------------------------------------------------
" tab settings {{{
set autoindent
set cindent    " C言語的なインデント
set expandtab    " タブを空白文字に展開
set tabstop=2   " タブ文字の幅を設定できます。デフォルトは8です。
set softtabstop=2   " タブ文字を入力した際にタブ文字の代わりに挿入されるホワイトスペースの量を設定します。
set shiftwidth=2    " >> 等のコマンドや自動インデントの際に使う1レベル分のインデント量を設定します。
set shiftround
set smarttab
set nowrap

if has("autocmd")
  "ファイルタイプの検索を有効にする
  filetype plugin on
  "そのファイルタイプにあわせたインデントを利用する
  filetype indent on
  " これらのftではインデントを無効に
  "autocmd FileType php filetype indent off

  autocmd FileType markdown   setlocal sw=4 sts=4 ts=4 et
  autocmd FileType apache     setlocal sw=4 sts=4 ts=4 et
  autocmd FileType aspvbs     setlocal sw=4 sts=4 ts=4 et
  autocmd FileType c          setlocal sw=4 sts=4 ts=4 et
  autocmd FileType cpp        setlocal sw=4 sts=4 ts=4 et
  autocmd FileType cs         setlocal sw=4 sts=4 ts=4 et
  autocmd FileType css        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType diff       setlocal sw=4 sts=4 ts=4 et
  autocmd FileType go         setlocal sw=2 sts=2 ts=2 et
  autocmd FileType eruby      setlocal sw=4 sts=4 ts=4 et
  autocmd FileType html       setlocal sw=2 sts=2 ts=2 et
  autocmd FileType java       setlocal sw=4 sts=4 ts=4 et
  autocmd FileType javascript setlocal sw=2 sts=2 ts=2 et
  autocmd FileType perl       setlocal sw=4 sts=4 ts=4 et
  autocmd FileType php        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType python     setlocal sw=4 sts=4 ts=4 et
  autocmd FileType ruby       setlocal sw=2 sts=2 ts=2 et
  autocmd FileType haml       setlocal sw=2 sts=2 ts=2 et
  autocmd FileType sh         setlocal sw=4 sts=4 ts=4 et
  autocmd FileType sql        setlocal sw=4 sts=4 ts=4 et
  autocmd FileType vb         setlocal sw=4 sts=4 ts=4 et
  autocmd FileType vim        setlocal sw=2 sts=2 ts=2 et
  autocmd FileType wsh        setlocal sw=4 sts=4 ts=4 et
  autocmd FileType xhtml      setlocal sw=4 sts=4 ts=4 et
  autocmd FileType xml        setlocal sw=4 sts=4 ts=4 et
  autocmd FileType yaml       setlocal sw=2 sts=2 ts=2 et
  autocmd FileType zsh        setlocal sw=4 sts=4 ts=4 et
  autocmd FileType scala      setlocal sw=2 sts=2 ts=2 et
  autocmd FileType snippet    setlocal sw=4 sts=4 ts=4 et
endif

" 保存時にtabをスペースに変換する
autocmd BufWritePre * :%s/\t/  /ge
" }}}

"---------------------------------------------------------------------------
" backup settings {{{
set backup
set backupdir=~/vim_backup
set swapfile
set directory=~/vim_swap
"set nobackup   " バックアップ取らない
"set autoread   " 他で書き換えられたら自動で読み直す
"set noswapfile " スワップファイル作らない
"set hidden     " 編集中でも他のファイルを開けるようにする
" }}}

"---------------------------------------------------------------------------
" color settings {{{
" syntax color
syntax on
highlight LineNr ctermfg=darkgrey
" }}}

"---------------------------------------------------------------------------
" move settings {{{
" deleteボタンが遠いんだ！
nmap <C-H> <BS>

" 0, 9で行頭、行末へ
nmap 1 ^
nmap 9 $
noremap <Space>h  ^
noremap <Space>l  $
" }}}

"---------------------------------------------------------------------------
" insert mode settings {{{
" 挿入モードからコマンドモードに戻るキーバインド
imap <C-j> <esc>
" insert mode でjjでesc
inoremap jj <Esc>
" }}}

"---------------------------------------------------------------------------
" edit settings {{{
set showmatch      " 括弧の対応をハイライト
set backspace=indent,eol,start
set clipboard=unnamed
set pastetoggle=<F12>
" set guioptions+=a

" insertモードを抜けるとIMEオフ
set noimdisable
set iminsert=0 imsearch=0
set noimcmdline
inoremap <silent> <ESC> <ESC>:set iminsert=0<CR>

" コンマの後に自動的にスペースを挿入
inoremap , ,<Space>
" XMLの閉タグを自動挿入
augroup MyXML
  autocmd!
  autocmd Filetype xml inoremap <buffer> </ </<C-x><C-o>
augroup END

" 保存時に行末の空白を除去する
autocmd BufWritePre * :%s/\s\+$//ge
" }}}

" 線を引く
inoremap <F8> <C-R>=repeat('-', 80 - virtcol('.'))<CR>
" }}}

"---------------------------------------------------------------------------
" escape settings {{{
" エスケープ
vnoremap <Leader>e "xx:call <SID>EscapeXml('x')<CR>"xP

function s:EscapeXml(regname)
  let x = getreg(a:regname)
  let x = substitute(x, '&', '\&amp;', 'g')
  let x = substitute(x, '<', '\&lt;', 'g')
  let x = substitute(x, '>', '\&gt;', 'g')
  let x = substitute(x, "'", '\&apos;', 'g')
  let x = substitute(x, '"', '\&quot;', 'g')
  call setreg(a:regname, x)
endfunction

" アンエスケープ
vnoremap <Leader>ue "xx:call <SID>UnEscapeXml('x')<CR>"xP

function s:UnEscapeXml(regname)
  let x = getreg(a:regname)
  let x = substitute(x, '&amp;', '&', 'g')
  let x = substitute(x, '&lt;', '<', 'g')
  let x = substitute(x, '&gt;', '>', 'g')
  let x = substitute(x, '&apos;', "'", 'g')
  let x = substitute(x, '&quot;', '"', 'g')
  call setreg(a:regname, x)
endfunction
" }}}

"---------------------------------------------------------------------------
" other settings {{{
" ;でコマンド入力( ;と:を入れ替)
noremap ; :

" 行末までのヤンクにする
nnoremap Y y$

" JSONフォーマット
map <Leader>j !python -m json.tool<CR>

" 文字コードの自動認識
if &encoding !=# 'utf-8'
  set encoding=japan
  set fileencoding=japan
endif
if has('iconv')
  let s:enc_euc = 'euc-jp'
  let s:enc_jis = 'iso-2022-jp'
  " iconvがeucJP-msに対応しているかをチェック
  if iconv("\x87\x64\x87\x6a", 'cp932', 'eucjp-ms') ==# "\xad\xc5\xad\xcb"
    let s:enc_euc = 'eucjp-ms'
    let s:enc_jis = 'iso-2022-jp-3'
  " iconvがJISX0213に対応しているかをチェック
  elseif iconv("\x87\x64\x87\x6a", 'cp932', 'euc-jisx0213') ==# "\xad\xc5\xad\xcb"
    let s:enc_euc = 'euc-jisx0213'
    let s:enc_jis = 'iso-2022-jp-3'
  endif
  " fileencodingsを構築
  if &encoding ==# 'utf-8'
    let s:fileencodings_default = &fileencodings
    let &fileencodings = s:enc_jis .','. s:enc_euc .',cp932'
    let &fileencodings = &fileencodings .','. s:fileencodings_default
    unlet s:fileencodings_default
  else
    let &fileencodings = &fileencodings .','. s:enc_jis
    set fileencodings+=utf-8,ucs-2le,ucs-2
    if &encoding =~# '^\(euc-jp\|euc-jisx0213\|eucjp-ms\)$'
      set fileencodings+=cp932
      set fileencodings-=euc-jp
      set fileencodings-=euc-jisx0213
      set fileencodings-=eucjp-ms
      let &encoding = s:enc_euc
      let &fileencoding = s:enc_euc
    else
      let &fileencodings = &fileencodings .','. s:enc_euc
    endif
  endif
  " 定数を処分
  unlet s:enc_euc
  unlet s:enc_jis
endif
" 日本語を含まない場合は fileencoding に encoding を使うようにする
if has('autocmd')
  function! AU_ReCheck_FENC()
    if &fileencoding =~# 'iso-2022-jp' && search("[^\x01-\x7e]", 'n') == 0
      let &fileencoding=&encoding
    endif
  endfunction
  autocmd BufReadPost * call AU_ReCheck_FENC()
endif

"改行コードの自動認識
if has("win32") || has("win64")
  set fileformats=dos
else
  set fileformats=unix,mac,dos
endif

" □とか○の文字があってもカーソル位置がずれないようにする
if exists('&ambiwidth')
  set ambiwidth=double
endif

" 括弧入力後に←に移動
imap {} {}<Left>
imap [] []<Left>
" imap () ()<Left>
imap "" ""<Left>
imap '' ''<Left>
imap <> <><Left>

" カーソル行をハイライト
set cursorline
" カレントウィンドウにのみ罫線を引く
augroup cch
  autocmd! cch
  autocmd WinLeave * set nocursorline
  autocmd WinEnter,BufRead * set cursorline
augroup END

hi clear CursorLine
hi CursorLine gui=underline
highlight CursorLine ctermbg=black guibg=black

" 全角スペースの表示
highlight ZenkakuSpace cterm=underline ctermfg=lightblue guibg=darkgray
match ZenkakuSpace /　/

" 挿入モード時、ステータスラインの色を変更a
" via https://sites.google.com/site/fudist/Home/vim-nihongo-ban/vim-color
let g:hi_insert = 'highlight StatusLine guifg=darkblue guibg=darkyellow gui=none ctermfg=blue ctermbg=yellow cterm=none'

" ファイルタイプ
nnoremap ,js   :<C-u>set filetype=javascript<CR>
nnoremap ,css  :<C-u>set filetype=css<CR>
nnoremap ,html :<C-u>set filetype=html<CR>

"<space>j, <space>kで画面送り
noremap <Space>j <C-f>
noremap <Space>k <C-b>

" カーソル位置の単語をyankする
nnoremap vy vawy

"ビジュアルモード時vで行末まで選択
vnoremap v $h

" 最後に編集された位置に移動
nnoremap gb '[

"move tab
nnoremap gh gT
nnoremap gl gt

" <,>による連続インデント
vnoremap < <gv
vnoremap > >gv

autocmd FileType html setlocal includeexpr=substitute(v:fname,'^\\/','','') | setlocal path+=;/

" <Space>q で強制終了
nnoremap <Space>q :<C-u>q!<Return>

" ESC*2 でハイライトやめる
nnoremap <Esc><Esc> :<C-u>set nohlsearch<Return>

" encoding
nmap ,U :set encoding=utf-8<CR>
nmap ,E :set encoding=euc-jp<CR>
nmap ,S :set encoding=cp932<CR>
nmap ,J :set fileencoding=iso-2022-jp<CR>

" fileencoding
nmap ,fU :set fileencoding=utf-8<CR>
nmap ,fE :set fileencoding=euc-jp<CR>
nmap ,fS :set fileencoding=cp932<CR>
nmap ,fJ :set fileencoding=iso-2022-jp<CR>

" fileformat
nmap ,fu :set fileformat=unix<CR>
nmap ,fd :set fileformat=dos<CR>
nmap ,fm :set fileformat=mac<CR>

"u 検索時に勝手にエスケープさせる
cnoremap <expr> /  getcmdtype() == '/' ? '\/' : '/'
cnoremap <expr> ?  getcmdtype() == '?' ? '\?' : '?'

" hogeファイル
command! Hoge edit ~/Dropbox/hoge/hoge.markdown

" _ファイル
command! Underscore edit ~/_/_.txt

" 0番レジスタを使いやすくした
" via http://qiita.com/items/bd97a9b963dae40b63f5
vnoremap <silent> <C-p> "0p

" 連番
set nrformats-=octal
nnoremap <silent> co :ContinuousNumber <C-a><CR>
vnoremap <silent> co :ContinuousNumber <C-a><CR>
command! -count -nargs=1 ContinuousNumber let c = col('.')|for n in range(1, <count>?<count>-line('.'):1)|exec 'normal! j' . n . <q-args>|call cursor('.', c)|endfor

" Ctrl + hjkl でウィンドウ間を移動
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Shift + 矢印でウィンドウサイズを変更
nnoremap <S-Left>  <C-w><<CR>
nnoremap <S-Right> <C-w>><CR>
nnoremap <S-Up>    <C-w>-<CR>
nnoremap <S-Down>  <C-w>+<CR>

" Anywhere SID.
function! s:SID_PREFIX()
  return matchstr(expand('<sfile>'), '<SNR>\d\+_\zeSID_PREFIX$')
endfunction

" Set tabline.
function! s:my_tabline()  "{{{
  let s = ''
  for i in range(1, tabpagenr('$'))
    let bufnrs = tabpagebuflist(i)
    let bufnr = bufnrs[tabpagewinnr(i) - 1]  " first window, first appears
    let no = i  " display 0-origin tabpagenr.
    let mod = getbufvar(bufnr, '&modified') ? '!' : ' '
    let title = fnamemodify(bufname(bufnr), ':t')
    let title = '[' . title . ']'
    let s .= '%'.i.'T'
    let s .= '%#' . (i == tabpagenr() ? 'TabLineSel' : 'TabLine') . '#'
    let s .= no . ':' . title
    let s .= mod
    let s .= '%#TabLineFill# '
  endfor
  let s .= '%#TabLineFill#%T%=%#TabLine#'
  return s
endfunction "}}}
let &tabline = '%!'. s:SID_PREFIX() . 'my_tabline()'
set showtabline=2 " 常にタブラインを表示

" The prefix key.
nnoremap    [Tag]   <Nop>
nmap    t [Tag]
" Tab jump
for n in range(1, 9)
  execute 'nnoremap <silent> [Tag]'.n  ':<C-u>tabnext'.n.'<CR>'
endfor
" t1 で1番左のタブ、t2 で1番左から2番目のタブにジャンプ

map <silent> [Tag]c :tablast <bar> tabnew<CR>
" tc 新しいタブを一番右に作る
map <silent> [Tag]x :tabclose<CR>
" tx タブを閉じる
map <silent> [Tag]n :tabnext<CR>
" tn 次のタブ
map <silent> [Tag]p :tabprevious<CR>
" tp 前のタブ

" バッファの移動
" nmap <C-b> :ls<CR>:buf

" 矢印なキーでバッファ移動
map <Right> :bn<CR>
map <Left> :bp<CR>

" 貼り付けたテキストの末尾へ自動的に移動する
vnoremap <silent> y y`]
vnoremap <silent> p p`]
nnoremap <silent> p p`]

" }}}

"---------------------------------------------------------------------------
" plugin settings {{{
"---------------------------------------------------------------------------
" for Shougo/neocomplcache {{{
" Disable AutoComplPop.
let g:acp_enableAtStartup = 0
" Use neocomplcache.
let g:neocomplcache_enable_at_startup = 1
" Use smartcase.
let g:neocomplcache_enable_smart_case = 1
" Use camel case completion.
let g:neocomplcache_enable_camel_case_completion = 1
" Use underbar completion.
let g:neocomplcache_enable_underbar_completion = 1
" Set minimum syntax keyword length.
let g:neocomplcache_min_syntax_length = 3
let g:neocomplcache_lock_buffer_name_pattern = '\*ku\*'
" }}}

"---------------------------------------------------------------------------
" for Shougo/unite.vim {{{
" 起動時にインサートモードで開始しない
let g:unite_enable_start_insert = 1

" インサート／ノーマルどちらからでも呼び出せるようにキーマップ
nnoremap <silent> <C-f> :<C-u>UniteWithBufferDir file file/new -buffer-name=file<CR>
inoremap <silent> <C-f> <ESC>:<C-u>UniteWithBufferDir file file/new -buffer-name=file<CR>
nnoremap <silent> <C-e> :<C-u>Unite buffer file_mru<CR>
inoremap <silent> <C-e> <ESC>:<C-u>Unite buffer file_mru<CR>
nnoremap <silent> <C-b> :<C-u>Unite bookmark<CR>
inoremap <silent> <C-b> <ESC>:<C-u>Unite bookmark<CR>

" バッファ一覧
nnoremap <silent> ,ub :<C-u>Unite buffer<CR>
" ファイル一覧
nnoremap <silent> ,uf :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
" レジスタ一覧
nnoremap <silent> ,ur :<C-u>Unite -buffer-name=register register<CR>
" 最近使用したファイル一覧
nnoremap <silent> ,um :<C-u>Unite file_mru<CR>
" ブックマーク一覧
nnoremap <silent> ,uc :<C-u>Unite bookmark<CR>
" ブックマーク追加
nnoremap <silent> ,ud :<C-u>UniteBookmarkAdd<CR>
" 全部乗せ
nnoremap <silent> ,ua :<C-u>UniteWithBufferDir -buffer-name=files buffer file_mru bookmark file<CR>

" ファイル作成
nnoremap <silent> ,uff :<C-u>UniteWithBufferDir file file/new -buffer-name=file<CR>

"file current_dir
"noremap <silent> ,ufc :<C-u>Unite file -buffer-name=file<CR>
noremap <silent> ,ufc :<C-u>Unite file<CR>
noremap <silent> ,ufcr :<C-u>Unite file_rec -buffer-name=file_rec<CR>

" unite.vim上でのキーマッピング
autocmd FileType unite call s:unite_my_settings()
function! s:unite_my_settings()
  " 単語単位からパス単位で削除するように変更
  imap <buffer> <C-w> <Plug>(unite_delete_backward_path)
  " ESCキーを2回押すと終了する
  nmap <silent><buffer> <ESC><ESC> q
  imap <silent><buffer> <ESC><ESC> <ESC>q
endfunction

" unite-plugins
nnoremap <silent> ,uh :<C-u>Unite help<CR>
" Markdownなどを解析してアウトラインを表示してくれる、むちゃくちゃ便利
" via http://qiita.com/items/2cebdb805f45e7b4b901
nnoremap <silent> ,uo :<C-u>Unite outline<CR>
" }}}

"---------------------------------------------------------------------------
" for Shougo/vimfiler.vim {{{
"vimデフォルトのエクスプローラをvimfilerで置き換える
let g:vimfiler_as_default_explorer = 1
"セーフモードを無効にした状態で起動する
let g:vimfiler_safe_mode_by_default = 0
"現在開いているバッファのディレクトリを開く
nnoremap <silent> ,fe :<C-u>VimFilerBufferDir -quit<CR>
"現在開いているバッファをIDE風に開く
nnoremap <silent> ,fi :<C-u>VimFilerBufferDir -split -simple -winwidth=45 -toggle -no-quit<CR>
nnoremap <F3> :VimFiler -buffer-name=explorer -split -simple -winwidth=45 -toggle -no-quit<Cr>

"デフォルトのキーマッピングを変更
augroup vimrc
  autocmd FileType vimfiler call s:vimfiler_my_settings()
augroup END
function! s:vimfiler_my_settings()
  nmap <buffer> q <Plug>(vimfiler_exit)
  nmap <buffer> Q <Plug>(vimfiler_hide)
  let g:vimfiler_tree_leaf_icon = ' '
  let g:vimfiler_tree_opened_icon = '\' " filled inverse triangle
  let g:vimfiler_tree_closed_icon = '>' " filled right-pointed triangle
  let g:vimfiler_file_icon = '-'
  let g:vimfiler_readonly_file_icon = "x" " like X
  let g:vimfiler_marked_file_icon = "O"   " checkmark like レ
endfunction
" }}}

"---------------------------------------------------------------------------
" for mattn/emmet-vim {{{
let g:user_emmet_settings = {
\ 'lang': 'ja',
\ 'html': {
\       'indentation' : '  ',
\   'snippets': {
\   'flash': "<object data=\"${cursor}\""
\        ." type=\"application/x-shockwave-flash\""
\        ." id=\"\" width=\"\" height=\"\">"
\        ." <param name=\"movie\" value=\"\" />\n</object>",
\   },
\ },
\ 'css': {
\   'filters': 'fc',
\ },
\ 'stylus': {
\   'extends': 'css',
\   'filters': 'fc',
\ },
\ 'php': {
\   'extends': 'html',
\   'filters': 'html,c',
\ },
\}
let g:use_emmet_complete_tag = 1
" }}}

"---------------------------------------------------------------------------
" for tyru/caw.vim {{{
" コメントアウトを切り替えるマッピング例
nmap ,c <Plug>(caw:I:toggle)
vmap ,c <Plug>(caw:I:toggle)
" }}}

"---------------------------------------------------------------------------
" for bling/vim-airline {{{
if !exists('g:airline_symbols')
  let g:airline_symbols = {}
endif
let g:airline_section_a = airline#section#create(['mode','','branch'])
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#show_buffers = 0
let g:airline#extensions#tabline#tab_nr_type = 1
let g:airline#extensions#tabline#fnamemod = ':t'
let g:Powerline_symbols = 'fancy'
set t_Co=256
let g:airline_theme='badwolf'
let g:airline_left_sep = ' '
let g:airline_left_alt_sep = '|'
let g:airline_right_sep = ' '
let g:airline_right_alt_sep = '|'
" let g:airline_symbols.branch = ''
" let g:airline_symbols.readonly = ''
" let g:airline_symbols.linenr = ''
let g:airline_detect_modified=1
let g:airline_detect_paste=1
let g:airline_inactive_collapse=1
let g:airline#extensions#csv#enabled = 1
let g:airline_powerline_fonts = 1
" }}}

" }}}
