---
title: ACP云原生容器工程师-ACK Pro概述
date: 2023-02-10 18:04:53
tags: 阿里云ACP认证
categories: 考试
---

## ACK Pro集群概述

### 对比ACK托管版集群

- 相比ACK托管版，针对企业版大规模生产环境进一步增强了可靠性、安全性

- 继承了原托管版集群的所有优势

- 提供可赔付的SLA的Kubernetes集群

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-08-24-vs%20ack%20tuoguan.png)

### 对比标准版集群

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-08-37-vs%20biaozhun.png)

## ACK Pro各种集群

### 可靠性强化集群

更可靠的托管Master节点，API Server自动弹性，保证集群平滑扩容海量节点。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-09-39-kekao.png)

### 安全性强化集群

开放安全管理，并提供针对运行中容器更强检测和自动修复能力的安全管理高级版，与KMS结合会更安全。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-09-49-anquan.png)

### 调度性强化集群

- 集成更强调度性能的kube-scheduler，支持多种智能调度算法

- 优化在大规模数据计算、高性能数据处理等业务场景下的容器调度能力

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-10-00-diaodu.png)

### ACK Pro显著特点

- 可靠的强化集群

- 提升安全性的集群

- 调度能力更强

#### ACK Pro版适用行业

- 金融企业

- 互联网企业

- 大数据计算企业

- 开展中国业务的海外企业

## ACK Pro适用场景

### 弹性伸缩架构

- 容器服务可以根据业务流量自动对业务扩容、缩容，不需要人工干预

- 避免流量激增扩容不及时导致系统挂掉，以及平时大量资源闲置

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-14-45-shensuo.png)

### DevOps持续交付

### 云原生AI

- 深度学习的三个核心问题：性能、效率、成本

- ACK Pro无缝整合了云的计算、存储、负载均衡等服务，同时贯穿了深度学习的全生命周期

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-14-55-cncf.png)

### 微服务架构

- 企业生产环境中，通过合理微服务拆分，将每个微服务应用存储在阿里云镜像帮您管理

- 您只需迭代每个微服务应用，有阿里云容器服务ACK提供调度、编排、部署、灰度发布

- 帮助企业快速实现敏捷开发和部署落地，加速企业业务迭代

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-15-18-microservice.png)

### 混合云架构

- 在容器服务控制台上同时管理云上云下的资源，不需要在多种云管理控制台中反复切换

- 基于容器基础设施无关的特性，使用同一套镜像和编排同时在云上云下部署应用

- 基于阿里云容器服务ACK实现统一运维多个云端资源

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/10-18-15-31-mixcloud.png)

## 小结

1. ACK Pro集群概述，与ACK托管版和ACK标准版对比

2. ACK Pro各种集群：可靠性强化集群、安全性强化集群、调度性强化集群

3. ACK Pro显著特点、适用行业

4. ACK适用场景：弹性伸缩架构、DevOps持续交付、云原生AI、微服务架构、混合云架构
