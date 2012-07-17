"-------------------------------------------------------------------------------
" Memo
"-------------------------------------------------------------------------------
" :h text-objects	テキストオブジェクトのヘルプを表示
" set ft=javascript		ファイルを保存しなくてもJavaScriptモードになる

"-------------------------------------------------------------------------------
" Bundle
"-------------------------------------------------------------------------------
" vundle {{{
filetype off
filetype plugin indent off

set rtp+=~/.vim/bundle/vundle
call vundle#rc()

Bundle 'gmarik/vundle'
Bundle 'YankRing.vim'
Bundle 'neocomplcache'

" センタリング
Bundle 'h1mesuke/vim-alignta'
" :Alignta- でハイフンでセンタリング

" My Bundles here:
" ZenCoding
Bundle 'ZenCoding.vim'
" Ctrl+y, Ctrl+,

" TextMate風にタブで補完してくれる
Bundle "MarcWeber/vim-addon-mw-utils"
Bundle "tomtom/tlib_vim"
Bundle "snipmate-snippets"
Bundle "garbas/vim-snipmate"

" html5
Bundle 'othree/html5.vim'

" markdown
" require - gem install bluecloth
Bundle 'thinca/vim-quickrun'
Bundle 'tpope/vim-markdown'
Bundle 'open-browser.vim'

" XMLとかHTMLとかの編集機能を強化する
" Bundle 'xmledit'
" 以下のリンクのhtml.vimを作成しないと動かない
" via http://d.hatena.ne.jp/riskn/20070430/1177941248

" tree
Bundle 'scrooloose/nerdtree'

" via http://subtech.g.hatena.ne.jp/secondlife/20061222/1166778147
Bundle 'tpope/vim-surround'
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
" hoge	S<div> <div>hoge</div> これがかなり便利

" JavaScript
" syntax
Bundle 'JavaScript-syntax'
" indent
" .htmlファイル内のJavaScriptが残念になるので一旦コメントアウト
"Bundle 'pangloss/vim-javascript'

" メソッド宣言、変数宣言
Bundle 'majutsushi/tagbar'

" unite
Bundle 'Shougo/unite.vim'
" Ctrl+f カレントのファイラーを開く
" NERDTreeは、:Unite file あるいはVimFiler に

" ステータスラインをカッコよくする
Bundle 'Lokaltog/vim-powerline'

" -- でメソッドチェーン整形（php、perl、rubyだけ）
Bundle 'c9s/cascading.vim'

" vim上のtwitter client
Bundle 'TwitVim'

" 使っちゃいけないPlugin
"Bundle 'vim-scripts/AutoComplPop'
"Bundle 'AutoClose'

filetype plugin indent on     " required!
"
"
" Brief help
" :BundleList          - list configured bundles
" :BundleInstall(!)    - install(update) bundles
" :BundleSearch(!) foo - search(or refresh cache first) for foo
" :BundleClean(!)      - confirm(or auto-approve) removal of unused bundles
"
" see :h vundle for more details or wiki for FAQ
" NOTE: comments after Bundle command are not allowed..

" }}}


"-------------------------------------------------------------------------------
" 全般設定
"-------------------------------------------------------------------------------
set nocompatible            " 必ず最初に書く
set viminfo='20,<50,s10,h,! " YankRing用に!を追加
set shellslash              " Windowsでディレクトリパスの区切り文字に / を使えるようにする
set lazyredraw              " マクロなどを実行中は描画を中断
set number        " 行番号を非表示
set ruler        " ルーラーを表示 (noruler:非表示)
set cmdheight=2      " コマンドラインの高さ (Windows用gvim使用時はgvimrcを編集すること)
set laststatus=2    " 常にステータス行を表示 (詳細は:he laststatus)
set statusline=%<%f\ %m%r%h%w%{'['.(&fenc!=''?&fenc:&enc).']['.&ff.']'}%=%l,%c%V%8P
set title
set linespace=0
set showcmd        " コマンドをステータス行に表
set encoding=utf-8

"-------------------------------------------------------------------------------
" コマンド補完
"-------------------------------------------------------------------------------
set wildmenu           " コマンド補完を強化
set wildmode=list:full " リスト表示，最長マッチ

"-------------------------------------------------------------------------------
" 検索
"-------------------------------------------------------------------------------
set ignorecase  " 大文字小文字無視
set smartcase  " 大文字ではじめたら大文字小文字無視しない
set wrapscan  " 最後まで検索したら先頭へ戻る
"set nowrapscan  " 検索をファイルの先頭へループしない
set hlsearch  " 検索文字をハイライト
set incsearch  " インクリメンタルサーチ

