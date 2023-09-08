---
title: 使用bat脚本激活office
date: 2023-09-08 14:25:46
tags: [bat,kms]
categories: windows
---



## 前言

在我们安装windows的时候，很重要的一个步骤就是激活。

安装windows的同时，通常也需要安装office，同样需要激活。

两个方法都是可以使用kms进行伪激活的，好处是免费，坏处是盗版，不过不care啦，对不起，微软哥，囊中是在羞射。。。



windows我之前写过一期：

> https://www.cnblogs.com/young233/p/13112054.html



本文讨论office。



## office的kms

我们可以使用kmsripo这个软件进行激活，当然要找到靠谱的软件，否则就容易被病毒侵入。

在此，我们可以使用以下脚本进行安装：

```batch
@echo off(cd /d "%~dp0")&&(NET FILE||(powershell start-process -FilePath '%0' -verb runas)&&(exit /B)) >NUL 2>&1title Office 2019 Activator r/Piracyecho Converting... & mode 40,25(if exist "%ProgramFiles%\Microsoft Office\Office16\ospp.vbs" cd /d "%ProgramFiles%\Microsoft Office\Office16")&(if exist "%ProgramFiles(x86)%\Microsoft Office\Office16\ospp.vbs" cd /d "%ProgramFiles(x86)%\Microsoft Office\Office16")&(for /f %%x in ('dir /b ..\root\Licenses16\ProPlus2019VL*.xrm-ms') do cscript ospp.vbs /inslic:"..\root\Licenses16\%%x" >nul)&(for /f %%x in ('dir /b ..\root\Licenses16\ProPlus2019VL*.xrm-ms') do cscript ospp.vbs /inslic:"..\root\Licenses16\%%x" >nul)cscript //nologo ospp.vbs /unpkey:6MWKP >nul&cscript //nologo ospp.vbs /inpkey:NMMKJ-6RK4F-KMJVX-8D9MJ-6MWKP >nul&set i=1:serverif %i%==1 set KMS_Sev=kms7.MSGuides.comif %i%==2 set KMS_Sev=kms8.MSGuides.comif %i%==3 set KMS_Sev=kms9.MSGuides.comcscript //nologo ospp.vbs /sethst:%KMS_Sev% >nulecho %KMS_Sev% & echo Activating...cscript //nologo ospp.vbs /act | find /i "successful" && (echo Complete) || (echo Trying another KMS Server & set /a i+=1 & goto server)pause >nulexit
```



复制以上内容，新建一个bat文件，写入之后，使用“管理员运行”即可。



然后就可以了，可以添加一个定时任务，每3个月跑一次，就不会过期了。
