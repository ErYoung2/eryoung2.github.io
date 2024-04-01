---
title: cka真题
date: 2024-04-02 02:01:18
tags: cka
categories: 考试
---

## Part1 17个题目
第1题.基于角色的访问控制-RBAC
第2题.节点维护—指定node节点不可用
第3题.K8s版本升级
第4题.Etcd数据库备份恢复
第5题.网络策略NetworkPolicy
第6题.四层负载均衡service
第7题.七层负载均衡Ingress
第8题.Deployment管理pod扩缩容
第9题.pod指定节点部署
第10题.检查Node节点的健康状态
第11题.一个Pod封装多个容器
第12题.持久化存储卷PersistentVolume
第13题.PersistentVolumeClaim
第14题.监控Pod日志
第15题.Sidecar代理
第16题.监控Pod度量指标
第17题.集群故障排查——kubelet故障

## Part2 准备
vim ~/.bashrc
alias k="kubectl"
export drc="--dry-run=client -oyaml"
export now="--force --grace-period 0"
source ~/.bashrc

## Part3 解题
### 1. RBAC(4分)
中文解释：
创建一个名为deployment-clusterrole的clusterrole，该clusterrole只允许创建Deployment、Daemonset、Statefulset的create操作
在名字为app-team1的namespace下创建一个名为cicd-token的serviceAccount，并且将上一步创建clusterrole的权限绑定到该serviceAccount

解法
```sh
k create clusterrole deployment-clusterrole --verb=create --resource=deployments,daemonsets,statefulsets
k create serviceaccount cicd-token -n app-team1
k create rolebinding role-account-binding --clusterrole=deployment-clusterrole --serviceaccount=app-tema1:cicd-token -n app-team1
```

验证
```sh
kubectl auth can-i create deployment --as system:serviceaccount:app-team1:cicd-token -n app-team1 -- yes
kubectl auth can-i create daemonset --as system:serviceaccount:app-team1:cicd-token -n app-team1  -- yes
kubectl auth can-i create statefulset --as system:serviceaccount:app-team1:cicd-token -n app-team1 -- yes
kubectl auth can-i create pod --as system:serviceaccount:app-team1:cicd-token -n app-team1 -- no
```

参考：
https://kubernetes.io/docs/reference/access-authn-authz/rbac/
https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/

### 2. 节点维护（4分）
将ek8s-node-1节点设置为不可用，然后重新调度该节点上的所有Pod

解法
```sh
kubectl config use-context ek8s
k cordon ek8s-node-1
k drain ek8s-node-1 --ignore-daesonsets --delete-emptydir-data --force
```

参考：
https://kubernetes.io/zh/docs/tasks/configure-pod-container/
https://kubernetes.io/zh-cn/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/
https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#drain

### 3. K8s升级版本（7分）
将master节点升级到v1.29.00，不升级相关组件
```sh
kubectl cordon k8s-master01
kubectl drain k8s-master01 --ignore-daemonsets --delete-emptydir-data --force

ssh k8s-master01
sudo -i
apt update -y &&  apt-cache madison kubeadm
apt-mark unhold kubeadm && \
apt-get update && sudo apt-get install -y kubeadm='1.29.x-*' && \
apt-mark hold kubeadm

kubeadm version
kubeadm upgrade plan --etcd-upgrade=false 
kubeadm upgrade apply v1.29.x

apt-mark unhold kubelet kubectl && \
apt-get update && sudo apt-get install -y kubelet='1.29.x-*' kubectl='1.29.x-*' && \
apt-mark hold kubelet kubectl

systemctl daemon-reload
systemctl restart kubelet

exit
exit

kubectl uncordon k8s-master01
```

### 4. etcd备份与恢复（7分）
针对etcd实例https://127.0.0.1:2379创建一个快照，保存到 /srv/data/etcd-snapshot.db。在创建快照的过程中，如果卡住了，就键入ctrl+c终止，然后重试。
然后恢复一个已经存在的快照：/var/lib/backup/etcd-snapshot-previous.db
执行etcdctl命令的证书存放在：
ca证书：/opt/KUIN00601/ca.crt
客户端证书：/opt/KUIN00601/etcd-client.crt
客户端密钥：/opt/KUIN00601/etcd-client.key

