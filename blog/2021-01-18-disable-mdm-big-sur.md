---
title: Disable MDM on Mac OS Big Sur
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
hide_table_of_contents: true
tags: [english, tips, mac, big-sur]
---

There are several ways to disable MDM on Mac OS. If you don't know what they are, you can do a quick search on Google.

Anyway this is what needed to be done: Edit `hosts` file:

```bash
sudo nano /private/etc/hosts
```

(You might be asked for your password)

Then append these lines:

```h
0.0.0.0 iprofiles.apple.com
0.0.0.0 mdmenrollment.apple.com
0.0.0.0 deviceenrollment.apple.com
0.0.0.0 gdmf.apple.com
```

And DO NOT append this line:

```h
0.0.0.0 albert.apple.com
```