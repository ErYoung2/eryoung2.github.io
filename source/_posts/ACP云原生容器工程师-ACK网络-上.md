---
title: ACP云原生容器工程师-ACK网络(上)
date: 2023-02-13 13:08:04
tags: 阿里云ACP认证
categories: 考试
---

## 容器集群网络设计目标

### 主要解决的4个问题

- 容器与容器之间的通信

- Pod与Pod之间的通信

- Pod与Service之间的通信

- 外部世界与Service之间的通信

### Kubernetes网络接入的三个原则

- Pod和Pod的通信不需要NAT转换，可直接通信

- Node和Pod可以相互通信，在不限制的情况下，Pod可以访问任意网络

- Pod拥有独立的网络栈，Pod看到自己地址和外部看到自己地址是一样的，Pod内部容器共用一套独立的网络栈

### 容器到容器之间的通信

- 在容器中，容器之间的网络通信是通过docker0网桥，凡是连接到docker0的容器，都可以通过它来直接通信。

- 要想容器连接到docker0网桥，我们需要veth pair的虚拟设备来实现

- 当容器在一台宿主机上，访问该容器的ip地址时，这个数据包：
  
  - 先根据路由规则到达docker0网桥
  
  - 然后被转发到对应的veth pair设备
  
  - 最后，出现在容器里

### 通过Service实现内外部统一访问

#### 为什么设立Service?

- Kubernetes集群是通过Pod部署的，我们知道在Pod的生命周期中，随时可能被销毁和变化

- 应用创建Pod组来统一访问入口及负载均衡

- 应用服务需要暴露给外部，需要提供给外部用户进行访问

- Pod之间的通信也可以通过Kubernetes Service进行访问

- Kubernetes Service可以实现访问负载到一组Pod上

具体如图：

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-12-00-svc.png)

### 跨主机网络通信

- Docker默认不支持容器之间跨主机通信

- Kubernetes提出了CNI作为网络接口可以实现容器跨主机通信
  
  - CNI是Kubernetes中标准的一个调用网络实现的接口
  
  - Kubelet通过调用此API来调用不同的网络插件来实现不同的网络配置，实现此借口额就是CNI
  
  - 目前常用的CNI有：Flannel、Calico、Weave、Terway等

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-12-17-cni1.png)

### 几种常见的CNI介绍

- Flannel：Flannel是最早由CoreOS团队推出的CNI，用于让集群中不同节点都使用全局唯一的网络，也是当前Kubernetes开源方案中最成熟的一个，支持HostGW和VXLAN模式。

- Calico：是一个纯3层的数据中心网络方案，支持IPIP和BGP模式，后者可以无缝集成像Openstack这种IaaS云架构，能够提供可控的VM、容器、裸机之间的IP通信。

- Terway: 是阿里云开源的基于VPC网络的CNI插件，支持VPC和ENI模式，后者可实现容器网络使用VPC子网网络，即可以与VPC子网重合。

## 阿里云ACK容器网络技术实现

### CNI

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-12-37-cni2.png)

### 阿里云容器服务ACK容器网络模式

- 容器服务将Kubernetes网络、SLB、VPC进行深度集成，提供了稳定高效能的容器网络。

- 在容器服务中，支持以下互通类型：
  
  - 在一个容器集群中，Pod之间相互访问
  
  - 在一个容器集群中，Pod访问Service
  
  - 在一个容器集群中，ECS访问Service
  
  - Pod直接访问同一个VPC下的ECS
  
  - 同一个VPC下的ECS直接访问Pod

### 阿里云容器服务ACK容器网络规划与实现

- 在创建ACK集群时，您需要执行VPC、虚拟交换机、Pod网络CIDR和Service CIDR

- 建议您提前规划ECS地址、Kubernetes Pod地址和Service地址

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-12-59-network1.png)

### 阿里云容器服务ACK容器网络规划注意事项

- VPC网段：从10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16中三选一

- 交换机网段：
  
  - 在VPC中创建指定的交换机网段，必须是VPC子网段
  
  - 交换机下创建的ECS实例，网络ip从交换机网段中获得
  
  - 一个VPC下，可创建多个交换机，但其网段不可重叠

- Pod地址段(K8S特定概念)
  
  - 每个Pod具有独立ip地址
  
  - Pod的地址段不能与VPC网络重叠(针对Flannel和Calico)

- Service地址段(K8S特定概念)
  
  - 每个Service有独立ip地址
  
  - Service地址段无法与VPC和Pod地址段重合
  
  - Service只能在集群内部使用，不能出集群

## 容器网络规划

