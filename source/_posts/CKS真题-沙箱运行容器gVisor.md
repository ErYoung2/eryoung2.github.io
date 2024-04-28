---
title: CKS真题 -- 沙箱运行容器gVisor
date: 2024-04-28 11:53:00
tags: cks
categories: 考试
---

## 任务
使用名为runsc的现有运行时处理程序，创建一个名为untrusted的RuntimeClass。
更新namespace server中的所有Pod以在gVisor上运行。
您可以在/cks/gVisor/rc.yaml中找到一个模版清单。

## 解题
1. 创建名为untrusted的RuntimeClass
 vim cks-08.yaml
 ```yaml
 apiVersion: node.k8s.io/v1
kind: RuntimeClass
metadata:
  name: untrusted
handler: runsc
 ```
kubectl apply -f cks-08.yaml

2. 更新namespace server下的所有pod，使其在gVisor下运行
```shell
kubectl get pods -n server
kubectl edit pod xxx
# 在spec下添加runtimeClassName: untrusted
```

## 参考
> https://kubernetes.io/zh-cn/docs/concepts/containers/runtime-class/
