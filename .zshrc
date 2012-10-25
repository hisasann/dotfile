# 文字コードの設定
export LANG=ja_JP.UTF-8

# viのキーバインド
bindkey -v

# パスの設定
PATH=/usr/local/bin:$PATH
export MANPATH=/usr/local/share/man:/usr/local/man:/usr/share/man
# Sublime Text 2
export EDITOR='subl -w'

# symbolicatecrash用
export DEVELOPER_DIR="/Applications/XCode.app/Contents/Developer"

# 関数
find-grep () { find . -type f -print | xargs grep -n --binary-files=without-match $@ }

export LSCOLORS=exfxcxdxbxegedabagacad
export LS_COLORS='di=34:ln=35:so=32:pi=33:ex=31:bd=46;34:cd=43;34:su=41;30:sg=46;30:tw=42;30:ow=43;30'
zstyle ':completion:*' list-colors 'di=34' 'ln=35' 'so=32' 'ex=31' 'bd=46;34' 'cd=43;34'

# ~/.zshenv, ~/.bash_profile などに以下を追加
source ~/.nvm/nvm.sh
nvm use "v0.9.0"
npm_dir=${NVM_PATH}_modules
export NODE_PATH=$npm_dir

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function

PATH=$PATH:$HOME/.rvm/bin # Add RVM to PATH for scripting

# エイリアスの設定
alias ls="ls -GvF"
alias l="ls -G"
alias ll="ls -Gl"
alias la="ls -Gla"
alias ip="ifconfig | grep 192.*"
alias du="du -sh"
alias df="df -h"
alias vi="/Applications/MacVim.app/Contents/MacOS/Vim -g --remote-tab-silent"
alias vim="/Applications/MacVim.app/Contents/MacOS/Vim -g --remote-tab-silent"
alias macvim="/Applications/MacVim.app/Contents/MacOS/Vim -g --remote-tab-silent"
alias safari="open -a Safari"
alias chrome="open -a Google\ Chrome"
alias symbolicatecrash="/Applications/Xcode.app/Contents/Developer//Platforms/iPhoneOS.platform/Developer/Library/PrivateFrameworks/DTDeviceKit.framework/Versions/A/Resources/symbolicatecrash"
alias today='date +%Y%m%d'


# プロンプトの色の設定
autoload colors
colors
case ${UID} in
0)
  PROMPT="%B%{${fg[red]}%}%/#%{${reset_color}%}%b "
  PROMPT2="%B%{${fg[red]}%}%_#%{${reset_color}%}%b "
  SPROMPT="%B%{${fg[red]}%}%r is correct? [n,y,a,e]:%{${reset_color}%}%b "
  [ -n "${REMOTEHOST}${SSH_CONNECTION}" ] &&
    PROMPT="%{${fg[white]}%}${HOST%%.*} ${PROMPT}"
  ;;
*)
  PROMPT="%{${fg[red]}%}%/%%%{${reset_color}%} "
  PROMPT2="%{${fg[red]}%}%_%%%{${reset_color}%} "
  SPROMPT="%{${fg[red]}%}%r is correct? [n,y,a,e]:%{${reset_color}%} "
  [ -n "${REMOTEHOST}${SSH_CONNECTION}" ] &&
    PROMPT="%{${fg[white]}%}${HOST%%.*} ${PROMPT}"
  ;;
esac

# タイトル
case "${TERM}" in
kterm*|xterm)
    precmd() {
        echo -ne "\033]0;${USER}@${HOST%%.*}:${PWD}\007"
    }
    ;;
esac

# コマンド補完
autoload -U compinit
compinit

# コマンド予測
autoload predict-on
# predict-off
predict-on

# 補完候補が複数ある時に、一覧表示
setopt auto_list

# 保管結果をできるだけ詰める
setopt list_packed

# 補完キー（Tab, Ctrl+I) を連打するだけで順に補完候補を自動で補完
setopt auto_menu

# ビープ音を鳴らさないようにする
setopt no_beep

# ディレクトリを水色にする｡
export LS_COLORS='di=01;36'

# cd をしたときにlsを実行する
function chpwd() { ls }

# ディレクトリ名だけで､ディレクトリの移動をする｡
setopt auto_cd

# cdの履歴を保存する
# cd -TAB
setopt auto_pushd

# コマンドを間違えたら教えてくれる
setopt correct

# コマンド履歴
autoload history-search-end
zle -N history-beginning-search-backward-end history-search-end
zle -N history-beginning-search-forward-end history-search-end
bindkey "^P" history-beginning-search-backward-end
bindkey "^N" history-beginning-search-forward-end

# ヒストリー
HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt share_history
# 直前と同じコマンドラインはヒストリに追加しない
setopt hist_ignore_dups
# ヒストリにhistoryコマンドを記録しない
setopt hist_no_store
# 余分なスペースを削除してヒストリに記録する
setopt hist_reduce_blanks

# git
autoload bashcompinit
bashcompinit
source /usr/local/Cellar/git/1.7.12/etc/bash_completion.d/git-completion.bash

# local設定を読み込み
source ~/.zshrc.local

