---
title: CKS真题 -- 创建secret
date: 2024-04-28 00:05:23
tags: cks
categories: 考试
---

## 任务
在namespace istio-system中获取名为db1-test的现有secret的内容

将username字段存储在名为/cks/sec/user.txt的文件中，并将password字段存储在名为/cks/sec/pass.txt的文件中。
注意：你必须创建以上两个文件，他们还不存在。

注意：不要在以下步骤中使用/修改先前创建的文件，如果需要，可以创建新的临时文件。

在istio-system namespace中创建一个名为db2-test的新secret,内容如下：
username:production-instance
password KvLftKgs4aVH

最后，创建一个新的Pod,它可以通过卷访问secret db2-test:
Pod名称secret-pod
Namespace istio-system
容器名dev-container
镜像 nginx
卷名secret-volume
挂载路径/etc/secret

## 做题
1. 获取db1-test的内容
```shell
kubectl get secret -n istio-system db1-test -o yaml
apiVersion: v1
data:
  password: aGVsbG8=
  username: ZGIx
kind: Secret
metadata:
  creationTimestamp: "2022-12-29T08:24:22Z"
  name: db1-test
  namespace: istio-system
  resourceVersion: "252538"
  uid: 1821cc24-a8a1-4a81-ab80-a1a4ad787ccf
type: Opaque
```

2. 解密并存储到目标路径
```shell
echo "aGVsbG8=" |base64 -d > /cks/sec/pass.txt
echo "ZGIx" |base64 -d > /cks/sec/user.txt
```

3. 创建新的secret
```shell
kubectl create secret -n istio-system db2-test generic --from-literal=username:production-instance --from-literal=password=KvLftKgs4aVH
```

4. 创建pod，挂载新的secret(vim cks-06.yaml)
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secret-pod
  namespace: istio-system
spec:
  containers:
  - name: dev-container
    image: nginx
    volumeMounts:
    - name: secret-volume
      mountPath: "/etc/secret"
      readOnly: true
  volumes:
  - name: secret-volume
    secret:
      secretName: db2-test
```
kubectl apply -f cks-06.yaml

5. 检查
kubectl describe pod secret-pod -n istio-system

## 参考
> https://kubernetes.io/docs/concepts/configuration/secret/
