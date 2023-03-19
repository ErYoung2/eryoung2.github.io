---
title: podman网络缺失
date: 2022-07-30 03:37:47
tags: podman
categories: 容器
---



## 前言

podman由于没有daemon，使用的时候会出现network问题。

今天打算跑一个busybox时，发现报错：

```shell
root@home:~/manifests# podman run -it busybox
ERRO[0000] error loading cached network config: network "podman" not found in CNI cache
WARN[0000] falling back to loading from existing plugins on disk
ERRO[0000] Error tearing down partially created network namespace for container 25909b12b14aa8a8d1c1934e6e58b5cb55ca0e4e9af45fdff359620f3bc290ce: CNI network "podman" not found
Error: error configuring network namespace for container 25909b12b14aa8a8d1c1934e6e58b5cb55ca0e4e9af45fdff359620f3bc290ce: CNI network "podman" not found
```

## 原因

没有podman所支持的网络环境。

## 解决

可以跑以下命令：

```shell
root@home:~/manifests# podman network create podman
/etc/cni/net.d/podman.conflist
```

然后问题解决，就可以启动容器了。

```shell
root@home:~/manifests# podman run -it busybox
/ #
```

## 鸣谢

[Running podman with sudo returns `error loading cached network config: network &quot;podman&quot; not found in CNI cache` · Issue #12651 · containers/podman · GitHub](https://github.com/containers/podman/issues/12651)
