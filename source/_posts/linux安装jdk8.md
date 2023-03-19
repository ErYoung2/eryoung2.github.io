---
title: linux安装jdk8
date: 2022-06-25 22:56:03
tags: linux
categories: 操作系统

---

## 方法

#### 1. 下载安装包并上传

#### 2.  解压

```shell
root@home:/home/young# tar zxf jdk-8u131-linux-x64.tar.gz -C /usr/local/
root@home:/home/young# mv /usr/local/jdk1.8.0_131/ /usr/local/java8
```

#### 3. 在/etc/profile添加项目

```shell
export JAVA_HOME=/usr/local/java8/
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```

### 4. 使/etc/profile生效

```shell
source /etc/profile
```

### 5. 验证jdk版本

```shell
java -version
```
