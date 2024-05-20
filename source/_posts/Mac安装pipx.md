---
title: Mac安装pipx
date: 2024-05-20 21:54:56
tags: python
categories: 编程语言
---

## 前言
由于本人在使用MacBook，而最近需要写一些python代码，所以就想着去装一个pip，但是安装的时候发现一些问题，所以做个记录以便查询。

## 错误
报错如下：
```zsh
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try brew install
    xyz, where xyz is the package you are trying to
    install.

    If you wish to install a Python library that isn't in Homebrew,
    use a virtual environment:

    python3 -m venv path/to/venv
    source path/to/venv/bin/activate
    python3 -m pip install xyz

    If you wish to install a Python application that isn't in Homebrew,
    it may be easiest to use 'pipx install xyz', which will manage a
    virtual environment for you. You can install pipx with

    brew install pipx

    You may restore the old behavior of pip by passing
    the '--break-system-packages' flag to pip, or by adding
    'break-system-packages = true' to your pip.conf file. The latter
    will permanently disable this error.

    If you disable this error, we STRONGLY recommend that you additionally
    pass the '--user' flag to pip, or set 'user = true' in your pip.conf
    file. Failure to do this can result in a broken Homebrew installation.

    Read more about this behavior here: <https://peps.python.org/pep-0668/>

note: If you believe this is a mistake, please contact your Python installation or OS distribution provider. You can override this, at the risk of breaking your Python installation or OS, by passing --break-system-packages.
hint: See PEP 668 for the detailed specification.
```
可以看到，pip3是默认没有的，但是它给了解决方法。

## 解决
1. 配置虚拟环境venv
```zsh
    python3 -m venv path/to/venv
    source path/to/venv/bin/activate
    python3 -m pip install xyz
```

2. 安装pipx
```zsh
brew install pipx
```

安装完毕之后就可以使用pipx install xxx来管理依赖包了。



