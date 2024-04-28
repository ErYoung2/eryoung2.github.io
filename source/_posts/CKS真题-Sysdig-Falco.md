---
title: CKS真题 -- Sysdig & Falco
date: 2024-04-28 14:12:09
tags: cks
categories: 考试
---

## 任务
使用运行时检测工具来检测 Pod tomcat123 单个容器中频发生成和执行的异常进程。 

有两种工具可供使用： 
- sysdig
- falco 
注： 这些工具只预装在 cluster 的工作节点node02，不在 master 节点。 

使用工具至少分析 30 秒，使用过滤器检查生成和执行的进程，将事件写到 /opt/KSR00101/incidents/summary 文 件中，其中包含检测的事件， 格式如下： [timestamp],[uid],[processName] 保持工具的原始时间戳格式不变。 
注：确保事件文件存储在集群的工作节点上。

## 做题
1. 找到containerd的sock
```shell
crictl info | grep sock
"containerdEndpoint": "/run/containerd/containerd.sock",
```

2. 找到目标container
```shell
crictl ps|grep tomcat123
```

3. 通过sysdig扫描容器并输出
```shell
sysdig -l | grep time
sysdig -l | grep uid
sysdig -l | grep proc
sysdig -M 30 -p "%evt.time,%user.name,%proc.name" --cri /run/containerd/containerd.sock container.name=tomcat123 >> /opt/KSR00101/incidents/summary
```

如果没检测到sysdig，就跑这一行：
```shell
sysdig-probe-loader
```
