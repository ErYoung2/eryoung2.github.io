---
title: Macbook系统降级
date: 2023-08-27 15:14:34
tags: Mac
categories: 操作系统
---



## 前言

由于笔者有一台老Macbook Pro，是2015年款的，信仰灯还能亮，所以我始终不舍得卖掉；但是由于硬件限制，运行现在的Mac系统非常艰难，风扇狂转、反应太慢，就跟一个哮喘病人一样，我都替它难受。于是我想给它做个系统降级，然后就收藏起来了。



## 制作启动盘 or 网络恢复？

两种方法我都有试过，网络恢复有三种选项：

```shell
Command+R: 恢复到现有系统版本
Command+Option+R：恢复到现机器最新系统版本
Command+Option+Shift+R: 恢复到出厂设置时的系统版本
```

由于笔者在安装时抹掉了所有磁盘，在试图网络恢复时，总是遇到以下问题：

```textile
准备安装时发生错误，请尝试重新运行此应用程序
```

这个问题的原因有两个，一个是磁盘没抹除干净，一个是时间不对，需要手动设置到目前的时间。可以参考这个帖子：

> [格式化苹果系统，重装系统提示“准备安装时发生错误，请尝试重新运行此应用程序” - 简书](https://www.jianshu.com/p/b4736f53c0d8)



笔者花了一天时间试了很多次，均未安装成功。所以，我用了另一种方法--制作USB启动盘。

其实就是系统的刻录，但是需要一些其他的步骤：

1. 下载目标系统到电脑，并进行安装，使其进入Application目录。

2. 插入目标U盘，进行格式化，使用“Mac OS扩展（日志）”格式，并将U盘重命名为MyVolume，此步骤为必须。

3. 打开终端，运行相应版本的命令，进行刻录。笔者安装的是High Sierra系统，所以跑的是这个：
   
   ```shell
   sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
   ```

 ![](/Users/eryoung2/Library/Application%20Support/marktext/images/2023-08-27-15-36-23-image.png)

详情可以参考官方文档：[# 创建可引导的 macOS 安装器](https://support.apple.com/zh-cn/HT201372)



4. 进入目标Mac，将磁盘格式化为“Mac OS扩展（日志）”格式即可。

5. 将此U盘卸载后插入目标Mac，启动时长按Option，选择“Install xx”，从U盘启动，一步一步进行操作即可。

6. 安装完毕之后，按照提示进行设置，进入系统后即可看到系统降级成功。



## 后记

Mac的恢复较为复杂，还是推荐使用本地的恢复方式，即制作启动盘然后进行安装。我一开始被网络恢复带歪了，后来发现没什么用，尤其是所有磁盘彻底被格式化之后，我一度差点装个windows上去，真的挺麻烦的，不愧是你啊，苹果！
