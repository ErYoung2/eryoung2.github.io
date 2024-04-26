---
title: CKS真题 -- kube-bench修复不安全项
date: 2024-04-27 01:05:49
tags: cks
categories: 考试
---

## 任务
通过配置修复所有问题并重新启动受影响的组件以确保新的设置生效。

修复针对 API 服务器发现的所有以下违规行为：
1.2.7 Ensure that the --authorization-mode argument is not set to AlwaysAllow FAIL
1.2.8 Ensure that the --authorization-mode argument includes Node FAIL
1.2.9 Ensure that the --authorization-mode argument includes RBAC FAIL
1.2.18 Ensure that the --insecure-bind-address argument is not set FAIL （1.25中这项题目没给出，但最好也检查一下，模拟环境里需要改）
~~1.2.19 Ensure that the --insecure-port argument is set to 0 FAIL ~~（1.25中这项题目没给出，不需要再修改了）

修复针对kubelet发现的所有以下违规行为：
Fix all of the following violations that were found against the kubelet:
4.2.1 Ensure that the anonymous-auth argument is set to false FAIL
4.2.2 Ensure that the --authorization-mode argument is not set to AlwaysAllow FAIL
注意：尽可能使用 Webhook 身份验证/授权。

修复针对etcd发现的所有以下违规行为：
Fix all of the following violations that were found against etcd:
2.2 Ensure that the --client-cert-auth argument is set to true FAIL

## 解题
1. 备份文件
```shell
mkdir -p /opt/backup/01
cp -f /etc/kubernetes/manifests/kube-apiserver.yaml /opt/backup/01
cp -f /etc/kubernetes/manifests/etcd.yaml /opt/backup/01
cp -f /var/lib/kubelet/config.yaml /opt/backup/01
```

2. 检查master的不安全项并修改
ssh hk8s-master
sudo kube-bench master
vim /etc/kubernetes/manifests/kube-apiserver.yaml
```yaml
    --authencation-mode=Node,RBAC 
```

vim /etc/kubernetes/manifests/etcd.yaml
```yaml
    --client-cert-auth=true
```

vim /var/lib/kubelet/config.yaml
```yaml
   authentication:
      anonymous:
        enabled: false     #true修改成false
   ...
   authorization:
      mode: Webhook        #把AlwaysAllow修改成Webhook
```

3. 检查node的不安全项并修改，同master

4. 重启kubelet
```shell
systemctl daemon-reload
systemctl restart kubelet
```



