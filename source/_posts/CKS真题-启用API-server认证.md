---
title: CKS真题 -- 启用API server认证
date: 2024-04-28 14:45:27
tags: cks
categories: 考试
---

## 任务
重新配置 cluster 的Kubernetes APl 服务器，以确保只允许经过身份验证和授权的 REST 请求。 
使用授权模式 Node,RBAC 和准入控制器NodeRestriction。 
删除用户 system:anonymous 的 ClusterRoleBinding 来进行清理。

注意：所有 kubectl 配置环境/文件也被配置使用未经身份验证和未经授权的访问。 你不必更改它，但请注意，一旦完成 cluster的安全加固， kubectl 的配置将无法工作。 您可以使用位于 cluster 的 master 节点上，cluster 原本的kubectl 配置文件 /etc/kubernetes/admin.conf ，以确保经过身份验证的授权的请求仍然被允许。

## 解题
1. 备份并修改kube-apiserver配置
```shell
# 备份
mkdir -p /opt/backup/15
cp -f /etc/kubernetes/manifests/kube-apiserver.yaml /opt/backup/15
```

```yaml
- --authorization-mode=Node,RBAC
- --enable-admission-plugins=NodeRestriction #添加准入控制器
```

2. 重启kubelet
```shell
systemctl daemon-reload
systemctl restart kubelet
```

3. 删除删除用户 system:anonymous 的 ClusterRoleBinding
```shell
kubectl delete rolebinding system:anonymous
```

## 参考
> https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/node/#overview
