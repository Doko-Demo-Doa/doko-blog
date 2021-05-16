---
title: React Native Shake 4 released
author: Doko
author_title: Administrator
author_url: https://github.com/Doko-Demo-Doa
author_image_url: /img/avatar_doraemon.jpg
image: https://raw.githubusercontent.com/Doko-Demo-Doa/react-native-shake/main/rnshake.png
tags: [programming, react, react-native, ios, android, english]
---

It's been a while, but I can finally come back to this project. With this new version, we have:

- Fully typed code with TypeScript.
- Rewritten iOS module. It now works on both _Debug_ and _Release_ mode.
- Shorter API. It's now just:

```ts
RNShake.addListener(() => {
  // Your code...
});
```

<!-- truncate -->

##  Breaking changes

- The lib now uses `NativeEventEmitter` because old bridge implementation is deprecated. Worry not, little will changes.
- 4 methods under the hood:
  - `addListener`
  - `removeListener`
  - `removeAllListeners`
  - `removeCurrentListener`

and they all return `EmitterSubscription`, fully compatible with React Hooks.

I'm planning to expose a parameter to configure tension too. Stay tuned.

Feel free to try and give me the feedback:

```bash
npm install react-native-shake@4.0.2
```

You can find the repo [here](https://github.com/Doko-Demo-Doa/react-native-shake).