---
title: CKS真题 -- Trivy 扫描镜像安全漏洞
date: 2024-04-28 12:21:03
tags: cks
categories: 考试
---

## 任务
使用 Trivy 开源容器扫描器检测 namespace kamino 中 具有严重漏洞的镜像 的 Pod。
查找具有 High 或 Critical 严重性漏洞的镜像，并删除使用这些镜像的 Pod 。
注意：Trivy 仅安装在 cluster 的 master 节点上， 在工作节点上不可使用。 你必须切换到 cluster 的 master 节点才能使用 Trivy

## 解题
1. 登录到相应的master节点，查看kamino namespace下的pod
```shell
ssh xxx-master
kubectl get pod -n kamino -oyaml|grep "image:"
```

2. 使用Trivy工具挨个扫描，观察是否有HIGH或者CRITICAL（过程有点久，可以在扫描的时候新开一个terminal做其他题目，扫描完毕之后再看）
```shell
trivy image -s "HIGH,CRITICAL" xxx|grep -i "Total"
```

3. 删除有HIGH或者CRITICAL漏洞的pod
```shell
kubectl delete pod xxx -n kamino --force
```

