---
title: CKS真题 -- Pod指定ServiceAccount
date: 2024-04-27 01:31:17
tags: cks
categories: 考试
---

## 任务
清单文件/cks/sa/pod1.yaml中指定的Pod由于ServiceAccount指定错误而无法调度。
请完成一下项目：

Task
1.在现有namespace ga中创建一个名为backend-sa的新ServiceAccount,
确保此ServiceAccount不自动挂载API凭据。
2.使用/cks/sa/pod1.yaml中的清单文件来创建一个Pod。
3.最后，清理namespace ga中任何未使用的ServiceAccount。

## 解题
vim cks-02.yaml
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: backend-sa
  namespace: qa
automountServiceAccountToken: false #添加这一行
```

vim /cks/sa/pod1.yaml
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: backend
  namespace: qa
spec:
  serviceAccountName: backend-sa                  #给pod配置serviceaccount
  containers:
  - image: nginx:alpine
    imagePullPolicy: IfNotPresent
    name: backend
```

```shell
kubectl apply -f /cks/sa/pod1.yaml

kubectl get sa -n qa
kubectl get pod -n qa|grep -i "serviceaccount"
kubectl -n qa delete xxx #没见到的serviceaccount
```

## 参考
> https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#opt-out-of-api-credential-automounting
