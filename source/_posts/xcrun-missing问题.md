---
title: xcrun missing问题
date: 2023-09-11 00:37:51
tags: Mac
categories: 环境配置
---



## 前言

今天在安装brew的时候，发现以下问题：

```textile
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```



## 解决

* 重装xcode command line
  
  ```shell
  xcode-select --install
  ```



* 没解决的话，可以跑这条
  
  ```shell
  sudo xcode-select -switch /
  ```



## 参考

> https://www.jianshu.com/p/50b6771eb853
