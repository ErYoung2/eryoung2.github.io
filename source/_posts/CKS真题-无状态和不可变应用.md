---
title: CKS真题 -- 无状态和不可变应用
date: 2024-04-28 15:40:46
tags: cks
categories: 考试
---

## 任务
检查在namespace development中运行的pod，并删除任何非无状态和非不可变的pod

名词解释：
无状态应用：指应用本身不依赖于持久化的状态数据，没有存储挂载，更强调每个请求的独立性。
不可变应用：一旦程序部署完成，其状态不会在运行时被直接修改，更强调pod的稳定性和不变性。

主要删除的就是两种pod:
1. privileged: true的pod # 允许特权的pod
2. readOnlyRootFileSystem: false #只读文件系统为false的pod
3. 有pvc、hostpath挂载的
4. ConfigMap、Secret、Download API、emptyDir不算。

## 解题
1. 检查development下所有pod
```shell
kubectl get pod -n development
```

2. 挨个检查，如果发现非无状态应用和非不可变应用就删掉。
```shell
kubectl get pod xxx -n development -oyaml |grep -E "privileged|readOnlyRootFileSystem" #检查非不可变应用
kubectl get pod xxx -n development -oyaml|grep "persistentvolumeclaim" #检查非无状态应用
kubectl get pod xxx -n development -oyaml|grep "hostpath"

kubectl delete pod xxx -n development
```


