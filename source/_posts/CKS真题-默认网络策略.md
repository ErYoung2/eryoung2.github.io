---
title: CKS真题 -- 默认网络策略
date: 2024-04-27 01:42:42
tags: cks
categories: 考试
---

## 任务
为所有类型为Ingress-+Egress的流量在namespace testing中创建一个名为denypolicy的新默认拒绝NetworkPolicy。
此新的NetworkPolicy必须拒绝namespace testing中的所有的Ingress+Egress流量。
将新创建的默认拒绝NetworkPolicy应用与在namespace testing中运行的所有Pod。

你可以在/cks/net/p1.yaml找到一个模板清单文件。

## 做题
```shell
vim /cks/net/p1.yaml
```

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: denypolicy
  namespace: testing
spec:
  podSelector: {}                        #拒绝所有pod
  policyTypes:
    - Ingress
    - Egress
```

```shell
kubectl apply -f /cks/net/p1.yaml
```

## 检查
```shell
kubectl describe networkpolicy denypolicy -n testing
```

## 参考
> https://kubernetes.io/zh-cn/docs/concepts/services-networking/network-policies/#default-deny-all-ingress-traffic
