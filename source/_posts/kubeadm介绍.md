---
title: kubeadm介绍
date: 2022-07-19 13:01:17
tags: k8s
categories: 云原生
---



## 前言

我们都知道，k8s中有三位大哥：kubelet, kubeadm, kubectl.

其中：

- kubelet是服务，用来调用下层的container管理器，从而对底层容器进行管理。

- kubectl是API，供我们调用，键入命令对k8s资源进行管理。

- kubeadm是管理器，我们可以使用它进行k8s节点的管理。

基于kubeadm，我们最常用的功能有三个：

- init：初始化k8s节点

- join：将worker节点加入到k8s集群

- reset：尽最大努力还原init或者join对集群的影响

那么，接下来就对这三个功能进行介绍。

## kubeadm init

### 用途

运行此命令来搭建 Kubernetes 控制平面节点。

### 过程

"init" 命令执行以下阶段：

1 预加载(preflight), 检查环境。

2 生成CA证书。

3 生成kubeconfig文件，以便kubelet和kubectl连接到API服务器，并生成一个admin.conf，便于管理。

4 为 API 服务器、控制器管理器和调度器生成静态 Pod 的清单文件。

5 对控制平面节点应用标签和污点标记以便不会在它上面运行其它的工作负载。

6 生成token令牌。

7 创建configmap提供集群节点的信息与RBAC的访问规则；允许启动引导token令牌访问API；配置自动签发新的CSR请求。

8 安装插件，coredns和kube-proxy，需要安装CNI之后才可使用coredns。

按照官方说法，如下：

```shell
preflight                    Run pre-flight checks
certs                        Certificate generation
  /ca                          Generate the self-signed Kubernetes CA to provision identities for other Kubernetes components
  /apiserver                   Generate the certificate for serving the Kubernetes API
  /apiserver-kubelet-client    Generate the certificate for the API server to connect to kubelet
  /front-proxy-ca              Generate the self-signed CA to provision identities for front proxy
  /front-proxy-client          Generate the certificate for the front proxy client
  /etcd-ca                     Generate the self-signed CA to provision identities for etcd
  /etcd-server                 Generate the certificate for serving etcd
  /etcd-peer                   Generate the certificate for etcd nodes to communicate with each other
  /etcd-healthcheck-client     Generate the certificate for liveness probes to healthcheck etcd
  /apiserver-etcd-client       Generate the certificate the apiserver uses to access etcd
  /sa                          Generate a private key for signing service account tokens along with its public key
kubeconfig                   Generate all kubeconfig files necessary to establish the control plane and the admin kubeconfig file
  /admin                       Generate a kubeconfig file for the admin to use and for kubeadm itself
  /kubelet                     Generate a kubeconfig file for the kubelet to use *only* for cluster bootstrapping purposes
  /controller-manager          Generate a kubeconfig file for the controller manager to use
  /scheduler                   Generate a kubeconfig file for the scheduler to use
kubelet-start                Write kubelet settings and (re)start the kubelet
control-plane                Generate all static Pod manifest files necessary to establish the control plane
  /apiserver                   Generates the kube-apiserver static Pod manifest
  /controller-manager          Generates the kube-controller-manager static Pod manifest
  /scheduler                   Generates the kube-scheduler static Pod manifest
etcd                         Generate static Pod manifest file for local etcd
  /local                       Generate the static Pod manifest file for a local, single-node local etcd instance
upload-config                Upload the kubeadm and kubelet configuration to a ConfigMap
  /kubeadm                     Upload the kubeadm ClusterConfiguration to a ConfigMap
  /kubelet                     Upload the kubelet component config to a ConfigMap
upload-certs                 Upload certificates to kubeadm-certs
mark-control-plane           Mark a node as a control-plane
bootstrap-token              Generates bootstrap tokens used to join a node to a cluster
kubelet-finalize             Updates settings relevant to the kubelet after TLS bootstrap
  /experimental-cert-rotation  Enable kubelet client certificate rotation
addon                        Install required addons for passing Conformance tests
  /coredns                     Install the CoreDNS addon to a Kubernetes cluster
  /kube-proxy                  Install the kube-proxy addon to a Kubernetes cluster
```

### 参数

常用参数如下：

