---
title: ACP云原生容器工程师 - ASK网络、存储、日志、监控管理
date: 2023-03-14 23:33:36
tags: 阿里云ACP认证
categories: 考试
---

## 网络

包含网络容器CNI、服务Service、路由Ingress、安全组4项

### 容器CNI

* 阿里云Serverless Kubernetes服务、虚拟节点推出Pod挂载弹性公网ip功能，此功能使某些Serverless容器应用的部署和服务访问变得更加简单和便利
  
  * 无需创建VPC NAT网关即可让单个Pod访问公网
  
  * 无需创建Service也可以让单个Pod暴露公网服务
  
  * 可以更加灵活而且动态绑定Pod和EIP

### 服务Service

* Kubernetes Service定义了这样一种抽象：一个Pod的逻辑分组，一种可以访问它们的策略，通常称为微服务。

* 由于Pod会被频繁创建和删除，无法堆外直接进行服务，因此需要一个Pod的逻辑分组+访问策略，也就是Service

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/14-23-50-29-%E6%88%AA%E5%B1%8F2023-03-14%2023.49.14.png)

### 路由Ingress

* 在kubernetes集群中，Ingress是Kubernetes中的一个资源对象，用来管理集群外部访问集群内部服务的方式

* 集群反向代理器，用ingress controller来解析转发规则，转发http/https请求

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/14-23-52-14-%E6%88%AA%E5%B1%8F2023-03-14%2023.52.06.png)

### 安全组

* 安全组是一个逻辑上的分组，由同一地域内具有相同安全保护需求并相互信任的实例组成

* 一台ECI实例至少属于一个安全组

* 一个安全组可以管理同一个地域内的多台ECI实例

* 不同安全组内的ECI实例之间默认内网不通

## 管理配置

### 概述

* 容器服务ASK支持自动绑定阿里云云盘(EBS)、阿里云文件存储NAS、阿里云对象存储OSS存储服务

* 容器服务支持静态存储卷和动态存储卷，具体如下：

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/14-23-56-03-%E6%88%AA%E5%B1%8F2023-03-14%2023.55.42.png)

* 阿里云容器服务ASK集群支持Flexolume和CSI两种存储插件

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/14-23-57-37-%E6%88%AA%E5%B1%8F2023-03-14%2023.57.29.png)

## 日志

### 通过阿里云日志服务采集日志

* 打开集群工作负载下无状态页面，点击使用模板创建

* 新建并部署YAML模板，通过环境变量创建采集配置，所有与配置相关的环境变量都采用aliyun_logs_作为前缀

* 当YAML编写完成后，单击创建，即可将相应的配置交由集群执行 

### 查看日志

* 打开日志服务控制台，在Project列表区域选择Kubernetes集群对应的Project，进入日志库列表页签

* 在列表中找到相应的Logstore，打击，在下拉框中选择查询分析

## 监控

### 阿里云Prometheus监控

* 阿里云Prometheus监控全面对接开源Prometheus生态

* 支持类型丰富的组件监控

* 提供多种开箱即用的预置监控大盘

* 提供全面托管的Proetheus服务

* 更轻量、更稳定、更准确的重试机制

* 数据量无上限

* 完全兼容开源生态

* 节省成本

### 开启阿里云Prometheus监控

* 登录容器服务管理控制台

* 在控制台左侧导航栏中，选择市场 - 应用目录

* 在应用目录页面的阿里云应用页签中，搜索并单击ack-arms-prometheus

* 在右侧的创建区域中，选择目标集群，然后单击创建

### 执行结果

* 单击ARMS控制台右侧的Prometheus监控，找到目标集群并单击已安装的插件进入大盘查看监控数据

## 小结

ASK各个管理模块：

* 网络管理

* 存储管理

* 日志管理

* 监控管理
