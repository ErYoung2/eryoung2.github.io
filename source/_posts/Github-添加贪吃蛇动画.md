---
title: Github 添加贪吃蛇动画
date: 2023-04-12 10:23:01
tags: git
categories: 奇怪的东西
---

## 前言

我们都知道，对于Github来说，当你选择你的账户时，可以看到自己的提交记录。

于是就有大神动脑筋了，这些commit记录都是一些豆，如果弄一条蛇来，不就可以搞个贪吃蛇了吗？

有道理有道理，本文就来讲一下如何弄一条蛇出来。

## 创建步骤

### 创建个人仓库

个人仓库是一个特殊的仓库，名字就是你的Github Account Name，比如我叫ErYoung2，我就建立一个叫做ErYoung2的仓库。

### 创建Github Actions

创建.github/workflow/snake.yml文件，添加以下内容：

```yml
name: generate animation

on:
  # run automatically every 12 hours
  schedule:
    - cron: "0 2 * * *"

  # allows to manually run the job at any time
  workflow_dispatch:

  # run on every push on the master branch
  push:
    branches:
      - master



jobs:
  generate:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      # generates a snake game from a github user (<github_user_name>) contributions graph, output a svg animation at <svg_out_path>
      - name: generate github-contribution-grid-snake.svg
        uses: Platane/snk/svg-only@v2
        with:
          github_user_name: ${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      # push the content of <build_dir> to a branch
      # the content will be available at https://raw.githubusercontent.com/<github_user>/<repository>/<target_branch>/<file> , or as github page
      - name: push github-contribution-grid-snake.svg to the output branch
        uses: crazy-max/ghaction-github-pages@v2.6.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 生成SVG文件

点击Github Actions，选择上面添加的yml文件的workflow，进行构建。

构建完毕之后，会发现仓库多了一个output分支，下面有两个SVG文件。

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/04/12-10-39-14-%E6%88%AA%E5%B1%8F2023-04-12%2010.38.51.png)

### 添加README文件

编辑README.md文件，添加你想添加的内容。在最后一行，可以添加SVG文件来运行贪吃蛇，可选择亮色或者暗色。

```markdown
![亮色](https://raw.githubusercontent.com/<你的账号名>/<你的仓库名>/output/github-contribution-grid-snake.svg)


![暗色](https://raw.githubusercontent.com/<你的账号名>/<你的仓库名>/output/github-contribution-grid-snake-dark.svg)
```

## 运行

然后就跑起来了，是不是很不错捏？

![](https://raw.githubusercontent.com/ErYoung2/imgbed/master/2023/04/12-10-47-46-%E6%88%AA%E5%B1%8F2023-04-12%2010.47.38.png)
