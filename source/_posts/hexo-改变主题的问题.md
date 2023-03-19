---
title: hexo 改变主题的问题
date: 2022-06-06 10:23:08
tags: hexo
categories: 错误排查
---

## 前言

Hexo改变主题后部署报错：

```log
extends includes/layout.pug block content include includes/recent-posts.pug include includes/partial
```

## 解决

1 安装插件

```shell
npm install --save hexo-renderer-jade hexo-generator-feed hexo-generator-sitemap hexo-browsersync hexo-generator-archive
```

2 清空缓存

```shell
hexo clean
```

3 重新部署

```shell
hexo g
```
