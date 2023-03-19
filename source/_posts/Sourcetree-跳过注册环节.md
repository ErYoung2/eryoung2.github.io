---
title: Sourcetree 跳过注册环节
date: 2022-06-12 10:23:40
tags: Sourcetree
categories: 工具使用
---

## 前言

前几天在电脑上装了个sourcetree，结果它硬要我注册，烦得很。  
于是查了一下怎么跳过注册环节，结果还真有，试了一下，真给力！  
特此记录。

### MAC版本：

1. 打开sourcetree

2. 关闭sourcetree

3. 命令终端输入
   
   ```zsh
   defaults write com.torusknot.SourceTreeNotMAS completedWelcomeWizardVersion 3
   ```

4. 打开sourcetree即可跳过登录

 

### Windows版本：

1. 打开我的电脑，输入“%LocalAppData%\Atlassian\SourceTree\”，并新建一个**accounts.json**文件，如图:
   ![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/06/16-23-47-13-win_sourcetree.png)

2. 在**accounts.json**文件中输入以下内容后，重新登录，即可跳过注册/登陆环节，直接使用。

```json
[ { "$id":"1", "$type":"SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity", "Authenticate":true, "HostInstance":{  "$id":"2",  "$type":"SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",  "Host":{   "$id":"3",   "$type":"SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",   "Id":"atlassian account"  },  "BaseUrl":"https://id.atlassian.com/"  },  "Credentials":{   "$id":"4",   "$type":"SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",   "Username":"",   "Email":null  },  "IsDefault":false }]
```
