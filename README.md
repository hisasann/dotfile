# ぼくのVim環境よ。

---

# VimコマンドやTipsをまとめてみたよ！

## Vimコマンド

## コマンドモード

---

### 行末へ移動

    $

### 行頭へ移動

    0

### 1ページ次へ

    C_f

### 半ページ次へ

    C_d

### 半ページ前へ

    C_u

### 1ページ前へ

    C_b

### 画面内の一番下へ

    S_l

### 画面内の中央へ

    S_m

### 画面内の一番上へ

    S_h

### 次のタブへ

    gt

### 前のタブへ

    gT

### 最初の行へ

    gg

### 最後の行へ

    G

### 今のワードの最後へ

    e

### 次のワードへ

    w

### 前のワードへ

    b

---

### 行をコピー

    yy

### 行を複製

    Yp

### 貼りつけ

    P

### 現在行に貼りつけ

    P

### 次の行に貼り付け

    p

---

### アンドゥ

    u

### リドゥ

    C_r

---

### 1行下を開けて挿入モード

    o

### 1行上を開けて挿入モード

    O

### 現在の行を中心にする

    zz

### 一行削除して挿入モード

    S

---

### 2行削除

    dj

### 単語の削除

    dw

### 行末まで削除

    d$

### 3つの単語を削除する

    3dw

### ↑と同じ

    d3w

---

### 下の文字を置き換える

    r

### 1文字以上の文字を置き換える

    R

---

### 次のジャンプ位置へ

    C_i

### 前のジャンプ位置へ

    C_o

検索後に、さっきの場所に戻りたい場合に重宝する

---

### 現在の場所から単語を削除し入力モードにする

    cw

### カーソルから後ろ全部削除

    D

### カーソルから後ろ全部削除してから挿入モード

    C

### 対応するカッコの最後に移動

    %

### 文字の上で入力するとそのワードでの検索状態になる

    *

### hogeで検索する

    /hoge

### 検索履歴を表示する

    q/

### 次の検索ワードへ

    n

### 前の検索ワードへ

    N

### カレント行の6というワードのところにジャンプ

    f6

---

### 折りたたみを開く

    zo

### 折りたたみを閉じる

    zc

---

### ビジュアルモード

    v

### 行を選択した状態でビジュアルモード

    V

### 矩形選択

    C_v

---

### ダブルコートの中で実行すると、中身の文字をヤンクする

    yi"

### ダブルコートの中で実行すると、中身の文字を削除

    di"

### カッコの中で実行すると、中身の文字を削除

    di(

### ダブルコートも含めて削除

    da"

### カーソル位置から"までを削除

    dt"

### aというレジスタにカレントから最後までを保存

    "av$yy

### カウントアップ

    C_a

---

### !を入れることでコマンドを実行できる

    :!ls

### カレントディレクトリをhogeにする

    :cd ~/hoge/

### fooをbarに置換する（1行）

    :s/foo/bar

### fooをbarに置換する（すべての行）

    :%s/foo/bar

---

### 画面分割、またはC+w,s

    :sp

### 画面分割、またはC+w,v

    :vsp

### 画面間の移動

    C_w_w

### 下のウィンドウへ

    C_w_j

### 上のウィンドウへ

    C_w_h

---

### 開いているファイルをカレントディレクトリにする

    :CdCurrent

### hogeという単ををhoge.jsからgrep

    :vimgrep /hoge/ ./hoge.js

### grep結果を表示

    :copen

### jqueryという文字の大文字小文字を区別せず、grepし「| cw」はマッチしたファイルがあった場合にQuickFixを開きます

    :vim[grep] /jquery/j ~/Dropbox/*.js | cw

### コード整形

    =

### 前回のコマンドをもう一度

    .（ピリオド）

### 新しいタブを開く

    :tabnew

---

### マーク - maだとaにマークを割り当てる

    ma

### 有効なマーク一覧

    :marks

### マークにジャンプ（バックコートはShift_@）

    `a

### 10行目に移動

    :10

### 全体の行の50%の場所に移動

    50%

---

## インサートモード

### 上の文字と同じ文字を入力する

    C_y

### 下の文字と同じ文字を入力する

    C_e


### カーソル下のローマ字の大文字/小文字を相互に変換

    ~

### 現在のカーソルのある単語をすべてを大文字にする

    gUiw

### 行すべてを大文字にする

    gUU

### チュートリアルモードになる、これをやるだけで全然違う

    :Tutorial

## VimのTips

### 複数行の先頭に文字を追加したい

    C_vからIを押すと挿入モードになり、そこで入力したものはEsc後に全行に反映される

### 複数行の末尾に文字を追加したい

    C_vからAを押すと挿入モードになり、そこで入力したものはEsc後に全行に反映される

### ヤンク後に他の行を削除した場合に、ヤンクの内容で貼り付けする

    ヤンク→削除→"0P

### ヤンクを特定のレジスタに登録する

    "ay

### 特定の文字を含む行を削除したい

    :%g/hisasann/d

### 特定の文字を含む行だけを残して他の行を削除したい

    :%v/hisasann/d

### 特定の文字を含む行たちをヤンクしたい

    :let @a=''
    :%g//y A

