---
title: hexo添加图床
date: 2022-06-16 23:10:16
tags: hexo
categories: 博客优化
---

## 前言

如果大家用过Markdown的话，就会知道在markdown里边插入图片时非常蛋疼，但凡换个地方来发布，图片就会404.

由于我最近在github pages上建了一个blog，我也遇到了这个问题，这时候就得找找办法。经过查询资料，我发现可以通过github创建图床来解决，效果不错。

当然，需要我们提前打开一个功能，在_config.yml中打开**post_asset_folder**, 将其置为true。

```yaml
post_asset_folder: true
```

## 图床

顾名思义，图床就是对博客图片的集中管理。目前比较好用的应用有SM.MS、iPic、Picgo等。由于我这里使用MarkText来写博客，而MarkText也支持了创建图床的功能，故直接使用此功能来做图床。

## 创建过程

### 1. 在github上创建一个git仓库

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/16-23-34-48-git.png)

### 2. 创建一个Access token

在"**用户-Setting-Developer Settings**"下建立一个access token，创建之后有一串密文，将其保存下来。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/16-23-35-02-token.png)

### 3. 在MarkText设置图床

打开MarkText的**reference-image**, 按如下内容做设置

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/16-23-35-24-setup.png)

然后就可以了。不得不说，挺好用的哈哈。
