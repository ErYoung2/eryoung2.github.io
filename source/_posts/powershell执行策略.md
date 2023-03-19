---
title: powershell执行策略
date: 2022-08-09 17:33:58
tags: powershell
categories: windows
---

## 前言

上一篇博文，我介绍了一下powershell和cmd的对比。通过学习，我发现powershell的确比cmd更加power，也更加适应现在的使用场景。
那么本文将继续介绍一个powershell的另一个特性，执行策略。

## execution policy描述

首先我们看看官网是怎么描述execution policy的:

```text
PowerShell's execution policy is a safety feature that controls the conditions under which PowerShell loads configuration files and runs scripts. This feature helps prevent the execution of malicious scripts.

On a Windows computer you can set an execution policy for the local computer, for the current user, or for a particular session. You can also use a Group Policy setting to set execution policies for computers and users.

Execution policies for the local computer and current user are stored in the registry. You don't need to set execution policies in your PowerShell profile. The execution policy for a particular session is stored only in memory and is lost when the session is closed.

The execution policy isn't a security system that restricts user actions. For example, users can easily bypass a policy by typing the script contents at the command line when they cannot run a script. Instead, the execution policy helps users to set basic rules and prevents them from violating them unintentionally.

On non-Windows computers, the default execution policy is Unrestricted and cannot be changed. The Set-ExecutionPolicy cmdlet is available, but PowerShell displays a console message that it's not supported. While Get-ExecutionPolicy returns Unrestricted on non-Windows platforms, the behavior really matches Bypass because those platforms do not implement the Windows Security Zones.
```

我们总结一下，这段文字中提到了几个要点：

1. powershell的执行策略是种安全特性，保证不会什么猫狗脚本都执行，对于操作系统是种保护。
2. windows的执行策略执行粒度分3种：本机、当前用户、特定会话。本机和当前用户的策略会存进注册表，当前会话的执行策略只会进内存，会话一断就会消失。
3. 执行策略并不会限制用户操作，只是给了用户一把安全锁，可用可不用。
4. 对于非windows机器，不会有执行策略的设置，因此会建议windows机器来做设置。

## 常见的执行策略

明白了上面的几个要点，我们来看windows提供了哪些执行策略供我们使用。

1. ByPass
   任何脚本都可以执行，且没有任何提示。

2. Undefined
   没有设置脚本执行策略。

3. Unrestricted
   允许运行未签名的脚本，但是会有安全性提示。

4. Default
   默认策略，对客户端是Restricted，对服务端是RemoteSigned

5. RemoteSigned
   Windows Server 2012 R2 之后的默认策略
   如果从网络下载的脚本会有限制，需要添加数字签名；如果是本地创建的脚本，则不需要数字签名可以运行。

但是问题来了，真的会有老哥从网络上下载到本地运行，而不是复制粘贴到本地，自己创建的文件里？

不会吧，不会吧？
![image](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2022/08/09-20-15-39-buhui.jpg)

6. AllSigned
   本策略只允许运行具有数字签名的脚本。

7. Restricted
   本策略允许运行命令，但无法运行脚本。

## 运行范围

上面也讲了，powershell有3种范围：本机、当前用户、当前会话。
可使用Scope选项进行设置。

```powershell
PS C:\Windows\system32> Get-ExecutionPolicy -Scope LocalMachine
RemoteSigned
PS C:\Windows\system32> Get-ExecutionPolicy -Scope CurrentUser
Undefined
PS C:\Windows\system32> Set-ExecutionPolicy RemoteSigned -Scope CurrentUserc
执行策略更改
执行策略可帮助你防止执行不信任的脚本。更改执行策略可能会产生安全风险，如 https:/go.microsoft.com/fwlink/?LinkID=135170
中的 about_Execution_Policies 帮助主题所述。是否要更改执行策略?
[Y] 是(Y)  [A] 全是(A)  [N] 否(N)  [L] 全否(L)  [S] 暂停(S)  [?] 帮助 (默认值为“N”): A
PS C:\Windows\system32> Get-ExecutionPolicy -Scope CurrentUser
RemoteSigned
```

## cmd调用powershell

由于powershell和cmd是不同的命令行，而且powershell有执行策略的限制，如果我们想使用cmd去运行powershell脚本，除了需要设置powershell的策略，还需要使用cmd设置ps1脚本默认的运行方式。
默认方式是打开/编辑，而不是运行。

设置成运行：

```cmd
ftype Microsoft.PowerShellScript.1="%SystemRoot%\system32\WindowsPowerShell\v1.0\powershell.exe" "%1"
```

设置成编辑：

```cmd
ftype Microsoft.PowerShellScript.1="%SystemRoot%\system32\notepad.exe" "%1"
```

## 鸣谢

[微软powershell官方文档](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.2)
[powershell脚本执行策略](https://www.cnblogs.com/sparkdev/p/7460518.html)
[CMD命令行修改.ps1文件（powershell脚本）的默认打开方式](https://www.codeleading.com/article/55285613479/)
