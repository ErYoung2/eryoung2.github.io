---
title: AWS IAM介绍
date: 2023-04-04 14:13:53
tags: AWS
categories: 云服务
---

## 前言

AWS是世界上最大的云服务提供商，它提供了很多组件供消费者使用，其中进行访问控制的组件叫做IAM(Identity and Access Management)， 用来进行身份验证和对AWS资源的访问控制。

## 功能

IAM的功能总结来看，主要分两种：

* 验证身份(Authentication)

* 授权访问(Authorization)

### 验证身份

验证身份的主要目的就是验证你的身份。

主要的身份实体有3种：

* 用户(user)，实体创建的用户，与用户组的关系为多对多 

* 用户组(group)，根据一定规则分类的抽象集合，与用户的关系为多对多

* 角色(role)，其余AWS资源，例如EC2实例、Lambda函数等

对于用户来说，我们在控制台看到的是一个用户名，实际上在后台，它是一串资源字符串：

```shell
arn:aws:iam::account-ID-without-hyphens:user/User-name
```

确认方式有以下几种：

1. AWS管理控制台，使用username/password方式进行认证

2. AWS命令行工具，使用Access Key/Secret Key进行认证

3. AWS产品开发包(SDK)，使用Access Key/Secret Key进行认证

4. Restful API，使用Access Key/Secret Key进行认证

### 设定权限

对于AWS来说，这部分是通过Policy来实现的。

Policy规定了被认证的实体可以访问什么权限，怎样访问权限的问题，主要由Statement来完成。而Statement是使用json格式来填写的。

针对不同的层级，我们将Policy分为两种：

1. 针对已认证用户的层级，我们称为“Identified-Based Policy”

2. 针对资源层级，我们称为“Resource-Based Policy”

Statement的写法如下：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
       ],
      "Resource": "arn:aws:s3:::productionapp"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::productionapp/*"
    }
  ]
}
```

#### Identified-Based Policy

这里的Policy是针对被验证过用户的层级(此处的用户包含我上面讲的User、Group、Role)。

Policy和Statement是一对多的关系，也就是说，一个Policy可以包含多个Statement。

而Statement又包含以下内容：

1. Effect，决定你能不能访问(Allow/Deny)

2. Action，允许你对服务做什么动作

3. Resource，指明这次的Statement是对哪个资源做动作

#### Resource-Based Policy

这里的Policy是针对资源本身的层级。

Policy和Statement是一对多的关系，也就是说，一个Policy可以包含多个Statement。

而Statement又包含以下内容：

1. Effect，决定你能不能访问(Allow/Deny)

2. Action，允许你对服务做什么动作

3. Resource，指明这次的Statement是对哪个资源做动作，由于是针对自己的，所以要加上self

4. Principle，将自己的资源套用给谁

#### Identified-Based Policy和Resource-Based Policy的区别

1. Identified-Based Policy是Policy层级的，而Resource-Based Policy是Statement层级的，Identified-Based Policy比Resource-Based Policy高了一级

2. Identified-Based Policy是从用户角度来看待权限管理的，而Resource-Based Policy是从资源角度来看待权限管理的。

## 小结

1. IAM是用来做什么的

2. 用户、用户组、角色的介绍

3. Policy的介绍，Identified-Based Policy和Resource-Based Policy的介绍和对比

## 参考与鸣谢

[官网 IAM](https://docs.aws.amazon.com/iam/?icmpid=docs_homepage_security)

[01 IAM 是做什么的？ - YouTube](https://www.youtube.com/watch?v=z9G5D4qtSGM&list=PLyjJWgSaJFYAn0smbg9fiLNuB_ni30RxO&index=1)

[圖解AWS教學 - IAM - 整體架構 入門介紹 - YouTube](https://www.youtube.com/watch?v=NBi66VNHW18)