解法
```sh
#备份
ETCDCTL_API=3 etcdctl --endpoints="https://127.0.0.1:2379" --cacert=/opt/KUIN00601/ca.crt --cert=/opt/KUIN00601/etcd-client.crt --key=/opt/KUIN00601/etcd-client.key snapshot save /srv/data/etcd-snapshot.db

#恢复(如果恢复后集群崩掉，可以跳过)
systemctl stop etcd
mkdir -p /opt/etcd-backup
mv /etc/kubernetes/manifests/kube-* /opt/etcd-backup/
ETCDCTL_API=3 etcdctl --endpoints="https://127.0.0.1:2379" --cacert=/opt/KUIN00601/ca.crt --cert=/opt/KUIN00601/etcd-client.crt --key=/opt/KUIN00601/etcd-client.key snapshot restore /var/lib/backup/etcd-snapshot-previous.db --data-dir=/var/lib/backup/
vim /etc/kubernetes/manifests/etcd.yaml, change volume from /var/lib/etcd/ to /var/lib/backup
chown -R etcd:etcd /var/lib/backup
mv /opt/etcd-backup/ /etc/kubernetes/manifests/
systemctl restart etcd
```

### 5. NetworkPolicy（7分）
创建一个名字为allow-port-from-namespace的NetworkPolicy，这个NetworkPolicy允许internal命名空间下的Pod访问该命名空间下的9000端口。
并且不允许不是internal命令空间的下的Pod访问
不允许访问没有监听9000端口的Pod。

解法：
```sh
vim 5.yaml
-----------------
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-port-from-namespace
  namespace: internal
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector: {}
    ports:
    - port: 9000
      protocol: TCP
-----------------

k apply -f 5.yaml
```

### 6. service（7分）
重新配置一个已经存在的deployment front-end，在名字为nginx的容器里面添加一个端口配置，名字为http，暴露端口号为80/TCP，然后创建一个service，名字为front-end-svc，暴露该deployment的http端口，并且service的类型为NodePort。

解法：
```sh
Add config into existing deployment front-end
k edit deployment front-end
    spec:
      containers:
      - name: nginx
        image: nginx
        # 需要加这四行
        ports:
        - name: http
          containerPort: 80
          protocol: TCP

k expose deploy front-end --name=front-end-svc --port=80 --type=NodePort --target-port=http
```

### 7. Ingress(7分)
在ing-internal 命名空间下创建一个ingress，名字为pong，代理的service hi，端口为5678，配置路径/hi。
验证：访问curl -kL <INTERNAL_IP>/hi会返回hi。

解法：
```sh
vim 7-ing-class.yaml
apiVersion: networking.k8s.io/v1
kind: IngressClass
metadata:
  labels:
    app.kubernetes.io/component: controller
  name: nginx-example
  annotations:
    ingressclass.kubernetes.io/is-default-class: "true"
spec:
  controller: k8s.io/ingress-nginx

vim 7-ing.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pong
  namespace: ing-internal
  annotations:
    nginx.ingress.kubernetes.io  #如果ing没有internal ip，就添加这一行
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /hi
        pathType: Prefix
        backend:
          service:
            name: hi
            port:
              number: 5678

k apply -f 7-ing.yaml
curl -kL <internal-ip>/hi
```

### 8. Deployment缩扩容(4分)
扩容名字为loadbalancer的deployment的副本数为6

解法：
```sh
kubectl config use-context k8s
k scale --replicas=6 deployment loadbalancer
```

### 9. 指定节点部署（4分）
创建一个Pod，名字为nginx-kusc00401，镜像地址是nginx，调度到具有disk=spinning标签的节点上

解法：
```sh
k run nginx-kusc00401 --image=nginx $drc > 9.yaml
vim 9.yaml
vim pod-ns.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-kusc00401
  labels:
    role: nginx-kusc00401
spec:
  nodeSelector:   #添加nodeSelector标签，在spec下面，没有就打标签
    disk: spinning
  containers:
    - name: nginx
      image: nginx

k apply -f 9.yaml
```

### 10. 检查node节点健康状态（4分）
检查集群中有多少节点为Ready状态，并且去除包含NoSchedule污点的节点。之后将数字写到/opt/KUSC00402/kusc00402.txt

解法：
```
kubectl config use-context k8s
k get nodes|grep -v "Taint"|grep -v "Noschedule"|wc -l > /opt/KUSC00402/kusc00402.txt
```

### 11. 一个pod多个容器(4分)
创建一个Pod，名字为kucc1，这个Pod可能包含1-4容器，该题为四个：nginx+redis+memcached+consul

解法：
```sh
k run kucc1 --image=nginx $drc > 11.yaml
然后补全所有容器信息，最后apply
k apply -f 11.yaml
```

