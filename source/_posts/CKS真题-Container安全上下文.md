---
title: CKS真题 -- Container安全上下文
date: 2024-04-28 14:20:03
tags: cks
categories: 考试
---

## 任务
按照如下要求修改sec-ns命名空间里的Deployment secdep
1、用ID为30000的用户启动容器（设置用户1D为：30000）
2、不允许进程获得超出其父进程的特权（禁止allowPrivilegeEscalation）
3、以只读方式加载容器的根文件系统（对根文件的只读权限）

## 解题
1. 修改deployment secdep，添加配置
kubectl edit deploy secdep -n sec-ns
```yaml
spec:
  securityContext:                        #增加这两行完成任务1
    runAsUser: 30000
  ...
  containers:           
    securityContext:                      #增加这三行完成任务2，3
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
  ...
  containers:                             #如果有多个容器，每个容器都要增加这三行
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
```

2. 保存，检查是否添加成功，不成功说明没加对，需要重新添加
kubectl -n sec-ns get all

## 参考
> https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/security-context/
