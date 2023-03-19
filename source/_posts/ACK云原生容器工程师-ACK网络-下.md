---
title: ACK云原生容器工程师-ACK网络(下)
date: 2023-02-13 15:07:42
tags: 阿里云ACP认证
categories: 考试
---

## 容器网络规划

- 容器网络规划、VPC专有网络配置阶段、容器网络配置阶段、Service网络配置阶段

- 根据集群业务需求，实现容器网络的配置完成

## 容器网络实践

### Flannel

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-15-11-01-flannel1.png)

### Terway

#### Terway网络规划注意事项

- 建议选用高配ECS规格机型，如5代或6代的8G以上机型

- 共享ENI支持的最大Pod数=(ECS支持的ENI数-1)×单个ENI支持的私有ip数

- 独占ENI支持的最大Pod数=ECS支持的ENI数-1

#### Terway网络实践步骤

##### 1. 规划和准备集群网络

- 在创建ACK Kubernetes集群时，需要指定VPC地址段、虚拟交换机、Pod地址段、Service地址段

- 需要先创建一个专有网络VPC，然后在VPC下创建两个虚拟交换机

- 虚拟交换机和Pod交换机需要在同一可用区下

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-15-11-17-terway1.png)

##### 2. 创建专有网络

1. 登录专有网络管理控制台

2. 在顶部菜单栏，选择地域，然后创建专有网络

3. 创建专有网络和虚拟交换机。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-15-11-26-terway2.png)

##### 3. 创建ACK集群

1. 登录阿里云容器服务ACK管理控制台

2. 创建集群

3. 在选择集群模板页面，单机标准托管集群下的创建

##### 4. 配置Terway网络

1. 配置的关键信息：专有网络、虚拟交换机、网络插件选Terway

2. 配置Terway模式：独占弹性网卡或者共享弹性网卡(IPVlan)，是否支持NetworkPolicy选项(仅在共享弹性网卡模式下可选)，Pod网段，Service网段

##### 5. 配置节点实例及创建集群

选择节点实例，点击创建

#### Terway和Flannel模式的不同

- Pod需要通过弹性网卡(ENI)接入虚拟交换机，来组件Pod网络

- 不同ECS规格所能支持的弹性网卡数不同

## 小结

- 容器网络规划步骤介绍

- 容器网络实践
  
  - Flannel
  
  - Terway，主要介绍了ENI模式下如何创建集群网络
