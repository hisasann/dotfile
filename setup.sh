#!/bin/bash

# via https://github.com/isystk/dotfiles/blob/master/setup.sh

echo 'start'

cd $(dirname $0)
for dotfile in .?*
do
    if [ $dotfile != '..' ] && [ $dotfile != '.git' ] && [ $dotfile != '.zshrc.orig' ]
    then
        ln -fs "$PWD/$dotfile" $HOME
    fi
done

ln -fs ~/dotfile/.zshrc.orig ~/.oh-my-zsh/custom/zshrc.zsh

echo 'end'
