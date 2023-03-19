---
title: git创建空白分支
date: 2022-07-08 22:59:56
tags: git
categories: 版本控制
---

## 前言

最近在github上创建一些新的分支，发现默认会从某一个分支拉过来成立一个新的分支，.git文件下会有前一分支的提交信息，例如head、ref、logs等。

那我们能不能创建一个新的分支，让它成为一个空白的分支，不带其他分支的head、ref、logs呢？

答案是可以的，可以使用orphan参数。

## git orphan

用法：

```shell
git checkout --orphan branch-name
```

首先我们在github创建一个test仓库，克隆到本地，写入一些东西进行提交。

```shell
➜  test git:(master) ls
➜  test git:(master) git logs
git：'logs' 不是一个 git 命令。参见 'git --help'。

最相似的命令是
    log
➜  test git:(master) git log
fatal: 您的当前分支 'master' 尚无任何提交
➜  test git:(master) echo "init test" > test1.txt
➜  test git:(master) ✗ git add test1.txt
➜  test git:(master) ✗ git commit -m "test1"
[master（根提交） 80674b3] test1
 1 file changed, 1 insertion(+)
 create mode 100644 test1.txt
➜  test git:(master) git push -u
枚举对象中: 3, 完成.
对象计数中: 100% (3/3), 完成.
写入对象中: 100% (3/3), 216 字节 | 216.00 KiB/s, 完成.
总共 3（差异 0），复用 0（差异 0），包复用 0
To github.com:ErYoung2/test.git
 * [new branch]      master -> master
分支 'master' 设置为跟踪来自 'origin' 的远程分支 'master'。
➜  test git:(master) git log
commit 80674b32438bd3bfe0de6d6183b91ea8bdfca129 (HEAD -> master, origin/master)
Author: ErYoung2 
Date:   Fri Jul 8 22:35:21 2022 +0800

    test1
(END)
```

可以看到，我们有一条提交记录。我们创建一个新的branch，先不使用orphan参数。

```shell
➜  test git:(master) git branch test master
➜  test git:(master) git checkout test
切换到分支 'test'
➜  test git:(test) git log
commit 80674b32438bd3bfe0de6d6183b91ea8bdfca129 (HEAD -> test, origin/master, master)
Author: ErYoung2 
Date:   Fri Jul 8 22:35:21 2022 +0800

    test1
(END)
```

我们再使用orphan参数。

```shell
➜  test git:(test) git checkout --orphan test2
切换到一个新分支 'test2'
➜  test git:(test2) ✗ git log
fatal: 您的当前分支 'test2' 尚无任何提交
```

就可以发现，新建的分支test2是没有提交记录的。

## 作用

这个主要两个作用：

1. 减少仓库数量，我们可以直接切换就好

2. 减少新分支对于原分支的依赖，可以不受原分支.git历史文件的干扰，从而可以达到在旧仓库达到git init的效果，进而方便自己的管理。
