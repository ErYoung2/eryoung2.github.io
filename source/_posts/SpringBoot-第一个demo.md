---
title: SpringBoot 第一个demo
date: 2023-04-25 22:36:26
tags: [java,spring]
categories: 后端
---

## 前奏

最近在面试，有一家公司在谈的时候，发了一份后端笔试题给我，是java的......

我TMD是个运维诶，你给我一套SRE题不行嘛......

玛德现在都这么卷了吗，SRE要去卷java啦......

## SpringBoot

对于Java的很多东西我并不懂，但是我知道写java的后端都会用到Spring全家桶，包括SpringBoot、SpringCloud、SpringSecurity等等。

那怎么办呢，跟着卷呗。

于是我就查了SpringBoot官网，写出了第一个demo -- helloworld

## HelloWorld

以下内容摘抄自[Spring官网](https://spring.io/quickstart)

运行环境：Ubuntu22.04

### 前提条件

1. 安装jdk17

```shell
apt install openjdk-17-jre-headless -y
```

    如果机器上有多个jdk版本，需要将其设置为jdk17

```shell
root@ubuntu-linux-22-04-desktop:~# update-alternatives --config java
There are 2 choices for the alternative java (providing /usr/bin/java).

  Selection    Path                                            Priority   Status
------------------------------------------------------------
* 0            /usr/lib/jvm/java-17-openjdk-arm64/bin/java      1711      auto mode
  1            /usr/lib/jvm/java-17-openjdk-arm64/bin/java      1711      manual mode
  2            /usr/lib/jvm/java-8-openjdk-arm64/jre/bin/java   1081      manual mode

Press <enter> to keep the current choice[*], or type selection number: 0
```

### 正式步骤

1. 打开spring打包器(https://start.spring.io/) ,选择相应的选项与版本，并选择Spring Web做为依赖并下载。
   ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/04/25-22-49-08-%E6%88%AA%E5%B1%8F2023-04-25%2022.48.35.png)
   下载之后，是一个zip包，解压后得到项目本体。

2. 修改src/java/com/example/demo/DemoApplication.java，复制以下内容：
   
   ```java
   package com.example.demo;
   import org.springframework.boot.SpringApplication;
   import org.springframework.boot.autoconfigure.SpringBootApplication;
   import org.springframework.web.bind.annotation.GetMapping;
   import org.springframework.web.bind.annotation.RequestParam;
   import org.springframework.web.bind.annotation.RestController;
   
   @SpringBootApplication
   @RestController
   public class DemoApplication {
       public static void main(String[] args) {
         SpringApplication.run(DemoApplication.class, args);
       }
       @GetMapping("/hello")
       public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
         return String.format("Hello %s!", name);
       }
   }
   ```

3. 运行，之后就会启动项目
   
   ```shell
   young@ubuntu-linux-22-04-desktop:~/demo$ ./gradlew bootRun
   
   > Task :bootRun
   
     .   ____          _            __ _ _
    /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
   ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
    \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
     '  |____| .__|_| |_|_| |_\__, | / / / /
    =========|_|==============|___/=/_/_/_/
    :: Spring Boot ::                (v3.0.6)
   
   2023-04-25T22:53:19.088+08:00  INFO 4040654 --- [           main] com.example.demo.DemoApplication         : Starting DemoApplication using Java 17.0.6 with PID 4040654 (/home/young/demo/build/classes/java/main started by young in /home/young/demo)
   2023-04-25T22:53:19.090+08:00  INFO 4040654 --- [           main] com.example.demo.DemoApplication         : No active profile set, falling back to 1 default profile: "default"
   2023-04-25T22:53:19.838+08:00  INFO 4040654 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
   2023-04-25T22:53:19.843+08:00  INFO 4040654 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
   2023-04-25T22:53:19.843+08:00  INFO 4040654 --- [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.8]
   2023-04-25T22:53:19.905+08:00  INFO 4040654 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
   2023-04-25T22:53:19.912+08:00  INFO 4040654 --- [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 693 ms
   2023-04-25T22:53:20.135+08:00  INFO 4040654 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
   2023-04-25T22:53:20.139+08:00  INFO 4040654 --- [           main] com.example.demo.DemoApplication         : Started DemoApplication in 1.34 seconds (process running for 1.725)
   ```

4. 使用http://<server-ip>:8080/hello去访问8080端口
   
   ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/04/25-22-55-44-%E6%88%AA%E5%B1%8F2023-04-25%2022.55.34.png)

第一个项目就跑起来了。

## 后记

目前这个就业环境真的很糟糕啊，裁员的裁员，降薪的降薪，作为一个小菜狗，能做的也只是提升自己的能力，扩展自己的眼界，开拓自己的心胸，保持良好的生活习惯，保持健康，保持向上，保持尊严。

与诸君共勉！
