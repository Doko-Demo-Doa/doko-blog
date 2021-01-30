---
title: Kill the Terminal and disable its session restoration
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: true
tags: [english, tips, mac, terminal]
---

## The problem

When developing apps using React Native, I realized that every time the packager opens, it will spawn a new process of `Terminal` (Mac OS built-in shell app). This behavior is not too complicated to deal with if you are only using in local development. `Right click > Quit` and everything will be done.

But with CI / CD, it's another story.

<!--truncate-->

Basically, by the end of the Pipeline / Job in CI (in this example, `Gitlab`), we need to kill the Terminal and its associated process `node`:

```bash
killall -9 node || true
killall -9 Terminal || true
```

By default, `Terminal` will restore itself first after being quit. Which leads to multiple redundant `Terminal` windows opened at the same time, consuming significant resources.

## The solution

1. You have to quit Terminal and node first, yes, the command above:

```bash
killall -9 node || true
killall -9 Terminal || true
```

2. Trigger this command in the CI job:

```
rm -rf ~/Library/Saved\ Application\ State/com.apple.Terminal.savedState/*
```

This will delete all saved states created by Terminal earlier.

3. *This is optional*: Lock the folder so that the state won't be spawned:

```
chflags uchg ~/Library/Saved\ Application\ State/com.apple.Terminal.savedState/
```