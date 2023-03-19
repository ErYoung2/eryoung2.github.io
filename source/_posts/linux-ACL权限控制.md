---
title: linux ACL权限控制
date: 2022-06-27 23:48:24
tags: linux
categories: 权限管理
---
## 概念
ACL是Access Control List（访问控制列表）的缩写，用于linux复杂的用户权限控制当中。

Cent7系统之前，只有系统安装时创建的文件系统支持ACL，后来创建的文件系统则不支持。

Cent7系统后，不管文件系统是否在安装系统时被建立，都支持ACL。




## 命令

**<font color="red">getfacl：用于查看ACL权限。</font>**

**<font color="red">setfacl：用于设置ACL权限。</font>**




## 用法

#### 1. 查看文件或目录权限

**<font color="red">getfacl 文件/文件夹名</font>**

```shell
[root@vm1 ~]# getfacl ~
getfacl: Removing leading '/' from absolute path names
# file: root
# owner: root
# group: root
user::r-x
group::r-x
other::---
```




#### 2. 修改用户对文件或目录的权限

**<font color="red">setfacl -m u:uname:access 文件/文件夹名</font>**

```shell
[root@vm1 ~]# setfacl -m u:young:rwx -R ~   #将/root的权限赋予young
[root@vm1 ~]# getfacl ~
getfacl: Removing leading '/' from absolute path names
# file: root
# owner: root
# group: root
user::r-x
user:young:rwx
group::r-x
mask::rwx
other::---
```

我将我个人对/root文件夹的访问权限改成了可读可写，而组内用户有读权限，组外用户无任何权限。

接下来进行测试：

```shell
[young@vm1 root]$ dd if=/dev/zero of=/root/testfile bs=1M count=20 #创建一个测试文件
记录了20+0 的读入
记录了20+0 的写出
20971520字节(21 MB)已复制，0.0154888 秒，1.4 GB/秒
[young@vm1 root]$ ll|grep testfile 
-rw-rw-r--  1 young young 20971520 8月  30 01:49 testfile
[young@vm1 root]$ id nobody
uid=99(nobody) gid=99(nobody) 组=99(nobody)
```

的确，young用户由于被赋权。所以可以在/root目录下进行读写；而nobody用户由于未被赋权，且不在root组内，故什么权限都没有。

测试完毕后，我们使用setfacl -b /root取消刚才添加的ACL权限。

```shell
[root@vm1 ~]# setfacl -b /root
[root@vm1 ~]# getfacl ~
getfacl: Removing leading '/' from absolute path names
# file: root
# owner: root
# group: root
user::r-x
group::r-x
other::---
```



#### 3. 修改组对文件或目录的权限：

**<font color="red">setfacl g:gid:access 文件/目录路径</font>**，用法与给用户赋权一致，故不再赘述。




#### 4. 移动/复制文件或目录时需要注意的点：

移动文件/目录时，默认连带ACL权限一起移动。

复制文件时，默认不保留权限；需要加使用**<font color="red">cp -p</font>**命令，才保留权限。




#### 5. 挂载时需要注意的点：

如原来的文件系统不支持ACL权限，我们可以将其重新挂载。

**<font color="red">mount -o remount, acl 挂载点</font>**

