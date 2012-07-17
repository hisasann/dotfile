if exists("current_compiler")
  finish
endif
let current_compiler = "gjslint"

if exists(":CompilerSet") != 2
  command -nargs=* CompilerSet setlocal <args>
endif

CompilerSet makeprg=gjslint\ %
CompilerSet errorformat=
      \%+P-----\ FILE\ \ :\ \ %f\ -----,
      \Line\ %l\\,\ %t:%n:\ %m,
      \%+Q%r