"-------------------------------------------------------------------------------
" タブ
"-------------------------------------------------------------------------------
set tabstop=4    " tabstopはTab文字を画面上で何文字分に展開するか
"set expandtab    " タブを空白文字に展開
set smarttab
set shiftwidth=4
set shiftround
set nowrap

"-------------------------------------------------------------------------------
" backup
"-------------------------------------------------------------------------------
set backup
set backupdir=~/vim_backup
set swapfile
set directory=~/vim_swap
"set nobackup   " バックアップ取らない
"set autoread   " 他で書き換えられたら自動で読み直す
"set noswapfile " スワップファイル作らない
"set hidden     " 編集中でも他のファイルを開けるようにする

"-------------------------------------------------------------------------------
" 色
"-------------------------------------------------------------------------------
" syntax color
syntax on
"colorscheme molokai  " .gvimrcに書かないと反映されないのでコメントアウト
highlight LineNr ctermfg=darkgrey

"-------------------------------------------------------------------------------
" 移動設定
"-------------------------------------------------------------------------------

" 0, 9で行頭、行末へ
nmap 1 0
nmap 0 ^
nmap 9 $

"-------------------------------------------------------------------------------
" 編集関連
"-------------------------------------------------------------------------------
set autoindent
set cindent    " C言語的なインデント
set showmatch      " 括弧の対応をハイライト
set backspace=indent,eol,start
set clipboard=unnamed
set pastetoggle=<F12>
set guioptions+=a

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
" 保存時にtabをスペースに変換する
"autocmd BufWritePre * :%s/\t/  /ge


"-------------------------------------------------------------------------------
" その他
"-------------------------------------------------------------------------------

" ;でコマンド入力( ;と:を入れ替)
noremap ; :
" pluginとかでnmap :call hoge..とかやってるやつがあるので、
" :でもexコマンドに入れるようにしておく
" noremap : ;

" doc
helptags ~/.vim/doc

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
" 改行コードの自動認識
set fileformats=unix,dos,mac
" □とか○の文字があってもカーソル位置がずれないようにする
if exists('&ambiwidth')
  set ambiwidth=double
endif

" Ctrl + n でファイルのsyntaxチェック、Ctrl + e でファイルを実行することが出来るようにしてます。(perlとrubyのみ）
autocmd FileType perl :map <C-n> <ESC>:!perl -cw %<CR>
autocmd FileType perl :map <C-e> <ESC>:!perl %<CR>
autocmd FileType ruby :map <C-n> <ESC>:!ruby -cW %<CR>
autocmd FileType ruby :map <C-e> <ESC>:!ruby %<CR>

" gjslint
autocmd FileType javascript :compiler gjslint
autocmd QuickfixCmdPost make copen

" 括弧入力後に←に移動
imap {} {}<Left>
imap [] []<Left>
imap () ()<Left>
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

if has('syntax')
  augroup InsertHook
    autocmd!
    autocmd InsertEnter * call s:StatusLine('Enter')
    autocmd InsertLeave * call s:StatusLine('Leave')
  augroup END
endif

let s:slhlcmd = ''
function! s:StatusLine(mode)
  if a:mode == 'Enter'
    silent! let s:slhlcmd = 'highlight ' . s:GetHighlight('StatusLine')
    silent exec g:hi_insert
  else
    highlight clear StatusLine
    silent exec s:slhlcmd
  endif
endfunction

function! s:GetHighlight(hi)
  redir => hl
  exec 'highlight '.a:hi
  redir END
  let hl = substitute(hl, '[\r\n]', '', 'g')
  let hl = substitute(hl, 'xxx', '', '')
  return hl
endfunction

"-------------------------------------------------------------------------------
" plugin
"-------------------------------------------------------------------------------
" toggle nerdtree
nnoremap <F4> :<C-u>NERDTreeToggle<CR>

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

" Define dictionary.
let g:neocomplcache_dictionary_filetype_lists = {
\ 'default' : '',
\ 'vimshell' : $HOME.'/.vimshell_hist',
\ 'scheme' : $HOME.'/.gosh_completions'
\ }

" Define keyword.
if !exists('g:neocomplcache_keyword_patterns')
  let g:neocomplcache_keyword_patterns = {}
endif
let g:neocomplcache_keyword_patterns['default'] = '\h\w*'

" Plugin key-mappings.
imap <C-k>     <Plug>(neocomplcache_snippets_expand)
smap <C-k>     <Plug>(neocomplcache_snippets_expand)
inoremap <expr><C-g>     neocomplcache#undo_completion()
inoremap <expr><C-l>     neocomplcache#complete_common_string()

