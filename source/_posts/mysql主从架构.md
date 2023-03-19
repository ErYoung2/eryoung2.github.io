---
title: mysql主从架构
date: 2022-06-21 09:39:46
tags: mysql
categories: 数据库
---

## 前言

Mysql是我们经常使用的关系型数据库，在实际使用中，我们会使用单数据库，也会使用各种集群技术。其中最常用的是主从集群。

主从分很多种，一主一丛、双主、一主多从、多主多从等。其中主数据库可读可写，从机只读不写。

本文主要介绍前两种，主写从读和双主互备。

而这些方案实现的原理，则是binlog复制。

## Binlog复制

Mysql有很多log，binlog是其中一种。当mysql执行了改动语句时，改动会被记录在binlog中，所以主从复制主要复制的就是这个binlog。

但具体来讲，Mysql主从复制涉及到三个线程：

1）主节点的log dump thread，给从库I/O线程传Binlog数据

2）从节点的I/O线程，会请求主库并将得到的Binlog写到本地的relay log中

3）从节点的SQL线程，会读取relay log中的日志，并解析成SQL语句进行同步

如下图所示：

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/21-14-42-59-mysql-arch.png)

## 前期准备

针对主从架构，我们准备两台机，并各自安装mysql server，端口3306.

|      | 主机            | 从机            |
| ---- | ------------- | ------------- |
| IP地址 | 192.168.1.150 | 192.168.1.113 |
| 用户   | repl          | repl          |
| 数据库  | Test_DB       | Test_DB       |
| 数据表  | STUDENTS      | STUDENTS      |

由于这两台机是不同的系统，所以安装mysql这里就不展示了，我们直接开始数据库设置。

1）在两台数据库都创建Test_DB数据库和STUDENTS表

```sql
CREATE DATABASE Test_DB;
CREATE TABLE STUDENTS (  
ID INT                           NOT NULL,  
NAME VARCHAR (20) NOT NULL,  
AGE INT                         NOT NULL,  
ADDRESS CHAR (25),  
PRIMARY KEY (ID)  
);  
```

2）在两台数据库都创建复制用户，并赋权

```sql
CREATE USER 'repl'@'%' IDENTIFIED BY 'repl123';
GRANT ALL PRIVILEGES ON *. * TO 'repl'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

3）在两台数据库打开binlog，在配置文件中添加，并添加bind-address，然后重启数据库

```properties
log_bin                 = mysql-bin
binlog_format           = ROW
bind-address            = 0.0.0.0
```

## 互为主备or主写从读？

### 主写从读

顾名思义，主写从读就是主库写，从库读取主库的binlog并备份。在对外提供服务的时候，应用向主库写入信息，可以从主库或从库读取。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/21-14-43-12-master-slave.png)

需要在从库的配置中添加只读选项，然后重启从库。

```properties
read-only
super_read_only
```

### 互为主备

不需要添加什么配置。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/21-14-43-24-master-master.png)

## binlog复制

### 主写从读

顾名思义，我们需要在从库同步主库的binlog状态，并开启同步。

1）首先，查询主库的binlog状态，找到file和position，这里file是mysql-bin.000009，Position是3205，代表主库目前的binlog位置。

```sql
mysql> show master status\G;
*************************** 1. row ***************************
             File: mysql-bin.000009
         Position: 3205
     Binlog_Do_DB:
 Binlog_Ignore_DB:
Executed_Gtid_Set:
1 row in set (0.00 sec)
```

2）从库同步主库，并启动同步。

```sql
change master to master_host='192.168.1.150',master_port=3306,master_user='repl',master_password='repl123',master_log_file='mysql-bin.000009',master_log_pos=3205;
start slave;
```

如果成功的话，查询slave状态如下：

```sql
mysql> show slave status\G;
*************************** 1. row ***************************
               Slave_IO_State: Waiting for source to send event
                  Master_Host: 192.168.1.150
                  Master_User: repl
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000009
          Read_Master_Log_Pos: 3205
               Relay_Log_File: node3-relay-bin.000002
                Relay_Log_Pos: 960
        Relay_Master_Log_File: mysql-bin.000009
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
```

Slave_IO_Running和Slave_SQL_Running都是Yes，说明同步成功。

如果不成功的话，可以找找哪里出了问题，并停止同步，重新定位主库的binlog。

### 互为主备

其实互为主备比主写从读多一步，就是主库也要同步从库。

在主机上跑同步，file和position是从库的master状态

```sql
stop slave;
change master to master_host='192.168.1.113',master_port=3306,master_user='repl',master_password='repl123',master_log_file='mysql-bin.000012',master_log_pos=2920;
start slave; 
```

在从库上也跑同步，file和position是主库的master状态

```sql
stop slave;
change master to master_host='192.168.1.150',master_port=3306,master_user='repl',master_password='repl123',master_log_file='mysql-bin.000009',master_log_pos=3205;
start slave; 
```

这样互为主备就做好了。我们插入一条信息时，另外一库也会同步。

## 问题

当然，互为主备肯定有问题，那就是如果各种原因导致的主从复制失效，导致两个库的数据不同步、binlog不同步，这时候我们只有祭出恢复的方法了，比如把主库导入从库，或者从备份进行恢复且重新做同步，这就是另一个问题了。
