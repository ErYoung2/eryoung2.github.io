---
title: SRE笔试题 - 某金融机构
date: 2023-06-05 03:19:55
tags: git
categories: 面试
---



## 题目

1. 给定一个路径/var/store，在这个路径下创建一个本地git仓库sre-test，作为提交点

2. 下载sre-test仓库到本地，创建两个分支master和test

3. master先提交一次，test提交3次

4. 最后，得到所有四次提交的记录。



## 做法

1. 跳到/var/store下，创建本地远程仓库sre-test.git

```shell
cd /var/store
git init --bare sre-test.git
```



2. 将sre-test.git下载到本地

```shell
git clone sre-test.git sre-test
```



3. 进入本地目录，创建master和test分支

```shell
cd sre-test
git checkout -b test
```



4. 切换回master分支，创建一个新文件，写入一些内容，提交并查看提交log

```shell
git checkout master
echo "master" > master_log
git add master_log
git commit -m "1st master commit"
git push -u
git log
```



5. 切换到test分支，创建3个新文件，写入一些内容，提交3次并查看提交log

```shell
git checkout test
echo "test1" > test1_log
echo "test2" > test2_log
echo "test3" > test3_log
···提交过程略
git log
```



6. 合并test到master分支，并查看日志

```shell
git checkout master
git merge test
git log
```





## 后记

刚开始看到这道题时，我是挺懵逼的。因为没看到远程目录，后来才发现要在本地模拟这个过程，第一点是最难的，其他的就可以迎刃而解了。