" SuperTab like snippets behavior.
"imap <expr><TAB> neocomplcache#sources#snippets_complete#expandable() ? "\<Plug>(neocomplcache_snippets_expand)" : pumvisible() ? "\<C-n>" : "\<TAB>"

" Recommended key-mappings.
" <CR>: close popup and save indent.
inoremap <expr><CR>  neocomplcache#smart_close_popup() . "\<CR>"
" <TAB>: completion.
inoremap <expr><TAB>  pumvisible() ? "\<C-n>" : "\<TAB>"
" <C-h>, <BS>: close popup and delete backword char.
inoremap <expr><C-h> neocomplcache#smart_close_popup()."\<C-h>"
inoremap <expr><BS> neocomplcache#smart_close_popup()."\<C-h>"
inoremap <expr><C-y>  neocomplcache#close_popup()
inoremap <expr><C-e>  neocomplcache#cancel_popup()

" AutoComplPop like behavior.
"let g:neocomplcache_enable_auto_select = 1

" Shell like behavior(not recommended).
"set completeopt+=longest
"let g:neocomplcache_enable_auto_select = 1
"let g:neocomplcache_disable_auto_complete = 1
"inoremap <expr><TAB>  pumvisible() ? "\<Down>" : "\<TAB>"
"inoremap <expr><CR>  neocomplcache#smart_close_popup() . "\<CR>"

" Enable omni completion.
autocmd FileType css setlocal omnifunc=csscomplete#CompleteCSS
autocmd FileType html,markdown setlocal omnifunc=htmlcomplete#CompleteTags
autocmd FileType javascript setlocal omnifunc=javascriptcomplete#CompleteJS
autocmd FileType python setlocal omnifunc=pythoncomplete#Complete
autocmd FileType xml setlocal omnifunc=xmlcomplete#CompleteTags

" Enable heavy omni completion.
if !exists('g:neocomplcache_omni_patterns')
  let g:neocomplcache_omni_patterns = {}
endif
let g:neocomplcache_omni_patterns.ruby = '[^. *\t]\.\w*\|\h\w*::'
"autocmd FileType ruby setlocal omnifunc=rubycomplete#Complete
let g:neocomplcache_omni_patterns.php = '[^. \t]->\h\w*\|\h\w*::'
let g:neocomplcache_omni_patterns.c = '\%(\.\|->\)\h\w*'
let g:neocomplcache_omni_patterns.cpp = '\h\w*\%(\.\|->\)\h\w*\|\h\w*::'


""" Unite.vim
" 起動時にインサートモードで開始しない
let g:unite_enable_start_insert = 1

" インサート／ノーマルどちらからでも呼び出せるようにキーマップ
nnoremap <silent> <C-f> :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
inoremap <silent> <C-f> <ESC>:<C-u>UniteWithBufferDir -buffer-name=files file<CR>
nnoremap <silent> <C-b> :<C-u>Unite buffer file_mru<CR>
inoremap <silent> <C-b> <ESC>:<C-u>Unite buffer file_mru<CR>

" バッファ一覧
nnoremap <silent> ,ub :<C-u>Unite buffer<CR>
" ファイル一覧
nnoremap <silent> ,uf :<C-u>UniteWithBufferDir -buffer-name=files file<CR>
" レジスタ一覧
nnoremap <silent> ,ur :<C-u>Unite -buffer-name=register register<CR>
" 最近使用したファイル一覧
nnoremap <silent> ,um :<C-u>Unite file_mru<CR>
" 全部乗せ
nnoremap <silent> ,ua :<C-u>UniteWithBufferDir -buffer-name=files buffer file_mru bookmark file<CR>

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


""" twitvim
let twitvim_count = 200
nnoremap ,tp :<C-u>PosttoTwitter<CR>
nnoremap ,tf :<C-u>FriendsTwitter<CR><C-w>j
nnoremap ,tu :<C-u>UserTwitter<CR><C-w>j
nnoremap ,tr :<C-u>RepliesTwitter<CR><C-w>j
nnoremap ,tn :<C-u>NextTwitter<CR>

autocmd FileType twitvim call s:twitvim_my_settings()
function! s:twitvim_my_settings()
  set nowrap
endfunction


" vim-quickrun - markdown
let g:quickrun_config = {}
let g:quickrun_config['markdown'] = {
\ 'command': 'bluecloth',
\ 'exec': '%c -f %s'
\ }
" ブラウザで開く場合
"let g:quickrun_config['markdown'] = {
"\ 'outputter': 'browser'
"\ }

" tagbar
"map lo :TagbarOpen<CR>
"map lt :TagbarToggle<CR>
nnoremap <silent> ,lo :<C-u>TagbarOpen<CR>
nnoremap <silent> ,lt :<C-u>TagbarToggle<CR>
