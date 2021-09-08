set -U FZF_LEGACY_KEYBINDINGS 0
set -U FZF_REVERSE_ISEARCH_OPTS "--reverse --height=100%"

set ANDROID_HOME $HOME/Library/Android/sdk
set PATH $ANDROID_HOME/emulator $PATH
set PATH $ANDROID_HOME/tools $PATH
set PATH $ANDROID_HOME/tools/bin $PATH
set PATH $ANDROID_HOME/platform-tools $PATH
set PATH /usr/local/opt/mongodb-community@3.6/bin $PATH
set PATH /usr/local/Cellar/mongodb-community-shell/4.2.0/bin $PATH
set PATH $HOME/.cargo/bin $PATH

# via fishのプロンプトの右側をカスタマイズして、gitのブランチとstatusを表示させる - Qiita - https://qiita.com/mom0tomo/items/b593c0e98c1eea70a114
# Fish git prompt
set __fish_git_prompt_showdirtystate 'yes'
set __fish_git_prompt_showstashstate 'yes'
set __fish_git_prompt_showuntrackedfiles 'yes'
set __fish_git_prompt_showupstream 'yes'
set __fish_git_prompt_color_branch yellow
set __fish_git_prompt_color_upstream_ahead green
set __fish_git_prompt_color_upstream_behind red

# Status Chars
set __fish_git_prompt_char_dirtystate '⚡'
set __fish_git_prompt_char_stagedstate '→'
set __fish_git_prompt_char_untrackedfiles '☡'
set __fish_git_prompt_char_stashstate '↩'
set __fish_git_prompt_char_upstream_ahead '+'
set __fish_git_prompt_char_upstream_behind '-'

# aliases
abbr -a g git
abbr -a gc git c
abbr -a gm git dm
abbr -a gs git status
abbr -a gst git status -sb
abbr -a la exa -l -a
abbr -a vim nvim
abbr -a lazy lazygit

source ~/.asdf/asdf.fish
source /usr/local/opt/asdf/asdf.fish

function fish_user_key_bindings
  bind \cj\ck random_emoji_copy
end
