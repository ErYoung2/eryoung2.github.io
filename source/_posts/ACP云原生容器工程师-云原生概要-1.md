---
title: ACP云原生容器工程师-云原生概要-1
date: 2023-01-31 16:04:47
tags: 阿里云ACP认证
categories: 考试
---

## 云原生概念

说到云，我们都不陌生。我们身边有各种厂商的云产品，例如AWS、GCP、AZure、阿里云、腾讯云等，但是说到云原生这个概念，恐怕就不是单纯的产品上云这么简单了，而是从产品的架构设计、网络规划、拓扑图补全、产品落地、后期运维等步骤中，都需要考虑云产品的特点而进行设计的。

云原生这个词是近几年伴随着云技术的迅猛发展而流行起来的一个概念，在不同时期我们对于云原生的概念定义也不一样。我这里列出几个比较具有代表性的定义方法：

* Heroku于2011年提出了十二因子的应用定义，该定义可以适用于各种编程语言，通常被认为是最早对于云原生的技术定义。
  其十二因子分别为：**<font color="red">基准代码；依赖；配置；后端服务；构建、发布、运行；进程；端口绑定；并发；易处理；环境等价；日志；进程管理</font>**

* Pivital于2015年提出了“Cloud Native”的概念：云原生是一种可以充分利用云计算优势的构建和运行应用的方法。主要包括以下要素：**<font color="red">Devops；持续交付；微服务；容器</font>**

* 云原生计算基金会对于云原生定义的最新版本是：云原生的代表技术为**<font color="red">容器、服务网格、微服务、不可变基础设施、声明式API</font>**

* 阿里巴巴对云原生的定义：云原生是一条使用户能低心智负担的、敏捷的、以可扩展可复制的方式，最大限度利用云的能力、发挥云特点的最佳路径。

&nbsp;

## 云原生的定位及意义

### 云原生是种架构模式及软件开发的新的思想理念

* 云原生基于云计算理念的深化，是面向云应用设计的一种新的架构设计理念

* 充分发挥云效能的最佳实践路径

* 帮助企业构建弹性可靠、松耦合、易管理可观测的应用系统

* 提升交付效率，降低运维复杂度

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/01/31-16-31-17-linian.png)

### 云原生架构与传统架构对比

- 传统软件架构，用户不仅仅需要关注基础设施的能力及其运维，还需要采购及维护大量的第三方软件以及非功能性能力，降低软件开发效率，并且没有充分利用云计算IaaS与PaaS的能力。
- 从技术的角度，云原生架构是基于云原生技术的一组架构原则和设计模式的集合，旨在将云应用中
  的非业务代码部分进行最大化的剥离，从而让云设施接管应用中原有的大量非功能特性(如弹性、
  韧性、安全、可观测性、灰度等)，使业务不再有非功能性业务中断困扰的同时，具备轻量、敏捷、
  高度自动化的特点。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/01/31-16-32-19-duibi.png)

### 云原生技术改变了软件开发及运维模式

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/01/31-16-33-11-moshi.png)

### 容器技术（docker）

容器技术处在云原生的技术栈中的底层一环，是保证云原生能实现的基础。其包括3个核心：

* 镜像：没有生命周期的打包制品

* 容器：具有生命周期的运行态

* 容器仓库：存储镜像的仓库

三者的关系如下：

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/02-17-48-36-docker.png)

它们之间的调用关系如下：

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/02-17-51-55-diaoyong.png)

由于Dockerfile是提前写好的，所以镜像打包时的规格是一致的，但是不同需求下，可以添加不同的参数，如添加存储卷、添加映射端口、是否后台运行等，这时容器的状态会有不同。

### 容器编排技术（kubernetes）

随着容器规模的越来越大，节点规模也会变大，我们对容器的管理也更加复杂。而容器编排技术就是为了解决在多集群节点中更好地管理容器应用的解决方案。

Kubernetes是目前使用最广泛的容器编排技术。在传统时代，我们需要操作系统来管理硬件资源，在操作系统基础上来部署软件和应用；而在云原生的理念当中，Kubernetes就扮演着操作系统的作用。它通过已知的不可变基础设施，通过声明式API来管理和调度各种应用资源，例如Pod、Service、Deployment、Statefulset、PV、PVC、Daemonset、ingress-gateway等。

Kubernetes的核心功能有以下几项：

● 服务发现与负载均衡
● 容器的自动装箱
● 存储编排
● 自动化容器恢复
● 自动发布与回顾
● 批量与密文管理
● 批量执行
● 水平伸缩

可以看到，kubernetes可以说是非常全能的一套容器编排解决方案，而它的架构是master-node，master节点会有控制模块，而node节点会有通信组件、网络代理和容器运行时。二者的架构如图所示：

##### 核心架构

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-02-25-core.png)

##### 主节点架构

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-02-48-master.png)

##### 工作节点架构

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-03-07-node.png)

其中，Kubelet是个服务，kube-proxy有两种方式：iptables或ipvs, CRI是容器运行时

#### Kubernetes应用场景

* 典型调度场景
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-08-32-statement1.png)

* 调度
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-08-59-schedule.png)

* 自动恢复
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-09-24-auto-recovery.png)

* 弹性伸缩
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/03-00-09-53-autoscaler.png)

## 小结

本文简单介绍了：

* 云原生概念

* 云原生的定位与意义

* 容器技术-Docker

* 容器编排技术-Kubernetes

## 参考文章

> [docker入门1--简介、安装 - eryoung2 - 博客园](https://www.cnblogs.com/young233/p/10958624.html)

> [docker入门2--生命周期 - eryoung2 - 博客园](https://www.cnblogs.com/young233/p/10961741.html)

> [kubernetes 搭建集群 - eryoung2 - 博客园](https://www.cnblogs.com/young233/p/15119748.html)

> [k8s 五个重要概念 - eryoung2 - 博客园](https://www.cnblogs.com/young233/p/15145682.html)
