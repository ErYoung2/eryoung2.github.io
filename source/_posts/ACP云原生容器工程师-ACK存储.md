---
title: ACP云原生容器工程师-ACK存储
date: 2023-02-14 16:00:14
tags: 阿里云ACP认证
categories: 考试
---

## 概述

- 在Kubernetes里最小的管理单元是Pod

- Pod中产生的数据都是临时的，Pod销毁后默认不保存

- 对于有状态的服务，需要数据持久化

- 所以Kubernetes给定了一些数据持久化的方案

## Kubernetes存储应用场景

- 服务的基本配置文件读取、密码密钥管理等

- 服务的存储状态、数据存储等

- 不同服务或应用程序间共享数据

## Kubernetes存储系统核心概念

### Volumn

- Pod可以同时使用任意数目的卷类型

- 临时卷类型的生命周期与Pod相同，但持久化卷可以比Pod的存活时间长

- 卷的存在时间会超出Pod中所有容器，且在Pod重启时会重新加载

### 持久卷(PV)

- 是集群中管理员集中配置的一块存储

- 它是集群中的资源，就和节点是集群资源一样，包含存储的类型、大小和访问模式等

- PV是卷插件比如Volumes等。但是它的生命周期独立于使用PV的任何Pod个体。比如，Pod销毁时，PV会得以保留。

### 持久卷声明(PVC)

- 是用户关于存储的请求

- 描述对PV的一个请求，请求信息包含PV大小、访问模式等，PVC会消耗PV资源

## Kubernetes存储插件

- Kubernetes可以直接调用某种存储插件，对接后端存储服务，现阶段存储插件有20多种。

- Kubernetes的存储插件可以分为：In-tree和Out-of-tree两大类
  
  - In-tree: 源码放在Kubernetes内部，和Kubernetes一起发布、更迭，缺点是及时迭代速度慢、灵活性差
  
  - Out-of-tree: Volume Plugins独立于Kubernetes，它是由存储商提供实现的。主要有FlexVolume和CSI两种，ACK主要使用此类插件

## ACK存储插件

### FlexVolume

- 社区较早实现的存储卷扩展机制

- FlexVolume运行在host空间，不能使用RBAC访问Kubernetes API，导致功能受到很大限制

- 由Shell部署

### CSI

- 社区推荐的存储卷扩展机制

- ACK集群提供的CSI存储插件兼容社区的CSI特性

- CSI不仅仅支持Kubernetes平台存储插件接口，而是作为云原生生态中容器存储接口的标准

- CSI是容器部署的

## CSI存储插件

### 概念要点

- 遵循标准CSI规范，支持EBS、NAS、OSS等存储类型的挂载行为

- 自ACK v1.16开始，部署集群会默认安装最新版本的CSI组件，可以通过CSI存储插件使用阿里云存储服务

- CSI存储插件提供了数据卷的全生命管理周期，包括数据卷的：创建、挂载、卸载、删除、扩容等服务

- ACK目前只支持一种存储插件，CSI或者FlexVolume

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-04-38-sp1.png)

### 插件特性

- CSI是Kubernetes社区推荐的存储插件方案，CSI插件包括以下两部分：
  
  - CSI-Plugin: 实现数据卷的挂载、卸载功能。ACK默认提供云盘、NAS、OSS三种存储卷的挂载能力
  
  - CSI-Provisioner: 实现数据卷的自动创造能力，目前支持云盘、NAS两种存储卷创造能力。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-04-48-plugin1.png)

### CSI存储插件选择(EBS, NAS, OSS)

#### 选择EBS的情景

EBS(阿里云云盘)是阿里云提供的数据块级别的块存储产品，优势是性能高、时延低，适合于OLTP数据库、NoSQL数据库等IO密集型的高性能、低时延的应用工作负载。

#### 选择NAS的情景

无需修改应用，可直接挂在NAS。文件存储NAS适用于多计算节点、无状态集群的共享数据访问。

#### 选择OSS的情景

OSS采用扁平化的文件组织形式，采用Restful API接口访问，不支持文件随机读写，适用于互联网架构的海量数据的上传下载和分发。

## 通过控制台使用云盘静态存储卷

### 前提条件

1. 已创建一个ACK集群，并且在该集群中部署CSI集群

2. 创建了一个按需付费的云盘

### 创建PV

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-05-06-pv1.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-05-16-pv2.png)

### 创建PVC

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-05-28-pvc.png)

### 创建应用

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-05-39-app1.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/14-16-06-13-app2.png)

## 小结

- Kubernetes存储核心概念：Volume、PV、PVC

- Kubernetes插件存储分类：In-tree和Out-of-tree两类

- ACK支持的存储插件模式：FlexVolume和CSI

- ACK支持通过Pod绑定的三种存储形态：EBS、NAS、OSS
