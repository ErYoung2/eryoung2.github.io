---
title: sing-box和cloudflare warp做流量分流的方案
date: 2026-08-12 10:11:55
tags: [Gemini, Sing-box]
categories: AI探索
---

## 前言
由于平时工作学习需要用到谷歌搜索，因此笔者是谷歌全家桶深度用户。而对于谷歌的AI--Gemini，笔者也是使用了一段时间，觉得还是很牛的，但是由于Gemini对于地区的差异，国内和香港无法直接使用（国内需要开通专业版本），如果想使用免费版本，需要一些操作才可以正常使用。

## 配置

### 前提
需要一台带有海外ip地址的VPS，最好使用linux操作系统。具体我就不讲了，大家可以自行购买。

### 搭建Sing-Box代理
Singbox是由 nekohasekai 等开发者开发的自由且开源的通用代理平台，使用 Go 语言编写。它被誉为代理工具中的“瑞士军刀”，支持创建代理客户端、服务器以及透明代理，性能强劲且协议支持极为全面。它有以下特点：
1. 支持Shadowsocks、VMess、VLESS、Trojan、Hysteria/Hysteria2、TUIC、WireGuard等协议
2. 支持Windows、Linux、macOS、Android、iOS 以及 tvOS 等操作系统

因此它很适合搭建代理，科学上网。

我们可以使用以下命令来安装sing-box：
```shell
bash <(wget -qO- -o- https://github.com/233boy/sing-box/raw/main/install.sh)
```

然后就可以得到一串链接，记下这串链接,放通相关安全组的端口。

### 使用CF的warp协议做流量分流
由于我们使用的VPS ip都是机房ip，gemini检测时会认为不正常，导致无法使用，因此我们可以使用CloudFlare的warp安全连接服务来转换ip，使用一些非机房的ip地址，来规避gemini的检测。

我们可以这么做：
1. 安装sing-warp安全连接服务并保证开机自启
```shell
bash <(curl -L https://raw.githubusercontent.com/wy580477/sing-warp/main/install.sh)
systemctl enable sing-warp
```

2. 可以编辑配置文件，控制哪些流量需要转换ip
针对本文所述的gemini, 我们有移动端和网页端的域名，并不一样, 可以编辑配置文件来自定义。
网页端域名后缀：google.com
移动端域名后缀：googleapis.com

3. 重启sing-warp服务
```shell
systemctl restart sing-warp
```

### 使用客户端连接服务
下载sing-box的APP并安装，各版本都有：
> https://sing-box.sagernet.org/zh/clients/

载入sing-box的链接后，即可试图连接，使用。


## 参考

> [Sing-box安装](https://github.com/233boy/sing-box/wiki/sing-box%E6%90%AD%E5%BB%BA%E8%AF%A6%E7%BB%86%E5%9B%BE%E6%96%87%E6%95%99%E7%A8%8B)
> 
> [warp服务的安装](https://github.com/wy580477/sing-warp)