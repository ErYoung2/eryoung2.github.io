---
title: CKS真题 -- 日志审计Audit
date: 2024-04-27 02:25:30
tags: cks
categories: 考试
---

## 任务
在cluster中启用审计日志。为此，请启用日志后端，并确保：

日志存储在 /var/log/kubernetes/audit-logs.txt
日志文件能保留 10 天
最多保留 2 个旧审计日志文件
/etc/kubernetes/logpolicy/sample-policy.yaml 提供了基本策略。它仅指定不记录的内容。

注意：基本策略位于 cluster 的 master 节点上。

编辑和扩展基本策略以记录：

RequestResponse 级别的 persistentvolumes 更改
namespace front-apps 中 configmaps 更改的请求体
Metadata 级别的所有 namespace 中的 ConfigMap 和 Secret 的更改
此外，添加一个全方位的规则以在 Metadata 级别记录所有其他请求。

注意：不要忘记应用修改后的策略。

## 做题
1. 备份并修改配置
```shell
ssh master01
sudo -i
cp /etc/kubernetes/logpolicy/sample-policy.yaml /opt/bak1/
vim /etc/kubernetes/logpolicy/sample-policy.yaml
```

```yaml
apiVersion: audit.k8s.io/v1
kind: Policy
omitStages:
  - "RequestReceived"
rules:
  - level: RequestResponse
    resources:
    - group: ""
      resources: ["persistentvolumes"] #根据题目要求修改，比如题目要求的是namespaces。

  - level: Request
    resources:
    - group: ""
      resources: ["configmaps"] #根据题目要求修改，比如题目要求的是persistentvolumes或者pods。
    namespaces: ["front-apps"]

  - level: Metadata
    resources:
    - group: ""
      resources: ["secrets", "configmaps"]

  - level: Metadata
    omitStages:
      - "RequestReceived"
```

2. 备份并修改配置文件
```shell
mkdir -p /opt/backup/05
cp -f /etc/kubernetes/manifests/kube-apiserver.yaml /opt/backup/05
vim /etc/kubernetes/manifests/kube-apiserver.yaml
```

```yaml
spec: 
  container:
    - commands:
      - kube-apiserver
      - --audit-log-path=/var/log/kubernetes/audit-logs.txt #日志文件
      - --audit-log-maxage=10 #文件保留最大日期
      - --audit-log-maxbackup=2 #最多保留文件数
      - --aufit-policy-file=/etc/kubernetes/logpolicy/sample-policy.yaml #日志审计配置文件

  volumeMounts: #确保volumeMounts和Volumes添加正确，否则kube-apiserver会挂
    - mountPath: /etc/kubernetes/logpolicy/
      name: audit
    - mountPath: /var/log/kubernetes/
      name: audit-log
volumes:
- name: audit
  hostPath:
    path: /etc/kubernetes/logpolicy/
- name: audit-log
  hostPath:
    path: /var/log/kubernetes/
```

3. 重启kubelet
```shell
systemctl daemon-reload
systemctl restart kubelet
```

4. 检查
```shell
tail -f /var/log/kubernetes/audit-log.txt
```

## 参考
> https://kubernetes.io/docs/tasks/debug/debug-cluster/audit/