### VPC专有网络

专有网络VPC可以基于阿里云帮您构建出一套隔离的网络环境

- 可以完全掌控自己的虚拟网络，包括自定义IP地址范围、划分网段、配置路由表和网关等

- 容器服务通过配置VPC路由表的方式将容器对容器的访问转发到容器IP所对应的ECS机器上

- 容器服务是依赖VPC的路由表做容器IP到ECS的流量转发的

- 在VPC的路由表配置中，我们可以看到容器服务配置的网段到ECS的配置，这个是容器服务自动完成的，如果配置不小心被删除了，可以对照节点上的docker info找到本节点相应的网段，手动恢复到VPC的路由表中。

### VPC专有网络规划

阿里云容器网络与VPC网络深度集成

- 在创建阿里云容器网络之前，需要先创建VPC和虚拟交换机

- 需要结合具体业务来规划VPC和交换机的数量及网段等

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-13-34-vpc1.png)

### 网络容器插件

- Flannel

- Terway

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-13-58-chajian.png)

### Flannel网络插件

- Flannel是最常见的Kubernetes CNI，配合阿里云的VPC高速网络，能提供高性能和稳定的容器网络体验。

- 通过网桥进行数据包转发，container->Host->Other pod container

- 三种后端方式：VXLAN，UDP，host-gw

- Pod网段独立于VPC网段，每个节点需要对应一个VPC的路由表条目。

- Pod网段会按照掩码均匀划分每个集群中的节点，每个节点上的Pod会从节点上划分的网段中分配IP地址。

- 基于阿里云VPC的Flannel网络无封包，相对默认的Flannel VXLAN性能提升20%

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-14-10-flannel.png)

### Terway

- 是阿里云开源的基于专有网络VPC的容器网络接口CNI，采用云原生的网络方案

- 基于K8S标准的网络策略来定义容器间的访问策略

- 将原生的弹性网卡分配给Pod实现Pod网络

- 支持基于K8S标准的网络策略来定义容器间的访问策略，并兼容Calico的网络策略。

- Terway兼容VPC的网络方案，方便对接已有的基础设施

- 没有Overlay封包解包的损耗，简单易用，方便网络诊断

- 直接基于VPC中的弹性网卡来构建容器网络

- Pod网段直接由弹性网卡资源分配，所以可以与VPC网段重合

- 每个Pod都拥有自己独立的网络栈和ip地址

- 同一台ECS内的Pod之间通信，直接通过机器内部转发；跨ECS的Pod通信，报文通过VPC的弹性网卡进行转发

- Terway不需要使用VxLAN等隧道技术进行转发，因此通信效率很高

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-14-19-terway.png)

### Flannel与Terway对比

结论：对于不需要使用Network Policy的用户，可以选择Flannel；否则还是建议选择Terway

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-14-31-duibi.png)

### Service网络

通过服务抽象，能够解耦前端和后端的关联，从而实现松耦合的微服务设计，以及自动负载均衡实现快速的业务弹性。

Service是四层负载均衡。

ACK容器服务采用Service方式为一组容器统一提供固定的访问入口，并对这一组容器做负载均衡。

服务访问方式：

- Nodeport：在cluster每个node上开辟一个转发的端口。

- ClusterIP: 默认模式，根据是否生成ClusterIP又可分为普通Service和Headless Service两类：
  
  - 普通Service：通过为Kubernetes的Service分配一个集群内部可访问的固定虚拟ip（Cluster IP），实现集群内的访问。为最常见的方式。
  
  - Headless Service：该服务不会分配Cluster IP，也不通过kube-proxy做反向代理和负载均衡。而是通过DNS提供稳定的网络ID来访问，DNS会将headless service的后端直接解析为podIP列表。主要供StatefulSet使用。

- LoadBalancer: 除了使用一个Cluster IP和nodePort之外，还会向所使用的公有云申请一个负载均衡器(负载均衡器后端映射到各节点的nodePort)，实现从集群外通过LB访问服务。

### Ingress网络

- 集群内对外暴露的访问接入点，承载几乎全部的流量

- Ingress是七层负载均衡。

- 可以通过Ingress配置不同的转发规则，从而达到根据不同的规则设置访问集群内不同的Service后端Pod。

- 阿里云容器服务提供高可靠的Ingress Controller组件，集成了阿里云SLB服务，为您的Kubernetes集群提供灵活可靠的路由服务(Ingress)

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/02/13-13-14-41-ingress.png)

## 小结

- 容器集群网络设计目标

- 阿里云ACK容器网络技术实现

- 容器网络规划
