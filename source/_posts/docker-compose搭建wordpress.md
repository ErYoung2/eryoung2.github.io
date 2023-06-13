---
title: docker-compose搭建wordpress
date: 2023-06-13 09:37:51
tags: [docker,wordpress]
categories: 容器
---



## 前言

我们都知道，docker是一个运行容器的软件。同时它也配置了一个运行一组容器的软件，叫做docker-compose。当我们使用非常小规模容器化应用的时候，我们可以使用此docker-compose去做。



## docker-compose的介绍

根据官网的描述，docker-compose是一个能够管理多容器的工具，可以使用yaml文件来编写所需资源，并一键管理。

docker-compose支持的功能有：

```shell
[root@master wordpress]# docker-compose
Commands:
  build              Build or rebuild services
  bundle             Generate a Docker bundle from the Compose file
  config             Validate and view the Compose file
  create             Create services
  down               Stop and remove containers, networks, images, and volumes
  events             Receive real time events from containers
  exec               Execute a command in a running container
  help               Get help on a command
  images             List images
  kill               Kill containers
  logs               View output from containers
  pause              Pause services
  port               Print the public port for a port binding
  ps                 List containers
  pull               Pull service images
  push               Push service images
  restart            Restart services
  rm                 Remove stopped containers
  run                Run a one-off command
  scale              Set number of containers for a service
  start              Start services
  stop               Stop services
  top                Display the running processes
  unpause            Unpause services
  up                 Create and start containers
  version            Show the Docker-Compose version information
```



### 安装docker-compose(以Linux为例)

```shell
sudo yum install -y docker && systemctl start docker
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose #需要root权限
```

测试docker-compose是否安装成功：

```shell
sudo docker-compose version
```



## docker-compose配置文件编写并启动

```shell
mkdir -p /usr/local/wordpress && cd /usr/local/wordpress
nano docker-compose.yml #编辑docker-compose.yml文件
```

```yml
version: "3"
services:

   db:
     image: mysql:8.0
     command:
      - --default_authentication_plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci     
     volumes:
       - db_data:/var/lib/mysql
     restart: always
     environment:
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress

   wordpress:
     depends_on:
       - db
     image: wordpress:latest
     ports:
       - "80:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress
volumes:
  db_data:
```



编辑完毕之后，使用以下命令来启动：

```shell
sudo docker-compose up -d
```



但是，

```shell
Getting the final child's pid from pipe caused: EOF: unknown
```

如果遇到这个问题的话，原因是内存碎片过多，需要释放cache以消除问题。

```shell
echo 3 > /proc/sys/vm/drop_caches  #临时解决
echo 1 > /proc/sys/vm/compact_memory  #永久解决
sysctl -w vm.compact_memory=1   #永久解决
```

详情可以参考此文，特此感谢。

[Getting the final child's pid from pipe caused: EOF: unknown](https://www.jokerbai.com/archives/getting-the-final-childs-pid-from-pipe-caused)



然后就会看到以下的结果：

```shell
[root@master wordpress]# docker-compose up -d
wordpress_db_1 is up-to-date
Starting wordpress_wordpress_1 ...
Starting wordpress_wordpress_1 ... done
```



然后输入http://<ip>:80，查看是否已经正常启动即可。



## 参考

[Docker Compose overview | Docker Documentation](https://docs.docker.com/compose/)

[解决docker-compose: command not found问题的两种常用方法-云社区-华为云](https://bbs.huaweicloud.com/blogs/286823)

[实战 WordPress - Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice/compose/wordpress)

[Getting the final child's pid from pipe caused: EOF: unknown](https://www.jokerbai.com/archives/getting-the-final-childs-pid-from-pipe-caused)
