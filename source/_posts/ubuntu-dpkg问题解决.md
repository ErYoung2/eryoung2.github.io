---
title: ubuntu dpkg问题解决
date: 2022-08-15 14:58:36
tags: ubuntu
categories: 错误排查
---

## 问题

今天玩ubuntu发现以下报错：

```shell
dpkg was interrupted, you must manually run sudo dpkg –configure -a to correct the problem
```

## 解决

```shell
sudo rm /var/lib/apt/lists/lock

sudo rm /var/cache/apt/archives/lock

cd /var/lib/dpkg/updates

sudo rm *

sudo apt-get update
```

或者杀掉apt进程，参考我另一篇博客。

[ubuntu could not get lock /var/lib/dpkg/lock 解决方法 - eryoung2 - 博客园](https://www.cnblogs.com/young233/p/12445729.html)
