---
title: CKS真题 -- RBAC Rolebinding
date: 2024-04-27 02:14:55
tags: cks
categories: 考试
---

## 任务
一个名为web-pod的现有Pod已在namespace db中运行。
编辑绑定到Pod的ServiceAccount service-account-web的现有Role,仅允许只对services类型的资源执行get操作。
在namespace db中创建一个名为role-2,并仅允许只对namespaces类型的资源执行delete操作的新Role。
创建一个名为role-2-binding的新RoleBinding,将新创建的Role绑定到Pod的ServiceAccount。
注意：请勿删除现有的RoleBinding。

## 解题
1. 修改role-1
```shell
kubectl get pod web-pod -n db -oyaml # 查看role和serviceaccount
kubectl -n db edit role role-1
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  creationTimestamp: "2022-12-28T07:48:59Z"
  name: role-1
  namespace: db
  resourceVersion: "224470"
  uid: 3406bbfb-25aa-4930-ab29-9abad1e1de77
rules:
- apiGroups:
  - ""
  resources:
  - services                        #按题目要求修改此处
  verbs:
  - get                             #按题目要求修改此处
```

2. 创建role-2
```shell
kubectl create role role-2 -n db --verb=delete --resource=namespaces
kubectl create rolebinding role-2-binding -n db --role=role-2 --serviceaccount=db:service-account-web
kubectl describe rolebinding role-2-binding -n db
```

## 参考
> https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/rbac/





