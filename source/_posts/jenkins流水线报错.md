---
title: jenkins流水线报错
date: 2023-07-16 01:08:19
tags: jenkins
categories: 工具使用
---



## 错误

今天在使用jenkins时，流水线有报错：

```textile
org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:
WorkflowScript: 1: unable to resolve class Declarative 
```



## 原因

正如报错所示，流水线的第一行内容不符合pipeline流水线的语法，因此将其注释即可。

例如，我们使用hello-world的流水线时，官方给出的pipeline如下，此时我们需要注释第一行，以使其可以符合pipeline语法：

```groovy
//Jenkinsfile (Declarative Pipeline) 需要注释
pipeline {
    agent any 
    stages {
        stage('Stage 1') {
            steps {
                echo 'Hello world!' 
            }
        }
    }
}
```



然后问题解决。



## 参考

[用户对问题“Jenkins在构建Python脚本时“无法解决类声明性”错误”的回答 - 问答 - 腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/ask/sof/106548582/answer/117522876)
