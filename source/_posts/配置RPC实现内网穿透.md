---
title: 配置FRP服务实现内网穿透
date: 2026-09-19 00:40:11
tags: FRP
categories: 内网穿透
---

## 背景
由于笔者长期在户外办公，导致很多时候无法直接连接家里的内网环境，而有时候需要连一下，所以就总结了一下怎么做FRP服务实现内网穿透的方法，供大家参考。

## 环境准备
1. 带公网ip的vps，笔者的机器是腾讯云的轻量云服务器。
2. 内网的windows机器，已配置RDP

## 原理
如果我们需要使用FRP，需要搞清楚它的原理。它就是在客户端（C端）和服务端（S端）之间创建一条专有链接，服务器可以将固定ip和端口的流量链接到客户端，从而实现对应的穿透。因此我们需要在服务端装FRPS，在客户端装FRPC，然后将其配置并跑通，即可实现内网穿透。

## 实操
### 服务端
1. 下载frps安装包，根据你机器的版本进行下载（x86还是arm，linux还是windows）
https://github.com/fatedier/frp/releases?utm_source=gemini

2. 解压
```shell
tar -zxvf frp_*_linux_amd64.tar.gz -c /opt
cd /opt/ && mv frp_*_linux_amd64 frps
cd frps
```

3. 编辑服务器配置文件frps.toml（假设是7000端口）
```config
bindPort = 7000           # frp 服务通讯端口
auth.token = "自定义高强度密码" # 身份验证密钥，客户端需一致
```

4. 启动服务端
```shell
./frps -c ./frps.toml &
```

5. 做成服务（可选）
```shell
cat <<EOF | sudo tee /etc/systemd/system/frps.service
[Unit]
Description=frp server
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
# 路径根据你的实际存放位置调整，此处以 /opt/frp 为例
ExecStart=/opt/frp/frps -c /opt/frp/frps.toml
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload

sudo systemctl enable frps --now
```

6. 检查状态
```shell
sudo systemctl status frps
```

7. 放通vps的安全组端口，我的例子是7000和7001

### 客户端
1. 下载frpc安装包，根据你机器的版本进行下载（x86还是arm，linux还是windows）
https://github.com/fatedier/frp/releases?utm_source=gemini

2. 下载nssm，是windows服务的安装器
https://nssm.cc/

3. 单独解压nssm，将其放置在单独的文件夹中，并添加环境变量。

4. 解压frpc安装包，编辑frpc.toml文件
```config
serverAddr = "你的VPS公网IP"
serverPort = 7000
auth.token = "自定义高强度密码" # 与服务端一致

[[proxies]]
name = "rdp"
type = "tcp"
localIP = "127.0.0.1"
localPort = 3389
remotePort = 7001        # 映射到 VPS 的外部访问端口
```

5. 利用nssm生成frpc服务，并安装到windows

6. 关闭windows防火墙，使其可以通过RDP流量或者frpc的流量。这一点我搞不懂怎么弄，所以直接关掉了，各位如果有兴趣可以研究下。。。

## 测试结果
连接公网ip的7001端口，输入windows机器的登录用户密码，测试是否可以连接（可能比较慢，但是应该有相应的过程，如果没有或者connection rejected，则为配置失败，需要重新检查）


## 参考
> [NSSM配置自定义服务](https://www.cnblogs.com/test-gang/p/18435566)




