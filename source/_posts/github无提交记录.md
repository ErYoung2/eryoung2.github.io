---
title: github无提交记录
date: 2023-04-17 13:07:37
tags: git
categories: 版本控制
---



## 前言

前段时间我修改了自己github账号的邮箱，后来发现一个尴尬的问题，提交之后在github的账号页看不到提交记录，很奇怪。



## 问题

需要更新github仓库配置，与新设置的github邮箱一致。



## 修改

```shell
cd <your repository>
git config --global user.email "Your new email address"
```



再提交就好了。
