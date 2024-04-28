---
title: CKS真题 -- AppArmor应⽤程序⾏为限制
date: 2024-04-28 12:30:51
tags: cks
categories: 考试
---

## 任务
在 cluster 的工作节点上，实施位于 /etc/apparmor.d/nginx_apparmor 的现有 APPArmor配置文件。 
编辑位于 /home/candidate/KSSH00401/nginx-deploy.yaml 的现有清单文件以应用AppArmor 配置文件。 最后，应用清单文件并创建其中指定的 Pod 。

## 做题
1. 在集群所有节点上加载apparmor策略，并检查
```shell
apparmor_parser /etc/apparmor.d/nginx_apparmor
apparmor_status|grep nginx-profile
```

2. 回到主节点，编辑清单文件，添加配置
vim /home/candidate/KSSH00401/nginx-deploy.yaml
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-deploy
  annotations: 
    # 从官网复制，注意格式：container.apparmor.security.beta.kubernetes.io/<container_name>: <profile_ref>
    # <container_name> 的名称是配置文件所针对的容器的名称，<profile_def> 则设置要应用的配置文件。 <profile_ref> 可以是以下取值之一：
        # runtime/default 应用运行时的默认配置
        # localhost/<profile_name> 应用在主机上加载的名为 <profile_name> 的配置文件
        # unconfined 表示不加载配置文件
    container.apparmor.security.beta.kubernetes.io/nginx-deploy: localhost/nginx-profile-1
spec:
 containers:
 - name: nginx-deploy
   image: busybox
   command: [ "sh", "-c", "echo 'Hello AppArmor!' && sleep 1h" ]
```

kubectl apply -f /home/candidate/KSSH00401/nginx-deploy.yaml

3. 检查
kubectl get pod
kubectl exec nginx-deploy -- cat /proc/1/attr/current
kubectl exec nginx-deploy -- touch /tmp/test

## 参考
> https://kubernetes.io/zh-cn/docs/tutorials/security/apparmor/

