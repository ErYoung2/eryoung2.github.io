---
title: hexo博客迁移 from mac to mac
date: 2023-03-08 23:34:54
tags: hexo
categories: 博客迁移
---

## 前提

前段时间我的MBP15留在家里给老妈做视频播放器了，这段时间重新收了一台Mac mini来使用。由于前一台电脑大部分内容均已备份，剩余的东西也就是此博客，所以我就把它放在iCloud里边，一并同步过来了。

但是我发现这个迁移也会遇到些蛋疼的问题，我们一个一个来说。

## 问题

### 1. node_modules依赖太多

我们都知道，对于hexo来说，它是用nodejs来搭建的，所以会有超多的小文件在node_modules下面。而我遇到的第一个问题则是，iCloud同步小文件时非常、非常、非常慢。

这个问题也好解决，把博客打个包然后拷贝出来就行了。可以直接使用Mac的实用工具进行打包，做完以后是一个zip文件，然后将其拷贝出来即可。

### 2. node没安装

由于我只是备份了文档，应用并未安装，所以需要重新安装nodejs。

这里可以移步官网，自行下载相应版本并进行安装，安装之后在terminal输入**node -v**进行验证。

### 3. hexo组件未安装

在解压并进入博客目录后，会发现大部分的内容是在的，只是hexo相关组件还未安装。

可以删除掉node_modules文件夹和package-lock.json文件，并重新安装hexo插件。

```zsh
rm -rf node_modules package-lock.json
sudo npm install --unsafe-perm --verbose -g hexo  
```

安装完毕之后，可使用hexo g或者hexo s进行测试，一般就ok的了。

## 后记

此法用于Mac->Mac迁移，Mac->Windows会麻烦一些，之前我也做过一次，太蛋疼了，虽然成功了，但是还是不推荐这么迁移。

## 引用与鸣谢

> nodejs官网 [Node.js](https://nodejs.org/en/)
> 
> [安装Hexo的问题 | my lab](https://gwang-cv.github.io/2017/08/25/%E5%AE%89%E8%A3%85Hexo%E7%9A%84%E9%97%AE%E9%A2%98/)
