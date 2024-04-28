---
title: CKS真题 -- ImagePolicyWebhook容器镜像扫描
date: 2024-04-28 14:51:22
tags: cks
categories: 考试
---

## 任务
注意：你必须在 cluster 的 master节点上完成整个考题，所有服务和文件都已被准备好并放置在该节点上。 
给定一个目录 /etc/kubernetes/epconfig中不完整的配置以及具有 HTTPS 端点 <https://acme.local:8082/image_policy> 的功能性容器镜像扫描器：
	1. 启用必要的插件来创建镜像策略 
	2. 校验控制配置并将其更改为隐式拒绝（implicit deny） 
	3. 编辑配置以正确指向提供的 HTTPS 端点 
最后，通过尝试部署易受攻击的资源 /cks/img/web1.yaml 来测试配置是否有效。 
你可以在/var/log/imagepolicy/roadrunner.log 找到容器镜像扫描仪的日志文件。

## 解题
1. 修改/etc/kubernetes/epconfig/admission_configuration.json，将defaultAllow设置为false
```yaml
"defaultAllow": false
```

2. 修改/etc/kubernetes/epconfig/kubeconfig.yml，添加webhook server地址
```yaml
cluster:
    certificate-authority: /path/to/ca.pem   
    server: https://acme.local:8082/image_policy  # 增加该行
```

3. 备份配置文件
```yaml
mkdir -p /opt/backup/16
cp -f /etc/kubernetes/manifests/kube-apiserver.yaml /opt/backup/16
```

4. 修改配置文件
```yaml
    - --enable-admission-plugins=NodeRestriction,ImagePolicyWebhook #添加ImagePolicyWebhook
    - --admission-control-config-file=/etc/kubernetes/epconfig/admission_configuration.json #添加配置文件路径

      - mountPath: /etc/kubernetes/epconfig #添加挂载，具体参考配置文件其他范例
        name: epconfig
        readOnly: true
    - name: epconfig
      hostPath:
        path: /etc/kubernetes/epconfig
```

5. 重启kubelet并检查
```shell
systemctl daemon-reload
systemctl restart kubelet
```

6. 部署/cks/img/web1.yaml进行测试检查
```yaml
kubectl apply -f /cks/img/web1.yaml
```

## 参考
> https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#imagepolicywebhook
