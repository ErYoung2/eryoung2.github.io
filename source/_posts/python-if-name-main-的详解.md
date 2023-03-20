---
title: python if __name == __main__的详解
date: 2023-03-20 16:55:47
tags: python
categories: 概念
---

## 前言

对于python来说，我们经常会见到一行代码：

```python
if __name__ == "__main__":
    balabala
```

那这句话是啥意思呢？

## 正文

首先要明白__name__是python当中的一个属性，代表现在主模块的引用。

如果调用的是本模块(python文件相当于模块)，那么默认的name就是_main__了。如果不是的话，name就会设置为引用模块的名称。

例如我有两个py文件，cal.py和hello.py，其中hello.py会引用cal.py。

```python
#cal.py
def return_max(num1, num2):
    if num1 >= num2:
        return num1
    else:
        return num2


num = return_max(3,5)
print(num)
print(__name__) #显示为__main__
```

```python
#hello.py
import cal

print(cal.__name__) #显示为cal
```

按照上面的说法，这时如果我们运行hello.py, 跑出来的就不是hello.py的内容而是cal.py内容了。

而如果我加了这行判断，就不会出现这个问题。

```python
if __name__ == "__main__":
```

## 后记

这个概念对于python是非常重要的，主要是为了防止引用混乱的问题。
