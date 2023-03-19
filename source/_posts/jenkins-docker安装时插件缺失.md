---
title: jenkins docker安装时插件缺失
date: 2022-09-19 00:37:45
tags: jenkins
categories: 工具使用
---

## 前言

今天又试着装了一下docker版的jenkins，今天用了<font color="red">jenkins:2.60.3</font>这个镜像，发现某些插件没有，导致安装不成功。

```shell
an error occurred during installation:No such plugin: cloudbees-folder
```

## 解决

我检查了一大圈，发现这个带版本的镜像<font color="red">jenkins:2.60.3</font>的确没有此插件，从其他地方下载也没办法放到镜像里边去，所以需要换一个jenkins镜像。

换到<font color="red">jenkins/jenkins</font>就好了。

## 后记

后来发现之前写的文章，发现用的就是这个<font color="red">jenkins/jenkins</font>镜像，词镜像里的插件比较全，就没遇到类似问题。

## 文章链接：

> [docker 安装jenkins - eryoung2 - 博客园](https://www.cnblogs.com/young233/p/14815787.html)
