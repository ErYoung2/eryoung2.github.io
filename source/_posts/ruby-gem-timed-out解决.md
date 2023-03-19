---
title: ruby gem timed out解决
date: 2022-07-23 03:33:00
tags: ruby
categories: 环境配置
---

## 前言

今天在折腾vagrant的时候，发现当我安装vagrant时，需要一些ruby插件。

如果我们没有设置正确的源，就会报time out的错误。

```shell
ERROR: While executing gem ... (Gem::RemoteFetcher::UnknownHostError)
    timed out (https://api.rubygems.org/latest_specs.4.8.gz)
```

## 解决

可以使用国内源。

```shell
gem sources --remove https://rubygems.org/
gem sources -a https://gems.ruby-china.com/
```

就可以了。

## 鸣谢

[ruby gems中文官网](https://gems.ruby-china.com)

[Ruby Gem Timeout【超时】问题的解决_Joel__Li的博客-CSDN博客](https://blog.csdn.net/Never__Give_Up_/article/details/100592393)
