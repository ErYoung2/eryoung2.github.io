---
title: ACP云原生容器工程师 - ACK对比ASK
date: 2023-03-12 14:36:38
tags: 阿里云ACP认证
categories: 考试
---



## 前言

我们都知道，ACK与ASK是阿里云两种不同的业务形态，那么它们有何异同呢？



## ASK的容器是一等公民

由于ACK需要先部署ECS，然后在ECS上部署应用容器，这时容器就是二等公民；

而ASK无需部署ECS，可以直接在ECI上部署应用容器，因此容器是一等公民。



## ASK适用场景

由于ASK的弹性伸缩能力较ACK更强更灵活，所以适用场景均为弹性相关。

1. 应用托管

2. 在线业务弹性

3. 数据计算

4. CI/CD持续集成

5. 定时任务

6. 测试环境



## ASK核心功能

### 虚拟节点

* ASK集群中基于虚拟节点创建Pod
  
  * 虚拟节点实现了Kubernetes与弹性容器实例ECI的无缝连接，让Kubernetes集群获得极大的弹性能力，而不必关心底层计算虚拟容量。可通过客户端查看服务情况，虚拟节点不占用任何计算资源。



### Pod安全隔离

* ASK集群中的Pod基于阿里云弹性容器实例ECI运行在安全隔离的容器运行环境中。

* 每个容器实例底层通过轻量级虚拟化安全沙箱技术完全强隔离，容器实例间互不影响。

* 实例在调度时尽可能分布在不同的物理机上，进一步保障了高可用性。

* ECI的容器实例底层运行在Allibaba Cloud Linux2操作系统之上，ASK集群作为Serverless容器服务，您无法访问ECI底层OS运行环境。另外，此系统可免费使用。



### Pod配置

* Pod基于弹性容器实例ECI创建，支持原生的Kubernetes Pod功能，包括启动多个容器、设置启动多个容器、设置环境变量、设置RestartPolicy、设置健康检查命令和挂载Volume、preStop等。

* 同时支持执行命令kubectl logs访问容器日志和智行kubectl exec进入容器

* ECI支持多种规格配置的方式来申请资源和计费
  
  * 制定CPU和Memory，包括容器和pod两种
  
  * 制定Pod的ECS规格
  
  * 抢占式实例



### 应用负载管理

* 支持Deployment、StatefulSet、Job/CronJob、Pod、CRD等原生Kubernetes负载类型。

* 不支持DaemonSet，Serverless集群中不支持节点相关的功能



### 弹性伸缩

* ASK集群中没有真实节点
  
  * 无需考虑节点的容量规划
  
  * 无需考虑基于cluster-autoscaler的节点扩容
  
  * 只考虑应用的按需扩容

* 可配置HPA或CronHPA策略进行Pod的灵活按需扩容



### 网络管理

* 群众的ECI Pod默认使用Host网络模式，占用交换机VSwitch的一个弹性网卡ENI资源，与VPC内的ECS、RDS互联互通。
  
  * Service：不支持Nodeport模式
  
  * Ingress：需要先安装Ingress Controller
  
  * 服务发现：需要先开启PrivateZone
  
  * 弹性公网：支持给ECI Node挂载EIP，或自动创建然后绑定到EIP实例上



### 存储管理

* Pod支持挂载阿里云块存储和文件存储
  
  * 阿里云块存储(EBS)，需要先创建DiskController
  
  * 阿里云文件存储(NAS)，可使用NFS方式挂载NAS目录，无需安装flex-volume插件，可直接制定NAS目录



### 日志管理

* 在ASK集群中无需部署logtail daemonset即可收集Pod的stdout和文件输出日志

* 在Serverless Kubernetes集群中将业务容器的标准输出和日志文件收集到阿里云日志服务

* ECI模式下不支持DaemonSet，通过将Job类任务挂载NAS盘，把输出的日志存储在NAS盘，在通过另一个同样挂载NAS盘的Pod来采集Job任务标准输出到日志系统中

* 日志服务支持在ECI中通过Sidecar模式采集日志



## 总结

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/12-15-02-27-%E6%88%AA%E5%B1%8F2023-03-12%2015.02.04.png)
