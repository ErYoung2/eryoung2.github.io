---
title: CKS真题 -- TLS通信增强
date: 2024-04-28 14:24:48
tags: cks
categories: 考试
---

## 任务
通过TLS加强kube-apiserver安全配置，要求
1、kube-apiserver除了VersionTLS13及以上的版本可以使用，其他版本都不允许使用。
2、密码套件（Cipher suite）为TLS_AES_128_GCM_SHA256

通过TLS加强ETCD安全配置，要求
1、密码套件（Cipher suite）为TLS_AES_128_GCM_SHA256

## 做题
1. 备份相关配置文件
```shell
mkdir -p /opt/backup/14
cp -f /etc/kubernetes/manifests/kube-apiserver.yaml /opt/backup/14
cp -f /etc/kubernetes/manifests/etcd.yaml /opt/backup/14
```

2. 修改配置文件
```yaml
# kube-apiserver.yaml
spec:
  containers:
  - command:
    - kube-apiserver
    - --tls-min-version=VersionTLS13 #任务1
    - --tls-cipher-suites=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 #任务2
```

```yaml
# etcd.yaml
  containers:
  - command:
    - etcd
    - --cipher-suites=TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 #任务3
```

3. 重启kubelet
```shell
systemctl daemon-reload
systemctl restart kubelet
```

4. 检查
```shell
kubectl get pods -A #观察kube-apiserver和etcd是否重启
```

## 参考
> https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-apiserver/