```shell
-h --help 帮助
--dry-run 干跑，看效果，不做改变
--apiserver-advertise-address apiserver的ip地址，默认主节点ip
--apiserver-bind-port apiserver监听端口，默认6443
--node-name string 指定节点名称
--image-repository 指定容器的仓库，默认k8s.gcr.io
--pod-network-cidr 指定pod的CIDR，例如“10.244.0.0/16”
--token-ttl duration 指定token的有效时间，默认24小时
......
```

内容很多，我谨列出几个常见的参数，具体使用可查询官方文档。

[kubeadm init | Kubernetes](https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/kubeadm-init/)

## kubeadm join

### 用途

使得worker node加入到k8s集群中。

### 过程

kubeadm初始化集群时，我们需要建立双向信任。这个过程可以分解为发现（让待加入节点信任 Kubernetes 控制平面节点）和 TLS 引导（让Kubernetes 控制平面节点信任待加入节点）两个部分。

有两种主要的发现方案：

1 使用共享令牌和 API 服务器的 IP 地址(基于令牌发现)，例如：

```shell
kubeadm join --discovery-token abcdef.1234567890abcdef 1.2.3.4:6443
```

2 提供一个标准 kubeconfig 文件的一个子集(基于文件发现)，例如：

```shell
kubeadm join --discovery-file path/to/file.conf
kubeadm join --discovery-file https://url/file.conf
```

kubeadm join运行的过程如下：

```shell
preflight              Run join pre-flight checks
control-plane-prepare  Prepare the machine for serving a control plane
  /download-certs        [EXPERIMENTAL] Download certificates shared among control-plane nodes from the kubeadm-certs Secret
  /certs                 Generate the certificates for the new control plane components
  /kubeconfig            Generate the kubeconfig for the new control plane components
  /control-plane         Generate the manifests for the new control plane components
kubelet-start          Write kubelet settings, certificates and (re)start the kubelet
control-plane-join     Join a machine as a control plane instance
  /etcd                  Add a new local etcd member
  /update-status         Register the new control-plane node into the ClusterStatus maintained in the kubeadm-config ConfigMap (DEPRECATED)
  /mark-control-plane    Mark a node as a control-plane
```

### 参数

常用参数如下：

```shell
-h --help 帮助
--dry-run 干跑，看效果，不做改变
--discovery-token 基于令牌的发现
--discovery-file 基于文件的发现
```

内容很多，我谨列出几个常见的参数，具体使用可查询官方文档。

[kubeadm join | Kubernetes](https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/kubeadm-join/)

## kubeadm reset

### 用途

该命令尽力还原由 kubeadm init 或 kubeadm join 所做的更改。

### 过程

过程如下：

```shell
preflight              Run reset pre-flight checks
update-cluster-status  Remove this node from the ClusterStatus object.
remove-etcd-member     Remove a local etcd member.
cleanup-node           Run cleanup node.
```

```shell
[reset] Reading configuration from the cluster...
[reset] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -o yaml'
W0719 03:48:16.785110    4092 preflight.go:55] [reset] WARNING: Changes made to this host by 'kubeadm init' or 'kubeadm join' will be reverted.
[reset] Are you sure you want to proceed? [y/N]: y
[preflight] Running pre-flight checks
[reset] Stopping the kubelet service
[reset] Unmounting mounted directories in "/var/lib/kubelet"
[reset] Deleting contents of directories: [/etc/kubernetes/manifests /etc/kubernetes/pki]
[reset] Deleting files: [/etc/kubernetes/admin.conf /etc/kubernetes/kubelet.conf /etc/kubernetes/bootstrap-kubelet.conf /etc/kubernetes/controller-manager.conf /etc/kubernetes/scheduler.conf]
[reset] Deleting contents of stateful directories: [/var/lib/etcd /var/lib/kubelet /var/lib/dockershim /var/run/kubernetes /var/lib/cni]
```

需要注意，它只会删除掉/etc/kubernetes/下的文件，～/.kube下的文件需要手动删除，否则重新建立k8s集群时会报错。

### 参数

常用参数如下：

```shell
-h --help 帮助
--dry-run 干跑，看效果，不做改变
-f 不询问，强制执行
--cri-socket 指定CRI插槽，默认为/var/lib/kubelet
```

内容很多，我谨列出几个常见的参数，具体使用可查询官方文档。

([kubeadm reset | Kubernetes](https://kubernetes.io/zh-cn/docs/reference/setup-tools/kubeadm/kubeadm-reset/))
