---
title: ACP云原生容器工程师-ACK操作
date: 2023-02-11 14:47:30
tags: 阿里云ACP认证
categories: 考试
---

## 操作流程

1. 授权账号(RBAC/RAM)
2. 创建集群(专有版、托管版、serverless版)
3. 部署应用(镜像、模板)
4. 运维管理(运维集群、运维应用)

### 集群创建

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-53-00-ji1.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-53-10-ji2.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-53-31-ji4.png)

### 集群查看

查看集群的基本信息、连接信息、集群资源、集群日志及集群时区

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-53-47-ji5.png)

## 连接集群的方式

- 使用kubectl直接连接集群

- 使用CloudShell通过kubectl连接集群

- 通过SSH连接集群

- 使用ServiceAccount Token访问集群

- 通过公网访问集群API Server

## 创建无状态集群（Deployment）

### 镜像创建

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-54-01-wu1.png)

### 应用基本信息

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-54-14-wu2.png)

### 容器配置

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-54-36-wu3.png)

拉取镜像的3种方式：自动更新、手动更新、默认本地

### 高级配置

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-54-50-wu4.png)

### 创建并查看

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-54-59-wu5.png)

## 有状态应用（Statefulset）

### 有状态应用和无状态应用区别：

无状态应用与持久化组件无关（例如Volumn、DB等），应用挂掉重启之后，与持久化组件就断开了；有状态应用与持久化组件有关，应用挂掉重启之后，与持久化组件仍有关系。

### Statefulset应用集特点

- 稳定且需要唯一的应用标识符

- 稳定且持久的存储

- 要求有序、平滑的部署和扩展

- 要求有序、平滑的终止和删除

- 有序的滚动更新

- Statefulset可能创建的三种资源类型：PVC、Pod、ControllerRevision

## 创建有状态应用

### 镜像创建

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-55-23-you1.png)

### 容器配置（数据卷）

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-55-33-you2.png)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-55-43-you3.png)

可添加云盘、NAS、OSS

### 高级配置

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-55-55-you4.png)

### 创建并查看

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/11-14-56-03-you5.png)

## 小结

1. ACK入门操作指引

2. ACK集群入门操作指引

3. ACK创建无状态应用

4. ACK创建有状态应用
