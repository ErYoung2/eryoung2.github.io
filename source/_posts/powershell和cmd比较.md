---
title: powershell和cmd比较
date: 2022-08-04 17:33:58
tags: [cmd,powershell]
categories: windows
---

## 前言

计算机啊这东西，本质上是硬件和软件的综合体。如果只有硬件没有软件的话，这也是台辣鸡而已。而计算机软件中最靠近硬件的一层，就是操作系统层。

操作系统有很多种，比如Unix/Linux/Mac OS/Windows几种。其中，我们接触的第一款操作系统应该就是微软(巨硬)公司的windows系列了。这款操作系统从1985年发表第一款操作系统Windows1.0开始，到现在已经有将近40年的历史了。所以Windows内部也一定存在很多祖传的应用，比如Windows NT、扫雷、cmd等。

虽然Windows是一款以视窗为主要交互模式的操作系统，但是对于一个脚本佬，命令行同样重要。甚至有时命令行的交互效率比视窗的点点点更高，也更快捷方便(就比如我刚开始使用linux的shell的时候，对此非常抗拒，觉得十分难用；但是用久了就回不去了，现在整天骂Windows，为啥设计得如此不透明)。

当然啦，脚本佬毕竟是少数，大部分人还是觉得Windows的点点点更加符合自己的使用习惯。然而作为一个脚本佬，就没办法再搁那儿点点点了，这样难免被人说lowbi。于是我简单地看了一下Windows的命令行，发现有两种--黑框的cmd和篮框的powershell。那本文主要讨论这二者的异同。

    

## cmd vs powershell

我呢，是个土包子，看到这二者的第一感觉就是，powershell是加强版的cmd。这句话说了等于没说，因为的确如此。如果这个问题是个面试题，你要这么答，很难保证面试官不会继续问下去，“请详细讲讲，这二者有啥异同”？这时候就喝喝了，你就没话可讲了，最后就得被迫回家等消息。那我们这里不废话，直接上表格：

|               | cmd               | powershell                         |
| ------------- | ----------------- | ---------------------------------- |
| 框框颜色          | 黑色                | 蓝色                                 |
| 起用时间          | 1981年             | 2006年                              |
| 适用性           | 仅支持cmd脚本(bat,cmd) | 支持cmd脚本(bat,cmd)和powershell脚本(ps1) |
| 扩展性           | 仅支持cmd内置函数        | 支持cmd内置函数+powershell cmdlet        |
| 命令别名          | 不支持               | 支持                                 |
| 输出内容类型        | 文本                | 对象                                 |
| 程序并发          | 不支持               | 支持                                 |
| 是否有ISE(编译器)   | 无，只有命令行           | 有，而且能直接调试                          |
| 是否支持.net库     | 否                 | 是                                  |
| 是否支持WMI（监控工具） | 否                 | 是                                  |
| 是否可以管理微软云资源   | 否                 | 是                                  |
| 是否支持shell     | 否                 | 是                                  |
| 是否可以运行所有类型程序  | 否                 | 是                                  |

## 

## 总结

上面我总结了powershell和cmd的异同点，可以从中看到powershell是cmd的加强版，但是加强得过了头，基本上也可以作为Windows不同世代，实现命令行交互的两种方式了。其中cmd能做的事情powershell都能做，而powershell除了兼容cmd以外，也增加了几项对脚本佬更加友善的改进：

1. 增加了cmdlet，使得很多功能可以像成熟的编程语言一样直接调用。

2. 拉进了与linux shell的操作距离，使得学习成本大大降低。

3. 支持了很多更友善的功能，比如ISE和WMI，操作感比cmd更先进。

4. 增加了操作其他语言的便捷性，使得powershell通用性更好。

5. 增加了管理其余基础资源的功能，使得我们使用vagrant或者terraform时更方便。

6. 由于powershell本身建立在.net框架之上，所以直接可以调用,net相关功能，对于.net开发者是一种福音。

总之，它给了常年使用linux命令行方式进行作业的人(比如我这脚本佬)更好的信心去使用windows进行编程和测试，其强大的功能也令我叹为观止。只能说I need more 抛瓦烧，微软巨硬，魔兽该出新资料片啦！

    

## 鸣谢

[PowerShell vs Command Prompt | Top 14 Differences You Should Know](https://www.educba.com/powershell-vs-command-prompt/)

https://www.yiibai.com/powershell/powershell-cmdlet.html

https://zhuanlan.zhihu.com/p/380068863
