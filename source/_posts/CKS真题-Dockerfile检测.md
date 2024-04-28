---
title: CKS真题 -- Dockerfile检测
date: 2024-04-28 11:40:24
tags: cks
categories: 考试
---

## 任务
分析和编辑给定的Dockerfile /cks/docker/Dockerfile（基于ubuntu:16.04 镜像）， 并修复在文件中拥有的突出的安全/最佳实践问题的两个指令。
分析和编辑给定的清单文件 /cks/docker/deployment.yaml ， 并修复在文件中拥有突出的安全/最佳实践问题的两个字段。
注意：请勿添加或删除配置设置；只需修改现有的配置设置让以上两个配置设置都不再有安全/最佳实践问题。
注意：如果您需要非特权用户来执行任何项目，请使用用户ID 65535 的用户 nobody 。
只修改即可，不需要创建。

## 解题
1. 修改Dockerfile
```Dockerfile
#修改基础镜像为题目要求的 ubuntu:16.04
FROM ubuntu:16.04

#仅将CMD上面的USER root修改为USER nobody，不要改其他的USER root。
USER nobody
```

2. 修改Deployment文件
vim /cks/docker/deployment.yaml
```yaml
# 在安全内容里删除'SYS_ADMIN'；确保securityContext的privileged为False;确保readOnlyFilesystem为True; runAsUser为65535
# 内部的pod标签保持一致，具体参考环境
```
3. 修改后无需重启

## 参考
> https://kubernetes.io/zh/docs/concepts/security/pod-security-standards/#restricted