### 12. Persistent Volume(4分)
创建一个pv，名字为app-config，大小为2Gi，访问权限为ReadWriteMany。Volume的类型为hostPath，路径为/srv/app-config

解法：
```sh
apiVersion: v1
kind: PersistentVolume
metadata:
  name: app-config
  labels:
    type: local
spec:
  storageClassName: manual   # 需要有这一项吗？题目没有要求，（可以不写）
  volumeMode: Filesystem
  capacity:
    storage: 2Gi
  accessModes:
    - ReadWriteMany
  hostPath:
    path: "/srv/app-config"

k apply -f 12.yaml
```
参考：
https://kubernetes.io/docs/tasks/configure-pod-container/configure-persistent-volume-storage/
https://kubernetes.io/zh-cn/docs/concepts/storage/persistent-volumes/
可以ctrl+F 搜003，会直接跳转到创建pv
https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-persistent-volume-storage/#create-a-persistentvolume

### 13. 监控Pod度量指标（5分）
找出具有name=cpu-user的Pod，并过滤出使用CPU最高的Pod，然后把它的名字写在已经存在的 /opt/KUTR00401/KUTR00401.txt文件里（注意他没有说指定namespace。所以需要使用-A指定所以namespace）

```sh
k config use-context k8s
k top pod -A -l name=cpu-user
NAMESPACE     NAME                       CPU(cores)   MEMORY(bytes)   
kube-system   coredns-54d67798b7-hl8xc   7m           8Mi   
kube-system   coredns-54d67798b7-m4m2q   6m           8Mi

k "coredns-54d67798b7-hl8xc" > /opt/KUTR00401/KUTR00401.txt
```

### 14. 监控pod日志（5分）
监控名为foobar的Pod的日志，并过滤出具有unable-access-website信息的行，然后将写入到 /opt/KUTR00101/foobar

解法
```sh
k logs foobar|grep unable-access-website > /opt/KUTR00101/foobar
```

### 15. CSI和PVC
创建一个名字为pv-volume的pvc，指定storageClass为csi-hostpath-sc，大小为10Mi
然后创建一个Pod，名字为web-server，镜像为nginx，并且挂载该PVC至/usr/share/nginx/html，挂载的权限为ReadWriteOnce。之后通过 kubectl edit或者 kubectl path将pvc改成70Mi，并且记录修改记录。

解法：
```sh
vim 15-pvc.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pv-volume
spec:
  accessModes:
  - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 10Mi
  storageClassName: csi-hostpath-sc

k apply -f 15-pvc.yaml

vim 15-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: pv-volume
spec:
  volumes:
    - name: pv-volume
      persistentVolumeClaim:
        claimName: pv-volume
  containers:
    - name: web-server
      image: nginx
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: pv-volume

k apply -f 15-pod.yaml

kubectl edit pvc pv-volume
kubectl edit pvc pv-volume --record
kubectl edit pvc pv-volume --save-config
```

### 16. sidecar(7分)
添加一个名为busybox且镜像为busybox的sidecar到一个已经存在的名为legacy-app的Pod上，这个sidecar的启动命令为 /bin/sh, -c, 'tail -n+1 -f /var/log/legacy-app.log'。
并且这个sidecar和原有的镜像挂载一个名为logs的volume，挂载的目录为/var/log/。

```sh
k get pod legacy-app -o yaml > c-sidecar.yaml
apiVersion: v1
kind: Pod
metadata:
  name: legacy-app
spec:
  containers:
  - name: count
    image: busybox
    args:
    - /bin/sh
    - -c
    - >
      i=0;
      while true;
      do
        echo "$(date) INFO $i" >> /var/log/legacy-ap.log;
        i=$((i+1));
        sleep 1;
      done
      # 以下为添加部分
    volumeMounts:
    - name: logs
      mountPath: /var/log
  - name: busybox
    image: busybox
    args: [/bin/sh, -c, 'tail -n+1 -f /var/log/legacy-ap.log']
    volumeMounts:
    - name: logs
      mountPath: /var/log
  volumes:
  - name: logs
    emptyDir: {}

k delete -f c-sidecar.yaml
k create -f c-sidecar.yaml
```

### 17. kubelet故障（13分）
一个名为wk8s-node-0的节点状态为NotReady，让其他恢复至正常状态，并确认所有的更改开机自动完成

```sh
ssh wk8s-node-0
k get nodes
systemctl status kubelet # 然后fix

```