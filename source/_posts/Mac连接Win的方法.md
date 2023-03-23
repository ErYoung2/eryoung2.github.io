---
title: Mac连接Win的方法
date: 2023-03-22 22:43:50
tags: Mac
categories: 操作系统
---

## 前言

我们都知道，Mac和Win还是非常不一样的，作为Macdows双修选手，我今天给大家介绍一些从Mac连接Win的方法。

## Win的RDP

由于Win默认未安装ssh，我们最常使用的连接方式则是使用RDP(Remote Desktop Protocol)，其在windows上开启的方法为：

右键文件管理器-属性-远程桌面，点击开启。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/22-22-51-08-WX20230322-225022%402x.png)

这时Windows的3389端口启用，我们可以通过RDP协议进行连接。

## Mac连接Win

### 不要用Mac平台的软件

由于Mac系统的封闭性，能使用的软件本来就少，还特娘的要钱，就不好用，就坑得要死。

因此我并不建议大家使用Mac平台的工具进行连接，很蠢。

尤其是这个，绝壁大蠢货。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/22-22-54-42-WX20230322-225402%402x.png)

### 可以曲线救国使用虚拟机来连接

还是由于Mac系统的封闭性，我们通常需要扩展虚拟机来实现更多的功能。通常的虚拟机就两种，Linux和Windows。Linux有很多发行版，比如Centos、Ubuntu、Debian等；Windows的话，如果你是ARM架构，目前能用的也就是Win11 on Arm。

### 哪个系统好用捏？

我猜，能看到我文章的各位彦祖冰冰们，你们都是贼厉害的那种。

### 如果你用Windows

如果你用Windows的话，需要注意Win11 on ARM非常吃内存，一般能用到6G左右。而且毕竟是ARM架构的，使用起来总是有种阉割版的感觉。我个人不推荐ARM架构安装Windows虚拟机，或者你装了，偶尔开一下，不能做主力机用。

对于Windows连接Windows，各位应该很熟悉，使用mstsc就可以。但是我发现ARM架构的Windows，mstsc应该是被阉割过的，用起来不如X86架构用起来丝滑。

### 如果你用Linux

对于Linux各发行版，我个人觉得Ubuntu的图形界面比较好康，而且CentOS 7有点老了，CentOS 8没几个人用，所以优先使用Ubuntu。我当时用PD装的时候，默认给了22.04版本。

在Ubuntu中，有一个很强的工具：**Remmina**，肥肠强！

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/22-23-05-38-WX20230322-230523%402x.png)

### Remmina

打开Remmina后，可添加RDP或者VNC来连接其他服务器。比如本文中的连接Win，就添加RDP来做配置。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/22-23-08-40-WX20230322-230826%402x.png)

填好信息之后，保存，连接即可。

## 小结

1. Mac平台的连接软件都十分辣鸡

2. Win11 on ARM十分鸡肋，mstsc更是被阉割过的

3. Ubuntu 22.04的Remmina十分给力！！！
