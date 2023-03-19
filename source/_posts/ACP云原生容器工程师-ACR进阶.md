---
title: ACP云原生容器工程师 - ACR进阶
date: 2023-03-17 17:18:01
tags: 阿里云ACP认证
categories: 考试
---

## DevOps

DevOps是近年来非常火的概念，是一种重视开发人员和运维人员之间沟通合作的文化、运动或惯例。透过自动化“软件交付”和“架构变更”的流程，来使得构建、测试、发布软件能够更加快捷、频繁和可靠。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-16-10-%E6%88%AA%E5%B1%8F2023-03-17%2018.15.41.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-16-18-%E6%88%AA%E5%B1%8F2023-03-17%2018.15.50.png)



![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-17-04-%E6%88%AA%E5%B1%8F2023-03-17%2018.16.55.png)

CD的特点：自动化、持续、有效反馈

CD的主要问题：

1. 环境一致性问题

2. 版本管理问题



## 通过容器镜像实现DevOps

### 阿里云容器服务

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-18-36-%E6%88%AA%E5%B1%8F2023-03-17%2018.18.27.png)



## 实现步骤

#### 通过容器镜像实现DevOps

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-19-48-%E6%88%AA%E5%B1%8F2023-03-17%2018.19.20.png) 

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-19-58-%E6%88%AA%E5%B1%8F2023-03-17%2018.19.26.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-20-06-%E6%88%AA%E5%B1%8F2023-03-17%2018.19.32.png)



### 利用ACR搭建DevOps

#### 构建镜像仓库

1. 在镜像仓库页面单击创建镜像仓库

2. 在创建镜像仓库对话框中，设置命名空间、仓库名称、摘要和仓库类型

3. 在设置代码源对话框中，选择已绑定的代码源，然后单击闯将镜像仓库



#### 设置构建规则

1. 在镜像仓库页面单击目标仓库右侧操作列中的管理

2. 安吉左侧导航栏中的构建，在构建规则设置区域的左侧单击添加规则

3. 在添加构建规则对话框中设置构建规则，然后单击确认



#### 构建镜像仓库

1. 手工构建

2. 自动构建



#### 绑定容器服务触发器

* 镜像信息页面，单击左侧操作栏中的触发器，新建一个触发器，病填入触发器的名称、URL、触发方式



### 使用免密组件拉取容器镜像

#### 背景信息

免密组件通过读取ACK集群中的Kube-system命名空间中的acr-configation的配置，进行私有镜像拉取。当前支持针对私有镜像仓库使用以下三种权限之一的策略进行配置：

* 使用默认的ACK Worker RAM角色权限进行拉取

* 使用自定义RAM角色的AccessKey ID和AccessKey Secret的权限进行拉取

* 通过配置RAM AssumeRole权限，使用其他用户的权限进行拉取



#### 镜像

* 容器镜像服务企业版实例和默认实例中的私有镜像

* 集群当前用户和其他用户容器镜像服务中的私有镜像

* 跨地域拉取容器镜像服务中的私有镜像



#### 集群

* 多命名空间免密拉取

* 专有版Kubernetes集群

* 托管版Kubernetes集群



### 使用免密组件拉取容器镜像

1. 升级组件
   
   1. 在集群列表页面，单击目标集群操作列下的更多 - 系统组件管理
   
   2. 在组件列表区域中找到aliyun-acr-credential-helper，单击升级

2. 配置组件
   
   1. 在集群信息页面左侧导航栏，选择应用配置管理 - 配置项
   
   2. 在配置项额面，选择命名空间：kube-system，单击创建天假新配置项，或单击目标配置项右侧编辑

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/03/17-18-31-18-%E6%88%AA%E5%B1%8F2023-03-17%2018.31.11.png)



3. 配置当前账号拉取权限
   
   1. 在集群信息页面，单击集群资源页签，单击Worker RAM角色右侧链接
   
   2. 在RAM角色基本信息的权限管理页签，单击目标权限策略名称
   
   3. 单击修改策略内容
   
   4. 在策略内容区域增加以下字段后，单击确定





## 小结

* 了解DevOps和Continuous Delivery的概念

* 了解通过容器镜像实现DevOps的原理

* 了解搭建容器DevOps的流程

* 了解如何使用免密组件拉取容器镜像
