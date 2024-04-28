---
title: CKS真题 -- 网络策略NetworkPolicy
date: 2024-04-28 12:00:27
tags: cks
categories: 考试
---

## 任务
创建一个名为 pod-restriction 的 NetworkPolicy 来限制对在 namespace dev-team 中运行的 Pod products-service 的访问。 只允许以下 Pod 连接到 Pod products-service 
* namespace qaqa 中的 Pod
* 位于任何 namespace，带有标签 environment: testing 的 Pod 注意：确保应用 NetworkPolicy。
你可以在 /cks/net/po.yaml 找到一个模板清单文件。

## 做题
1. 检查相关namespace的标签， 没有就打一个
```shell
# 查标签
kubectl get ns products-service --show-labels
kubectl get ns qaqa --show-labels

# 打标签
kubectl label ns xxx name=xxx
```

2. 编辑网络策略的yaml文件
vim cks-09.yaml
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: pod-restriction
  namespace: dev-team
spec:
  podSelector:
    matchLabels:
      name: products-service #目标pod的标签
  policyTypes:
  - Ingress
  ingress:
  - from: #第一个from，选中namespace为qaqa的所有pod
    - namespaceSelector:
        matchLabels:
          name: qaqa
  - from: #第二个from，选中所有namespace中标签符合enviroment=testing的pod，注意podSelector前面没有横线，表示与namespaceSelector为并列关系。
    - namespaceSelector: {}
      podSelector:
        matchLabels:
          environment: testing
```

3. 生效
kubectl apply -f cks-09.yaml

4. 检查
kubectl describe networkpolicy pod-restriction -n dev-team

## 参考
> https://kubernetes.io/zh/docs/concepts/services-networking/network-policies/#networkpolicy-resource