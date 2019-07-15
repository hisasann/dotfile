#
# Executes commands at the start of an interactive session.
#
# Authors:
#   Sorin Ionescu <sorin.ionescu@gmail.com>
#

# 文字コードの設定
export LANG=ja_JP.UTF-8

# viのキーバインド
bindkey -v

# Source Prezto.
if [[ -s "${ZDOTDIR:-$HOME}/.zprezto/init.zsh" ]]; then
  source "${ZDOTDIR:-$HOME}/.zprezto/init.zsh"
fi

# nodebrew
# Customize to your needs...
export PATH=$HOME/.nodebrew/current/bin:$PATH

# powerlevel9k
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs)

# rbenv
[[ -d ~/.rbenv  ]] && \
  export PATH=${HOME}/.rbenv/bin:${PATH} && \
  eval "$(rbenv init -)"

# 関数
find-grep () { find . -type f -print | xargs grep -n --binary-files=without-match $@ }

# エイリアスの設定
alias ls="ls -GvF"
alias l="ls -G"
alias ll="ls -Gl"
alias lll="ls -Gl"
alias llll="ls -Gl"
alias lllll="ls -Gl"
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
alias unity='open -n /Applications/Unity/Unity.app'
alias swift='/Applications/Xcode6-Beta.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/swift'

# git
alias gst='git status -sb && git stash list'
alias glgg='git logg'
alias gcm='git cs'
alias gpom='git pom'
alias gpod='git pod'

# fzf
# https://github.com/junegunn/fzf/issues/128
alias fzf="git ls-files --exclude-standard --others --cached | fzf"

# pecoでhistory検索
function peco-select-history() {
  BUFFER=$(\history -n -r 1 | peco --query "$LBUFFER")
  CURSOR=$#BUFFER
  zle clear-screen
}
zle -N peco-select-history
bindkey '^r' peco-select-history

# 楽ちん！
alias cd="pushd"
alias bd="popd"

# コマンド補完
autoload -U compinit
compinit -u

# コマンド予測
autoload predict-on
# predict-off
predict-on

# cdの履歴を表示
setopt autopushd

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
