---
title: ACP云原生容器工程师 - ASK应用场景
date: 2023-03-15 23:42:18
tags: 阿里云ACP认证
categories: 考试
---

## ASK在线业务弹性伸缩的概况

### 弹性伸缩特性

* 特性
  
  * 根据业务需求和策略
  
  * 经济地自动调整弹性计算资源

* 维度
  
  * 调度层弹性：修改负载的调度容量变化
  
  * 资源层弹性：补充ECI和集群容量规划

* 场景
  
  * 在线业务弹性
  
  * 大规模计算训练
  
  * 深度学习或共享GPU的训练与推理
  
  * 定时周期性负载变化

### 容器水平伸缩

* 容器水平伸缩制作步骤
  
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/16-00-09-08-%E6%88%AA%E5%B1%8F2023-03-16%2000.08.51.png)

* 查看应用详情，单击容器组水平伸缩，可在部署的详情中查看伸缩组信息

* 在实际使用环境中，应用汇根据CPU负载进行伸缩

### 容器定时伸缩

* kubernetes-cronhpa-controller: 按照类似Crontab的策略，定时对容器服务进行扩缩容

* kubernetes-cronhpa-controller包括三项参数
  
  * scaleTargetRef: 制定扩缩容对象
  
  * excludeDates: 日期数组，分、时、日、月、周、要做的事情
  
  * jobs: 支持在一个spec中设定多个cronhpa任务，其中name为必填项

* kubernetes-cronhpa-controller组件安装
  
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/16-00-13-44-%E6%88%AA%E5%B1%8F2023-03-16%2000.13.35.png)

### 指标容器水平伸缩

* alibaba-cloud-metrics-adapter: 由检测指标来直到集群的扩缩容
  
  ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/16-00-14-45-%E6%88%AA%E5%B1%8F2023-03-16%2000.14.37.png)

## 大数据Spark on Kubernetes

### Apache Spark概述

* 应用角色
  
  * 数据分析领域快速构建计算框架
  
  * 大数据和机器学习工作负载

* 应用架构
  
  * Spark SQL/DF: 处理结构化和半结构化数据
  
  * Spark Streaming: 处理实时流数据
  
  * Mlib: 机器学习库
  
  * GraphX: 图形计算库
  
  * Apache Spark Core API: 应用程序的平台

### ASK运行Spark的优势

* 在Kubernetes上运行Spark工作负载
  
  * 应用的快速部署
  
  * 集成化生命周期管理
  
  * 解决版本匹配、兼容和依赖问题
  
  * 重用基础架构、减少运维成本
  
  * 支持多租户和用户力度的资源调度
  
  * 基于Kubernetes的权限控制

* 在ASK集群上运行Spark工作负载
  
  * 按需按量创建Pod
  
  * 结束后停止计费
  
  * 无需为Spark计算任务预留计算资源
  
  * 无须担心集群计算力扩容问题

### 运行Apache Spark的工具

* Spark Operator
  
  * 由Google官方支持的产品spark-on-k8s-operator
  
  * 在Kubernetes上像其他工作负载一样用通用的方式方便地运行Spark应用
  
  * 使用Kubernetes custom resource来配置、运行Spark应用，并展现其状态

* Alluxio
  
  * 面向云的数据分析和人工智能的开源的数据编排技术
  
  * 为数据驱动型应用和存储系统构建桥梁，是数据更容易被访问

* TPC-DS Benchmark
  
  * 社区支持的第三方性能压测工具，协助确定解决方案的工业标准

## Knative Serverless应用

### Knative简介

* 角色
  
  * 基于Kubernetes的Serverless解决方案
  
  * 标准化Serverless技术架构
  
  * 简化学习成本

* 组件
  
  * Build: 源到容器的构建和编排
  
  * Event: 消息传递层，事件交付管理 
  
  * Serving: 请求计算，基于负载自动伸缩

* 优势
  
  * 便利性
  
  * 标准化
  
  * 服务间解耦
  
  * 生态成熟
  
  * 自动伸缩
  
  * 应用监控

* Knative虽然开源，但是会称为Serverless的实施标准

### ASK Knative相比社区版优势

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/16-00-31-00-%E6%88%AA%E5%B1%8F2023-03-16%2000.30.52.png)

### ASK Knative最佳实践

* 观测服务的QPS、RT和Pod扩缩容趋势
  
  * 配置Logstore
  
  * 配置QPS统计
  
  * 配置RT统计
  
  * 配置Pod扩缩容趋势统计
  
  * 观测服务运行状况

* 观测服务的CPU和Memory使用情况
  
  * ASK集群已开通Knative功能
  
  * 集群已开通阿里云Prometheus监控功能
  
  * 配置Prometheus监控目标ASK集群

## CI/CD流水线解决方案

### 方案背景

* 场景需求
  
  * 基于Jenkins构建自动化CI/CD集群系统
  
  * 集群资源合理利用，控制成本
  
  * 集群高可用性需求
  
  * 集群资源快速弹性伸缩

* 方案优势
  
  * 高可用服务
  
  * 自动弹性伸缩，资源合理应用
  
  * 可扩展性好

* 解决问题
  
  * 集群Master节点单点故障
  
  * 集群资源利用率低
  
  * 资源集群可扩展性差

* 方案流程
  
  * Git源码上传
  
  * Jenkins自动构建
  
  * K8s测试环境
  
  * Registry镜像存储
  
  * 生产环境部署

### 方案架构

* 服务高可用
  
  * 避免Master单点故障导致集群流程不可用

* 弹性伸缩
  
  * 每次运行Job时，自动构建Jenkins Slave
  
  * Job完成之后，自动注销并删除容器
  
  * 资源自动释放，节省成本

* 资源合理应用
  
  * 动态分配Slave到空闲节点
  
  * 降低出现由于节点资源限制的排队等待情况

* 扩展性好
  
  * 集群资源严重不足时，可以快速添加节点
  
  * 降低集群资源不足导致Job排队等情况

### 事件概要

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/16-00-41-07-%E6%88%AA%E5%B1%8F2023-03-16%2000.40.59.png)

## 小结

* ASK弹性伸缩特性

* ASK弹性伸缩部署流程

* Apache Spark在ASK上的部署方案

* ASK Knative的优势和最佳实践

* ASK上部署CI/CD流水线的解决方案
