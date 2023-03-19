---
title: linux添加BBR加速
date: 2022-09-16 04:15:28
tags: linux
categories: 操作系统
---

## BBR简介

TCP BBR是由来自Google的 Neal Cardwell 和 Yuchung Cheng 发表的新的TCP拥塞控制算法，目前已经在Google内部大范围使用并且随着linux 4.9版本正式发布。可大幅提升上网的访问速度。

## BBR添加

1. 查看内核版本，需要大于4.9
  

```shell
uname -r
```

2. 开启BBR
  

```shell
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
```

3. 生效
  

```shell
sysctl -p
```

4. 检查状态
  

```shell
lsmod | grep bbr
```

## 后记

本文只是记录BBR使用方法，至于通信原理尚在研读当中，如有进展会再出一篇文章进行讲解。
